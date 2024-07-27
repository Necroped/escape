import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Guest middleware is used to deny access to routes that should
 * be accessed by unauthenticated users.
 *
 * For example, the login page should not be accessible if the user
 * is already logged-in
 */
export default class AdminMiddleware {
  redirectTo = '/'

  async handle({ auth, response, inertia }: HttpContext, next: NextFn) {
    await auth.check()
    if (!auth.user?.isAdmin) {
      response.redirect(this.redirectTo, true)
      return
    }
    await next()
  }
}
