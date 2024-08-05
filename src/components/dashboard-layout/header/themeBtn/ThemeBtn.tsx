'use client'

import classNames from 'classnames'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import styles from './ThemeBtn.module.scss'

export const ThemeBtn = () => {
	const [themeMode, setThemeMode] = useState<string>()

	const handleChangeTheme = () => {
		const htmlClassNames = document.documentElement.classList
		if (themeMode === 'dark') {
			setThemeMode('light')
			htmlClassNames.add('light')
			localStorage.setItem('theme', 'light')
		} else {
			setThemeMode('dark')
			htmlClassNames.remove('light')
			localStorage.setItem('theme', 'dark')
		}
	}

	useEffect(() => {
		const theme = localStorage.getItem('theme') || 'dark'
		setThemeMode(theme)
	}, [])

	useEffect(() => {
		if (!localStorage.getItem('theme')) {
			localStorage.setItem('theme', 'dark')
		}
	}, [])

	useEffect(() => {
		const value = localStorage.getItem('theme')
		if (value !== null && value === 'light') {
			document.documentElement.classList.add(value)
		}
	}, [])

	return (
		<div
			onClick={handleChangeTheme}
			className={classNames(styles.themeBtn, {
				[styles.active]: themeMode === 'light'
			})}
		>
			<div className={styles.thumb}>
				<div className={styles.circle}>
					{themeMode === 'dark' ? <Sun /> : <Moon />}
				</div>
			</div>
		</div>
	)
}
