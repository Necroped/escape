export const routes = {
  message: (channelName: string) => `/chat/${channelName}/message`,
  create: (channelName: string) => `/chat/${channelName}/create`,
}
