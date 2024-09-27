import Channel from '#models/channel'
import Message from '#models/message'

type Action =
  | { type: 'SET_NOTIF'; id: ExtendedChannel['name'] }
  | { type: 'SET_OPEN'; id: ExtendedChannel['name'] }
  | { type: 'ADD_CHANNEL'; payload: ExtendedChannel }
  | { type: 'INIT'; payload: ExtendedChannel[] }

export interface ExtendedChannel extends Pick<Channel, 'name'> {
  messages: Array<Pick<Message, 'author' | 'content'>>
  isNotif?: boolean
  isOpen?: boolean
}

const channelsReducer = (state: ExtendedChannel[], action: Action): ExtendedChannel[] => {
  switch (action.type) {
    case 'INIT':
      return action.payload.map((c) => ({
        ...c,
        isNotif: false,
        isOpen: false,
      }))
    case 'SET_NOTIF':
      return state.map((ex) => (ex.name === action.id ? { ...ex, isNotif: !ex.isOpen } : ex))
    case 'SET_OPEN':
      return state.map((ex) =>
        ex.name === action.id ? { ...ex, isOpen: true, isNotif: false } : { ...ex, isOpen: false }
      )
    case 'ADD_CHANNEL':
      return [
        ...state,
        {
          isNotif: false,
          isOpen: false,
          ...action.payload,
        },
      ].sort((a, b) => a.name.localeCompare(b.name))
    default:
      return state
  }
}

export default channelsReducer
