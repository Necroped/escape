import Peer, { CallOption } from 'peerjs'
import { useEffect, useState } from 'react'
import useInterval from '~/hooks/use_interval'

interface MediaStreamInfo {
  stream: MediaStream
  label: string
  peer?: Peer
}

const adminId = 'admin'
const useGuestPeer = () => {
  const [connections, setConnections] = useState<MediaStreamInfo[]>([])
  const { start, stop, restart } = useInterval()

  const getMedias = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoDevices = devices.filter((device) => device.kind === 'videoinput')
    return Promise.all(
      videoDevices.map(async (device) => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: device.deviceId },
          audio: true,
        })
        return { stream, device }
      })
    )
  }

  const connectToAdmin = (peer: Peer, stream: MediaStream, options?: CallOption) => {
    console.log(peer.id, ' calling ', adminId)
    if (peer) {
      const call = peer.call(adminId, stream, options)
      call.on('iceStateChanged', () => {
        console.log({ iceStateChanged: call.peerConnection.connectionState })
        stop(peer.id)
      })
      call.on('close', () => {
        console.log(`Call closed with admin: ${adminId}`)
        restart(peer.id)
      })
      call.on('error', (err) => {
        console.error(`Call error:`, err)
      })
      return call
    }
  }

  const initPeer = (cb: (peer: Peer) => void) => {
    const peer = new Peer()
    peer.on('open', async (id) => {
      console.log('Peer created : ', id)
      cb(peer)
    })
    return peer
  }

  useEffect(() => {
    getMedias().then((medias) => {
      const connectionsFromMedia = medias.map(({ device, stream }) => {
        const peer = initPeer((newPeer: Peer) => {
          console.log('init')
          start(
            peer.id,
            () => {
              console.log('interval')
              return connectToAdmin(newPeer, stream, {
                metadata: {
                  device,
                },
              })
            },
            1000
          )
        })

        return {
          stream,
          label: device.label,
          peer,
        }
      })
      setConnections(connectionsFromMedia)
    })

    const cleanUp = () => {
      connections.forEach((connection) => connection.peer?.destroy())
    }

    window.addEventListener('beforeunload', () => cleanUp())

    return () => {
      window.removeEventListener('beforeunload', cleanUp)
    }
  }, [])

  return connections
}

export default useGuestPeer
