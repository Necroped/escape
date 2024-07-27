/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import '../app/features/routes.js'
const HomeController = () => import('#controllers/home_controller')
const TestController = () => import('#controllers/test_controller')
const SessionController = () => import('#controllers/session_controller')

router.get('/', [HomeController, 'index']).use(middleware.auth())

router.post('login', [SessionController, 'login'])
router.get('login', [SessionController, 'show'])
router.get('logout', [SessionController, 'logout'])

router.get('test', [TestController, 'get_all_routes']).use(middleware.auth())
