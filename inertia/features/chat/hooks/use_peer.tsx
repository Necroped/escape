import useGuestPeer from './use_guest_peer'
import useHostPeer from './use_host_peer'

const usePeer = (isAdmin: boolean = false) => {
  if (isAdmin) {
    return useHostPeer()
  }
  return useGuestPeer()
}

export default usePeer
