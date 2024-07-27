import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import config from './config.js'
import Channel from '#models/channel'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
const Controller = () => import('./controller.js')

export type ChatArgs = { channels: Channel[] }

@inject()
export default class ChatService {
  static name = config.name

  constructor(protected ctx: HttpContext) {}

  isEnabled() {
    const user = this.ctx.auth.getUserOrFail()
    return user?.isAdmin || user?.level >= config.level
  }

  async getArgs() {
    const channels = await Channel.query().preload('messages')
    return { channels }
  }

  static routes() {
    router
      .group(() => {
        router.post('/:channelName/create', [Controller, 'createChannel'])
        router.post('/:channelName/message', [Controller, 'sendMessage'])
      })
      .prefix(config.name)
      .use([middleware.auth()])
  }
}
