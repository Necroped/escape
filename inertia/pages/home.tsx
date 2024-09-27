import Chat from '~/features/chat'
import Logout from '~/components/logout'
import Camera from '~/features/camera'
import useTransmit from '~/hooks/use_transmit'

const Home = ({ isAdmin }: { isAdmin: boolean }) => {
  const transmit = useTransmit()
  transmit.on('features', (features) => {})

  return (
    <>
      {!!isAdmin && <Logout />}
      <Chat isAdmin={isAdmin} />
      <Camera isAdmin={isAdmin} />
    </>
  )
}

export default Home
