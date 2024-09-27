// useTransmit.js
import { FeatureTransmit } from '#services/feature_service'
import { Transmit } from '@adonisjs/transmit-client'
import { useState, useEffect } from 'react'

const transmit = new Transmit({
  baseUrl: window.location.origin,
})

const useTransmit = <T extends FeatureTransmit>() => {
  const [routes, setRoutes] = useState(new Set())

  const on = <K extends keyof T>(channel: K, handleMessage: (message: T[K]) => void) => {
    useEffect(() => {
      try {
        const subscription = transmit.subscription(channel as string)
        const handleConnect = () => setRoutes((r) => r.add(channel))
        const handleDisconnect = () =>
          setRoutes((r) => {
            r.delete(channel)
            return r
          })

        // Event listeners
        transmit.on('connected', handleConnect)
        transmit.on('disconnected', handleDisconnect)
        // Subscription event listeners
        subscription.onMessage(handleMessage)
        subscription.create()

        return () => {
          // Cleanup
          subscription.delete()
        }
      } catch (e) {
        console.error('use transmit : ', e)
      }
    }, [channel])
  }
  return {
    routes,
    on,
  }
}

export default useTransmit
