import { ChangeEvent } from 'react'

type CallbackFunction = (e: ChangeEvent<HTMLInputElement>) => void

export default function useDebounce(
  callback: CallbackFunction,
  timeout: number
): CallbackFunction {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (e: ChangeEvent<HTMLInputElement>) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => callback(e), timeout)
  }
}
