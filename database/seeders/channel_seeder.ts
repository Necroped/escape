import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Channel from '#models/channel'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    faker.seed(42)
    const channelsName = faker.helpers.multiple(() => faker.string.alphanumeric(10), { count: 3 })

    const channels = channelsName.map((name) => ({ name }))
    await Channel.createMany(channels)
  }
}
