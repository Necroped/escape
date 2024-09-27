import ChatService from '#services/chat_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ChatsController {
  constructor(protected chatService: ChatService) {}

  async createChannel({ params, response }: HttpContext) {
    await this.chatService.create(params.channelName)
    return response.redirect().back()
  }

  async sendMessage({ request, params, response, isAdmin }: HttpContext) {
    const { message } = request.all()
    this.chatService.send(params.channelName, {
      content: message,
      author: (await isAdmin) ? params.channelName : 'me',
    })
    return response.ok({ success: true })
  }

  async listChannels() {
    return this.chatService.list()
  }
}
