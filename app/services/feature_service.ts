import transmit from '@adonisjs/transmit/services/main'
import FeaturesManagerService from './features_manager_service.js'
import app from '@adonisjs/core/services/app'

type Broadcastable =
  | {
      [key: string]: Broadcastable
    }
  | string
  | number
  | boolean
  | Broadcastable[]

export type FeatureTransmit = { [key: string]: Broadcastable }

const featuresManager = await app.container.make(FeaturesManagerService)
export class FeatureService<T extends FeatureTransmit = {}> {
  private active: boolean = false
  name: string

  constructor(name: string) {
    this.name = name
    this.#register()
  }

  async #register() {
    featuresManager.register(this)
  }

  start() {
    this.active = true
  }

  isActive() {
    return this.active
  }

  transmit<K extends keyof T>(route: K, data: T[K]): void {
    transmit.broadcast(route as string, data)
  }
}
