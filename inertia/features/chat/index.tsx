import ChannelChat from './components/channel'
import { useEffect, useReducer } from 'react'
import CreateChannel from './components/create_channel'
import useTransmit from '~/hooks/use_transmit'
import channelsReducer from './reducer/channels_reducer'
import { ChatTransmit } from '#services/chat_service'

const Chat = ({ isAdmin }: { isAdmin: boolean }) => {
  const [state, dispatch] = useReducer(channelsReducer, [])
  const transmit = useTransmit<ChatTransmit>()
  useEffect(() => {
    const initChannels = async () => {
      const response = await fetch('/chat/channels')
      const remoteChannels = await response.json()
      dispatch({ type: 'INIT', payload: remoteChannels })
    }
    initChannels()
  }, [])

  transmit.on('channel.new', (newChannel) => {
    dispatch({ type: 'ADD_CHANNEL', payload: newChannel })
  })
  /*
  transmit<ChatTransmit>('channel.new', (newChannel) => {
    dispatch({ type: 'ADD_CHANNEL', payload: newChannel })
  }) */

  return (
    <>
      {state?.map((extendedChannel) => (
        <ChannelChat
          key={extendedChannel.name}
          channel={extendedChannel}
          onNotif={() => dispatch({ type: 'SET_NOTIF', id: extendedChannel.name })}
          onOpen={() => dispatch({ type: 'SET_OPEN', id: extendedChannel.name })}
        />
      ))}
      {!!isAdmin && <CreateChannel />}
    </>
  )
}

export default Chat
