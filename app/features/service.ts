import { inject } from '@adonisjs/core'
import ChatService from './chat/service.js'

@inject()
export default class FeaturesService {
  constructor(protected chat: ChatService) {}

  async getAll() {
    return {
      [ChatService.name]: {
        isEnabled: this.chat.isEnabled(),
        args: await this.chat.getArgs(),
      },
    }
  }
}
