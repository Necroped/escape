import { afterCreate, BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Message from '#models/message'
import transmit from '@adonisjs/transmit/services/main'

export default class Channel extends BaseModel {
  @column({ isPrimary: true })
  declare name: string

  @hasMany(() => Message)
  declare messages: HasMany<typeof Message>

  @afterCreate()
  static async transmitOnCreate(channel: Channel) {
    transmit.broadcast('/channel/new', { name: channel.name })
  }
}
