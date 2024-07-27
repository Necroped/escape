import Channel from '#models/channel'

type Action =
  | { type: 'SET_NOTIF'; id: Channel['name'] }
  | { type: 'SET_OPEN'; id: Channel['name'] }
  | { type: 'ADD_CHANNEL'; payload: Channel }
interface ExtendedChannel {
  isNotif: boolean
  isOpen: boolean
  channel: Channel
}
const channelsReducer = (state: ExtendedChannel[], action: Action): ExtendedChannel[] => {
  switch (action.type) {
    case 'SET_NOTIF':
      return state.map((ex) =>
        ex.channel.name === action.id ? { ...ex, isNotif: !ex.isOpen } : ex
      )
    case 'SET_OPEN':
      return state.map((ex) =>
        ex.channel.name === action.id
          ? { ...ex, isOpen: true, isNotif: false }
          : { ...ex, isOpen: false }
      )
    case 'ADD_CHANNEL':
      return [
        ...state,
        {
          isNotif: false,
          isOpen: false,
          channel: action.payload,
        },
      ].sort((a: ExtendedChannel, b: ExtendedChannel) =>
        a.channel.name.localeCompare(b.channel.name)
      )
    default:
      return state
  }
}

export default channelsReducer
