import { router } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import styles from '../css/createchannel.module.css'

const CreateChannel = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    router.post(`/chat/${e.currentTarget.channel.value}/create`, {}, { preserveState: true })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        className={styles.input}
        name="channel"
        placeholder="Créer un nouveau channel"
        required
      />
      <button type="submit" className={styles.button}>
        Envoyer
      </button>
    </form>
  )
}

export default CreateChannel
