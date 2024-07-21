import { CSSProperties, FormEventHandler } from 'react'

import { router } from '@inertiajs/react'
const Login = () => {
  const styles: { [key: string]: CSSProperties } = {
    body: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: 0,
    },
    container: {
      width: '400px',
      border: '1px solid black',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '10px',
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
      padding: '10px',
      marginTop: '10px',
    },
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const username = form.username.value
    const password = form.password.value
    router.post('/login', { username, password })
  }

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1>Connexion</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="username">Nom d'utilisateur :</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password">Mot de passe :</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  )
}

export default Login
