import usePeer from '~/features/chat/hooks/use_peer'
import VideoPlayer from './video'

const Camera = ({ isAdmin }: { isAdmin: boolean }) => {
  const streams = usePeer(isAdmin)

  return (
    <div>
      {streams?.map(({ stream, label }) => (
        <VideoPlayer key={label} stream={stream} label={label} isAdmin={isAdmin} />
      ))}
    </div>
  )
}

export default Camera
