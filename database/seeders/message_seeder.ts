import Message from '#models/message'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const username = faker.internet.userName()
    faker.seed(42)
    const channels = faker.helpers.multiple(() => faker.string.alphanumeric(10), { count: 3 })

    const messages = faker.helpers.multiple(
      () => ({
        author: username,
        content: faker.lorem.lines(2),
        channelName: faker.helpers.arrayElement(channels),
      }),
      { count: { min: 20, max: 30 } }
    )
    await Message.createMany(messages)
  }
}
