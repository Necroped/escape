import Channel from '#models/channel'
import { HttpContext } from '@adonisjs/core/http'

export default class ChatController {
  async createChannel({ params, response }: HttpContext) {
    await Channel.create({ name: params.channelName })
    return response.redirect().back()
  }
  async sendMessage({ request, params, response, auth }: HttpContext) {
    await auth.check()
    const { message } = request.all()
    const channel = await Channel.findOrFail(params.channelName)
    await channel.related('messages').create({
      content: message,
      author: auth.user?.isAdmin ? params.channelName : auth.user?.username,
    })
    return response.redirect().back()
  }
}
