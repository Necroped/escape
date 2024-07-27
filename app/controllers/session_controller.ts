import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async login({ request, auth, response }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])
    const user = await User.verifyCredentials(username, password)
    await auth.use('web').login(user)
    return response.redirect('/')
  }

  async logout({ auth }: HttpContext) {
    await auth.use('web').logout()
  }

  async show({ inertia }: HttpContext) {
    return inertia.render('login')
  }
}
