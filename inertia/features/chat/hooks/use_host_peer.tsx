import Peer from 'peerjs'
import { useEffect, useRef, useState } from 'react'

import { uniqueByKey } from '~/utils/array'

const adminId = 'admin'
interface MediaStreamInfo {
  stream: MediaStream
  label: string
  peerID?: string
}
const useHostPeer = () => {
  const peerRef = useRef<Peer | null>(null)
  const [streams, setStreams] = useState<MediaStreamInfo[]>([])

  const initPeer = () => {
    const peer = new Peer(adminId)
    peerRef.current = peer
    peer.on('open', () => {
      console.log('Peer admin created : ', peer)
    })
    peer.on('call', (call) => {
      console.log('admin called')
      call.answer()
      call.on('stream', (remoteStream) => {
        console.log('new stream ', call.metadata.device.label)
        setStreams((s) => {
          return uniqueByKey(
            [...s, { stream: remoteStream, label: call.metadata.device.label, peerID: call.peer }],
            'label'
          )
        })
      })
      call.on('close', () => {
        console.log('closing ', call.peer)
        setStreams((s) => {
          const newStreams = s.filter((a) => a.peerID !== call.peer)
          console.log(newStreams)
          return newStreams
        })
      })
    })
    peer.on('error', (err) => {
      console.log('Peer error:', err)
    })
  }

  useEffect(() => {
    if (!peerRef.current) {
      initPeer()
    }

    return () => {
      peerRef.current?.destroy()
    }
  }, [])

  return streams
}

export default useHostPeer
