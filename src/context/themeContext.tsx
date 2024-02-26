'use client'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { ThemeContextType } from '@/types/themeTypes'
const initialState: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
}
const ThemeContext = createContext<ThemeContextType>(initialState)

type ThemeContextProps = {
  children: ReactNode
}
export function ThemeProvider({ children }: ThemeContextProps) {
  const [theme, setTheme] = useState<string>(initialState.theme)
  const isMounted = useRef(false)
  const getSystemTheme = () => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const systemTheme = isDark ? 'dark' : 'light'
    return systemTheme
  }
  const applyTheme = useCallback((theme: string) => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
  }, [])

  const mountDefault = useCallback(() => {
    const browserTheme = getSystemTheme()
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setTheme(storedTheme)
    } else {
      setTheme(browserTheme ? 'dark' : initialState.theme)
    }
  }, [])

  useEffect(() => {
    if (!isMounted.current) {
      mountDefault()
    }
    localStorage.setItem('theme', theme)
    applyTheme(theme)
    isMounted.current = true
  }, [theme, isMounted, applyTheme, mountDefault])

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }, [])

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  )
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
