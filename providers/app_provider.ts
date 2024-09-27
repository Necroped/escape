import ChatService from '#services/chat_service'
import FeaturesManagerService from '#services/features_manager_service'
import { HttpContext } from '@adonisjs/core/http'
import type { ApplicationService } from '@adonisjs/core/types'

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    isAdmin: Promise<boolean>
  }
}
export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    const fms = new FeaturesManagerService()
    this.app.container.singleton(FeaturesManagerService, async () => {
      new ChatService()
      return fms
    })
    HttpContext.getter('isAdmin', async function (this: HttpContext) {
      await this.auth.check()
      return this.auth.isAuthenticated
    })
  }

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
