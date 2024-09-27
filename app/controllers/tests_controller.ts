// import type { HttpContext } from '@adonisjs/core/http'

import FeaturesManagerService from '#services/features_manager_service'
import { inject } from '@adonisjs/core'

@inject()
export default class TestsController {
  constructor(protected features_manager_service: FeaturesManagerService) {}

  async featuresManagerService() {
    return { success: true }
    //return test.transmit()
  }
}
