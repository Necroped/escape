import Channel from '#models/channel'
import Message from '#models/message'
import { CSSProperties, FormEventHandler, useEffect, useRef, useState } from 'react'
import useTransmit from '~/hooks/use_transmit'
import { routes } from '#utils/transmit'

const ChatChannel = ({
  channel,
  isOpen,
  onOpen,
  author,
}: {
  channel: Channel
  isOpen: boolean
  onOpen: () => void
  author: string
}) => {
  const [messages, setMessages] = useState<Message[]>(channel.messages)
  const [isNotif, setIsNotif] = useState(false)
  const isNew = isNotif && !isOpen
  const endRef = useRef<HTMLDivElement>(null)
  useTransmit(routes.message(channel.name), (newMessage: Message) => {
    setIsNotif(true)
    setMessages((_m) => [..._m, newMessage])
  })

  useEffect(() => {
    if (isOpen) {
      endRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const styles: { [key: string]: CSSProperties } = {
    container: {
      width: '400px',
      border: '1px solid black',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      height: 'auto',
    },
    chatWindow: {
      flexGrow: 1,
      border: '1px solid black',
      padding: '5px',
      marginBottom: '10px',
      overflowY: 'scroll',
      height: '300px',
    },
    messages: {
      display: 'flex',
      flexDirection: 'column',
      height: '80vh',
    },
    message_author: {
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    message_content: {
      backgroundColor: '#e1f5fe',
      wordWrap: 'break-word',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '5px',
    },
    message_time: {
      textAlign: 'right',
      fontSize: '0.8em',
      color: '#888',
    },
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    fetch(routes.message(channel.name), {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ message: e.currentTarget.message.value, author }),
    })
    e.currentTarget.reset()
  }

  const handleClick = () => {
    onOpen()
    setIsNotif(false)
  }
  return (
    <div style={styles.container}>
      <h1
        onClick={handleClick}
        style={{ cursor: isOpen ? 'initial' : 'pointer', color: isNew ? 'red' : 'initial' }}
      >
        Chat de {channel.name}
      </h1>
      {isOpen && (
        <>
          <div style={styles.chatWindow}>
            <div style={styles.messages} ref={endRef}>
              {messages?.map((msg, index) => {
                const isFirstMessageOfUser =
                  index === 0 || messages[index - 1]?.author !== msg.author
                const isLastMessageOfUser =
                  index === messages.length - 1 || messages[index + 1]?.author !== msg.author

                return (
                  <div style={styles.message} key={index}>
                    {isFirstMessageOfUser && <div style={styles.message_author}>{msg.author}</div>}
                    <div style={styles.message_content}>{msg.content}</div>
                    {isLastMessageOfUser && (
                      <div style={styles.message_time}>
                        {new Date(msg.createdAt.toString()).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: undefined,
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              style={styles.input}
              name="message"
              placeholder="Tapez votre message..."
              required
            />
            <button type="submit" style={styles.button}>
              Envoyer
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default ChatChannel
