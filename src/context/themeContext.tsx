'use client'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { ThemeContextType } from '@/types/themeTypes'

const initialState: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {
    console.log('test123')
  },
}
const ThemeContext = createContext<ThemeContextType>(initialState)

type ThemeContextProps = {
  children: ReactNode
}
export function ThemeProvider({ children }: ThemeContextProps) {
  const [theme, setTheme] = useState<string>(initialState.theme)

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
  }, [theme])

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
