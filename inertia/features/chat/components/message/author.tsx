import styles from '../../css/message.module.css'

const Author = ({ name = 'me' }: { name?: string }) => {
  return <div className={styles.author}>{name}</div>
}

export default Author
