const formattedNow = () => {
  const now = new Date() // Crée un nouvel objet Date avec la date et l'heure actuelles
  const hours = now.getHours().toString().padStart(2, '0') // Obtenir l'heure en format 24h et ajouter un zéro devant si nécessaire
  const minutes = now.getMinutes().toString().padStart(2, '0') // Obtenir les minutes et ajouter un zéro devant si nécessaire
  const seconds = now.getSeconds().toString().padStart(2, '0') // Obtenir les secondes et ajouter un zéro devant si nécessaire

  // Format de l'heure
  return `${hours}:${minutes}:${seconds}`
}

export { formattedNow }
