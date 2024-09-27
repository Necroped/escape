import { router } from '@inertiajs/react'
import styles from '../css/login.module.css'

const Logout = () => (
  <button className={styles.button} onClick={() => router.post('/admin/logout')}>
    Se déconnecter
  </button>
)

export default Logout
