import styles from '../../css/message.module.css'

const Content = ({ text, isAuthor = false }: { text?: string; isAuthor?: boolean }) => {
  if (!text) return
  return (
    <div
      className={styles.content}
      style={{
        backgroundColor: isAuthor ? '#c1e8da' : '#c96868',
      }}
    >
      {text}
    </div>
  )
}

export default Content
