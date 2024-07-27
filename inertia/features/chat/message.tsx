import type Message from '#models/message'
import styles from './css/message.module.css'

const ChatMessage = ({
  message,
  isFirst = false,
  isLast = false,
  isMe = false,
}: {
  message: Message
  isFirst: boolean
  isLast: boolean
  isMe: boolean
}) => {
  return (
    <div>
      {isFirst && <div className={styles.author}>{message.author}</div>}
      <div
        className={styles.content}
        style={{
          backgroundColor: isMe ? '#c1e8da' : '#c96868',
        }}
      >
        {message.content}
      </div>
      {isLast && (
        <div className={styles.time}>
          {new Date(message.createdAt.toString()).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: undefined,
          })}
        </div>
      )}
    </div>
  )
}

export default ChatMessage
