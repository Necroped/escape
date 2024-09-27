/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import Admin from '#models/admin'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import transmit from '@adonisjs/transmit/services/main'

const ChatsController = () => import('#controllers/chats_controller')
const TestsController = () => import('#controllers/tests_controller')
transmit.registerRoutes()

router
  .group(() => {
    router.get('/channels', [ChatsController, 'listChannels'])
    router.post('/:channelName/create', [ChatsController, 'createChannel'])
    router.post('/:channelName/message', [ChatsController, 'sendMessage'])
  })
  .prefix('chat')

router
  .group(() => {
    router.post('login', async ({ request, response, auth }) => {
      const { username, password } = request.all()
      const admin = await Admin.verifyCredentials(username, password)
      await auth.use('admin').login(admin)
      return response.redirect('/')
    })
    router.post('logout', async ({ response, auth }) => {
      await auth.use('admin').logout()
      return response.redirect('/')
    })
    router.on('login').renderInertia('login')
    router.on('/').redirect('/').use(middleware.admin())
  })
  .prefix('admin')

router
  .get('/', async ({ inertia, isAdmin }) => {
    return inertia.render('home', { isAdmin: await isAdmin })
  })
  .as('home')

router.get('/list', [TestsController, 'featuresManagerService'])
