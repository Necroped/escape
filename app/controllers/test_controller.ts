import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

@inject()
export default class TestController {
  /*   constructor(protected featuresService: FeaturesService) {}

  async just_dummy_function({ response }: HttpContext) {
    response.json(await this.featuresService.all())
  }
 */
  async just_return_true() {
    return true
  }

  async get_all_routes({ response }: HttpContext) {
    response.json(router.toJSON())
  }
}
