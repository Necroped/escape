import { FeatureService } from './feature_service.js'

export default class FeaturesManagerService {
  private features: any[] = []

  // Ajoute une nouvelle instance de FeatureService à la liste
  register<T extends FeatureService>(feature: T): void {
    this.features.push(feature)
  }

  // Récupérer un service avec inférence de type
  get<T extends FeatureService>(name: string): T | undefined {
    return this.features.find((feature) => feature.name === name) as T | undefined
  }

  // Liste toutes les fonctionnalités enregistrées
  list(): FeatureService[] {
    return this.features
  }
}
