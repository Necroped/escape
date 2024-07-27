// useTransmit.js
import { Transmit } from '@adonisjs/transmit-client'
import { useState, useEffect } from 'react'

const transmit = new Transmit({
  baseUrl: window.location.origin,
})

const useTransmit = (channel: string, handleMessage: (_any: any) => void) => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const subscription = transmit.subscription(channel)
    const handleConnect = () => setIsConnected(true)
    const handleDisconnect = () => setIsConnected(false)

    // Event listeners
    transmit.on('connected', handleConnect)
    transmit.on('disconnected', handleDisconnect)
    // Subscription event listeners
    subscription.onMessage(handleMessage)

    // Create the subscription
    const createSubscription = async () => {
      try {
        await subscription.create()
      } catch (error) {
        console.error('Failed to create subscription:', error)
      }
    }

    createSubscription()

    return () => {
      // Cleanup
      subscription.delete()
    }
  }, [channel])

  return {
    isConnected,
  }
}

export default useTransmit
