import { inject } from '@adonisjs/core'
import FeaturesService from '../features/service.js'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class HomeController {
  constructor(protected featuresService: FeaturesService) {}

  async index({ inertia }: HttpContext) {
    return inertia.render('home', {
      features: await this.featuresService.getAll(),
    })
  }
}
