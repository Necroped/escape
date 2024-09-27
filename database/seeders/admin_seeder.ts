import Admin from '#models/admin'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Admin.create({
      username: 'admin',
      password: 'admin',
    })
  }
}
