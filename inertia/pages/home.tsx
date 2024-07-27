import User from '#models/user'
import { AuthContextProvider } from '~/context/auth_context'
import Chat from '~/features/chat'

const Home = ({ features, user }: { features: any; user: User }) => {
  return (
    <AuthContextProvider user={user}>
      <h2>Bonjour {user.username}</h2>
      <div>{features.chat.isEnabled && <Chat {...features.chat.args} />}</div>
    </AuthContextProvider>
  )
}
export default Home
