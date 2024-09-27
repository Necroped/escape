import { FormEventHandler, useEffect, useRef, useState } from 'react'
import useTransmit from '~/hooks/use_transmit'
import styles from '../css/channel.module.css'
import Author from './message/author'
import Content from './message/content'
import Time from './message/time'
import { ExtendedChannel } from '../reducer/channels_reducer'
import Message from '#models/message'
import { ChatTransmit } from '#services/chat_service'

const ChatChannel = ({
  channel,
  onNotif,
  onOpen,
}: {
  channel: ExtendedChannel
  onNotif: () => void
  onOpen: () => void
}) => {
  const [messages, setMessages] = useState(channel.messages)
  const endRef = useRef<HTMLDivElement>(null)
  const transmit = useTransmit<ChatTransmit>()

  transmit.on(`channel.${channel.name}.message`, (newMessage) => {
    setMessages((_m) => [...(_m || []), newMessage])
    onNotif()
  })

  useEffect(() => {
    if (channel.isOpen && endRef.current) {
      endRef.current.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [channel.isOpen])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    fetch(`/chat/${channel.name}/message`, {
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
        onClick={!channel.isOpen ? onOpen : undefined}
        style={{
          cursor: channel.isOpen ? 'initial' : 'pointer',
          color: channel.isNotif && !channel.isOpen ? 'red' : 'initial',
        }}
      >
        Chat de {channel.name}
      </h1>
      {channel.isOpen && (
        <>
          <div className={styles.chatWindow}>
            <div className={styles.messages} ref={endRef}>
              {messages?.map((msg: Partial<Message>, index: number) => {
                const isFirst = index === 0 || messages[index - 1]?.author !== msg.author
                const isLast =
                  index === messages.length - 1 || messages[index + 1]?.author !== msg.author
                return (
                  <div key={index}>
                    {isFirst ? <Author name={msg.author} /> : null}
                    <Content text={msg.content} />
                    {isLast ? <Time datetime={msg.createdAt} /> : null}
                  </div>
                )
              })}
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
