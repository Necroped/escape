/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import Channel from '#models/channel'
import { middleware } from './kernel.js'
const SessionController = () => import('#controllers/session_controller')

router
  .get('/', async ({ inertia }) => {
    return inertia.render('home', { channels: () => Channel.query().preload('messages') })
  })
  .use(middleware.auth())
router
  .get('/admin', async ({ inertia }) => {
    return inertia.render('admin', { channels: () => Channel.query().preload('messages') })
  })
  .use(middleware.admin())

router.post('/login', [SessionController, 'login'])
router.get('/login', [SessionController, 'show'])

router
  .group(() => {
    router.post('/:channelName/create', async ({ response, params }) => {
      Channel.create({ name: params.channelName })
      response.safeStatus(200)
    })
    router.post('/:channelName/message', async ({ request, response, params }) => {
      const { message, author } = request.all()
      const channel = await Channel.findOrFail(params.channelName)
      channel.related('messages').create({ content: message, author })
      response.safeStatus(200)
    })
  })
  .prefix('chat')

router
  .group(() => {
    router.get('/chat', async ({ response }) => {
      return response.json(await Channel.query().preload('messages'))
    })
  })
  .prefix('api')
