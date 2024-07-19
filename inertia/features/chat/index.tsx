import ChannelChat from './channel'
import Channel from '#models/channel'
import { useState } from 'react'
import CreateChannel from './create_channel'
import useTransmit from '~/hooks/use_transmit'

const Chat = ({ channels, isAdmin }: { channels: Channel[]; isAdmin?: boolean }) => {
  const [currentChannel, setCurrentChannel] = useState<string>()
  const [currentChannels, setCurrentChannels] = useState<Channel[]>(channels)
  useTransmit('/channel/new', (newChannel) => {
    setCurrentChannels((c) => [...c, newChannel])
  })

  return (
    <>
      {currentChannels?.map((channel) => (
        <ChannelChat
          key={channel.name}
          channel={channel}
          isOpen={currentChannel === channel.name}
          onOpen={() => setCurrentChannel(channel.name)}
          author={isAdmin ? 'admin' : 'me'}
        />
      ))}
      {isAdmin && <CreateChannel />}
    </>
  )
}

export default Chat
