import { useState, useEffect, useCallback } from 'react'

const THEME_KEY = 'ink-to-nature-theme'

export default function useTheme() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY)
    return saved === 'dark'
  })

  useEffect(() => {
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const toggleTheme = useCallback(() => setDark((d) => !d), [])

  return { dark, toggleTheme }
}
