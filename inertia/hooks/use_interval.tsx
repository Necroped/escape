import { useRef, useCallback } from 'react'

type IntervalId = string

type UseIntervalHook = {
  start: (id: IntervalId, callback: () => void, delay: number) => void
  stop: (id: IntervalId) => void
  stopAll: () => void
  restart: (id: IntervalId) => void
}

const useInterval = (): UseIntervalHook => {
  const intervalsRef = useRef<{
    [key: string]: { timeout: NodeJS.Timeout | null; callback: () => void; delay: number }
  }>({})

  const start = useCallback((id: IntervalId, callback: () => void, delay: number) => {
    if (intervalsRef.current[id] !== undefined) {
      clearInterval(intervalsRef.current[id].timeout as NodeJS.Timeout)
    }
    intervalsRef.current[id] = {
      timeout: setInterval(callback, delay),
      callback,
      delay,
    }
  }, [])

  const stop = useCallback((id: IntervalId) => {
    if (intervalsRef.current[id] !== undefined) {
      clearInterval(intervalsRef.current[id].timeout as NodeJS.Timeout)
    }
  }, [])

  const stopAll = useCallback(() => {
    Object.keys(intervalsRef.current).forEach((id) => {
      if (intervalsRef.current[id] !== null) {
        clearInterval(intervalsRef.current[id].timeout as NodeJS.Timeout)
      }
    })
  }, [])

  const restart = useCallback((id: IntervalId) => {
    if (intervalsRef.current[id] !== undefined && intervalsRef.current[id].timeout !== null) {
      const { callback, delay } = intervalsRef.current[id]
      clearInterval(intervalsRef.current[id].timeout as NodeJS.Timeout)
      intervalsRef.current[id].timeout = setInterval(callback, delay)
    }
  }, [])

  return { start, stop, stopAll, restart }
}

export default useInterval
