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

  async handle(ctx: HttpContext, next: NextFn) {
    await ctx.auth.check()
    if (!ctx.auth.user?.isAdmin) {
      ctx.response.redirect(this.redirectTo, true)
      return
    }
    await next()
  }
}
