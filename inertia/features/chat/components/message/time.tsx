import { DateTime } from 'luxon'
import styles from '../../css/message.module.css'

const Time = ({ datetime }: { datetime?: DateTime }) => {
  if (!datetime) return
  return (
    <div className={styles.time}>
      {new Date(datetime.toString()).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: undefined,
      })}
    </div>
  )
}

export default Time
