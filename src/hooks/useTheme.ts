'use client'

import { useEffect, useState } from 'react'

export function useTheme() {
	const [themeMode, setThemeMode] = useState('')

	useEffect(() => {
		const theme = localStorage.getItem('theme') || 'dark'
		setThemeMode(theme)
	}, [])

	useEffect(() => {
		const handleStorageChange = () => {
			const newMode = localStorage.getItem('theme') || 'dark'
			setThemeMode(newMode)
		}

		// Add event listener for storage changes
		window.addEventListener('storage', handleStorageChange)

		// Add event listener for local storage changes
		const originalSetItem = localStorage.setItem
		localStorage.setItem = function (key, value) {
			originalSetItem.call(this, key, value)
			if (key === 'theme') {
				handleStorageChange()
			}
		}

		return () => {
			window.removeEventListener('storage', handleStorageChange)
			localStorage.setItem = originalSetItem
		}
	}, [])

	return { themeMode, setThemeMode }
}
