import Channel from '#models/channel'
import Chat from '~/features/chat'

const Admin = ({ channels = [] }: { channels?: Channel[] }) => {
  return <Chat isAdmin={true} channels={channels} />
}

export default Admin
