import ChannelChat from './channel'
import { useReducer } from 'react'
import CreateChannel from './create_channel'
import useTransmit from '~/hooks/use_transmit'
import { ChatArgs } from '../../../app/features/chat/service'
import { useAuth } from '~/context/auth_context'
import channelsReducer from './reducer/channels_reducer'

const Chat = ({ channels }: ChatArgs) => {
  const { isAdmin } = useAuth()

  const [state, dispatch] = useReducer(
    channelsReducer,
    channels.map((c) => ({
      channel: c,
      isNotif: false,
      isOpen: false,
    }))
  )

  useTransmit('/channel/new', (newChannel) => {
    dispatch({ type: 'ADD_CHANNEL', payload: newChannel })
  })

  return (
    <>
      {state?.map((extendedChannel) => (
        <ChannelChat
          key={extendedChannel.channel.name}
          channel={extendedChannel.channel}
          isNotif={extendedChannel.isNotif}
          onNotif={() => dispatch({ type: 'SET_NOTIF', id: extendedChannel.channel.name })}
          isOpen={extendedChannel.isOpen}
          onOpen={() => dispatch({ type: 'SET_OPEN', id: extendedChannel.channel.name })}
        />
      ))}
      {!!isAdmin && <CreateChannel />}
    </>
  )
}

export default Chat
