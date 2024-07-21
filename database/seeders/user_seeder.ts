import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        username: 'Laetitia',
        password: 'loli/23',
      },
      {
        username: 'admin',
        password: 'admin',
        isAdmin: true,
      },
    ])
  }
}
