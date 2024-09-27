import Channel from '#models/channel'
import Message from '#models/message'
import { FeatureService } from './feature_service.js'

export type ChatTransmit = {
  'channel.new': Pick<Channel, 'name'> & {
    messages: Array<Pick<Message, 'content' | 'author'>>
  }
  [key: `channel.${string}.message`]: Pick<Message, 'content' | 'author'>
}

export default class ChatService extends FeatureService<ChatTransmit> {
  constructor() {
    super('chat')
  }

  async create(channelName: string) {
    const channel = await Channel.create({ name: channelName })
    const { name, messages } = channel
    this.transmit('channel.new', { name, messages })
    return channel
  }

  async get(name: string) {
    return Channel.findBy({ name })
  }

  async send(channelName: string, message: Partial<Message>) {
    const channel = (await this.get(channelName)) ?? (await this.create(channelName))
    const createdMessage = await channel.related('messages').create(message)
    this.transmit(`channel.${channel.name}.message`, createdMessage)
    return createdMessage
  }

  async list() {
    return Channel.query().preload('messages')
  }
}
