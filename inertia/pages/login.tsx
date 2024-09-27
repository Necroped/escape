import { FormEventHandler } from 'react'
import styles from '../css/login.module.css'

import { router } from '@inertiajs/react'
const Login = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const username = form.username.value
    const password = form.password.value
    router.post('/admin/login', { username, password })
  }

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <h1>Connexion</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Nom d'utilisateur :</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Mot de passe :</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button className={styles.button} type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
