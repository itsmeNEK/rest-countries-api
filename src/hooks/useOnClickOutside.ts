import { RefObject, useCallback, useEffect } from 'react'

export const useClickOutside = (
  refs: RefObject<HTMLElement>[],
  callback: (event: MouseEvent) => void
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement

      if (!refs.some((ref) => ref?.current?.contains(targetElement))) {
        callback(event)
      }
    },
    [refs, callback]
  )

  useEffect(() => {
    if (refs.length === 0) {
      return
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [refs, handleClickOutside])
}
