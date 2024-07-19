import Channel from '#models/channel'
import Chat from '~/features/chat'

const Home = ({ channels = [] }: { channels?: Channel[] }) => {
  return <Chat channels={channels} />
}
export default Home
