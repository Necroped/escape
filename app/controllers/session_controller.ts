import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async login({ request, auth, response }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])
    const user = await User.verifyCredentials(username, password)
    await auth.use('web').login(user)
    if (user.isAdmin) {
      return response.redirect('/admin')
    } else {
      return response.redirect('/home')
    }
  }
  async show({ inertia }: HttpContext) {
    return inertia.render('login')
  }
}
