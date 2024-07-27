import router from '@adonisjs/core/services/router'
import Chat from './chat/service.js'

router.group(() => {
  Chat.routes()
})
