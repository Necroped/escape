import Channel from '#models/channel'
import Message from '#models/message'
import { FormEventHandler, useCallback, useEffect, useReducer, useRef, useState } from 'react'
import useTransmit from '~/hooks/use_transmit'
import { routes } from '#utils/transmit'
import styles from './css/channel.module.css'
import ChatMessage from './message'
import { useAuth } from '~/context/auth_context'

const ChatChannel = ({
  channel,
  isNotif,
  onNotif,
  isOpen,
  onOpen,
}: {
  channel: Channel
  isNotif: boolean
  onNotif: () => void
  isOpen: boolean
  onOpen: () => void
}) => {
  const [messages, setMessages] = useState<Message[]>(channel.messages)
  const user = useAuth()
  const endRef = useRef<HTMLDivElement>(null)
  useTransmit(routes.message(channel.name), (newMessage: Message) => {
    setMessages((_m) => [..._m, newMessage])
    onNotif()
  })

  useEffect(() => {
    if (isOpen && endRef.current) {
      endRef.current.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isOpen])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    fetch(routes.message(channel.name), {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ message: e.currentTarget.message.value }),
    })
    e.currentTarget.reset()
  }

  return (
    <div className={styles.container}>
      <h1
        onClick={!isOpen ? onOpen : undefined}
        style={{
          cursor: isOpen ? 'initial' : 'pointer',
          color: isNotif && !isOpen ? 'red' : 'initial',
        }}
      >
        Chat de {channel.name}
      </h1>
      {isOpen && (
        <>
          <div className={styles.chatWindow}>
            <div className={styles.messages} ref={endRef}>
              {messages?.map((msg, index) => (
                <ChatMessage
                  message={msg}
                  key={index}
                  isFirst={index === 0 || messages[index - 1]?.author !== msg.author}
                  isLast={
                    index === messages.length - 1 || messages[index + 1]?.author !== msg.author
                  }
                  isMe={
                    msg.author === user?.username || (user.isAdmin && msg.author === channel.name)
                  }
                />
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              className={styles.input}
              name="message"
              placeholder="Tapez votre message..."
              required
            />
            <button type="submit" className={styles.button}>
              Envoyer
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default ChatChannel
