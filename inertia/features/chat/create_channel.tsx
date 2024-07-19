import { routes } from '#utils/transmit'
import { CSSProperties, FormEventHandler } from 'react'

const CreateChannel = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const channel = e.currentTarget.channel.value
    fetch(routes.create(channel), {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  }
  const styles: { [key: string]: CSSProperties } = {
    form: {
      display: 'flex',
    },
    input: {
      flexGrow: 1,
      border: '1px solid black',
      padding: '5px',
    },
    button: {
      border: '1px solid black',
      backgroundColor: 'white',
      cursor: 'pointer',
    },
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        style={styles.input}
        name="channel"
        placeholder="Créer un nouveau channel"
        required
      />
      <button type="submit" style={styles.button}>
        Envoyer
      </button>
    </form>
  )
}

export default CreateChannel
