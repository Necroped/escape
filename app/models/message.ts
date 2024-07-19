import { DateTime } from 'luxon'
import { afterCreate, BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import transmit from '@adonisjs/transmit/services/main'
import Channel from '#models/channel'
import { routes } from '#utils/transmit'
export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string

  @column()
  declare author: string

  @column({ serializeAs: null })
  declare channelName: string

  @belongsTo(() => Channel)
  declare channel: BelongsTo<typeof Channel>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @afterCreate()
  static async transmitOnCreate(message: Message) {
    transmit.broadcast(routes.message(message.channelName), message.toJSON())
  }
}
