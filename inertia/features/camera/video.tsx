import { FC, useRef, useEffect, useState } from 'react'

const VideoPlayer: FC<{ stream: MediaStream; label?: string; isAdmin?: boolean }> = ({
  stream,
  label,
  isAdmin = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMute, setIsMute] = useState(true)
  const toggleMute = () => setIsMute((m) => !m)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play()
      }
    }
  }, [stream])

  return (
    <div>
      <h3>{label}</h3>
      <video
        ref={videoRef}
        autoPlay
        style={{ width: '300px', height: '200px', border: '1px solid black' }}
        muted={isMute}
      />
      {isAdmin && (
        <button onClick={toggleMute}>{isMute ? 'Mettre le son' : 'Couper le son'}</button>
      )}
    </div>
  )
}

export default VideoPlayer
