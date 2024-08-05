'use client'

import classNames from 'classnames'

import { SearchForm } from '@/components/ui/searchForm/SearchForm'

import { useTheme } from '@/hooks/useTheme'

import styles from './Header.module.scss'
import { Profile } from './profile/Profile'
import { ThemeBtn } from './themeBtn/ThemeBtn'

export const Header = () => {
	const { themeMode } = useTheme()

	return (
		<header
			className={classNames(styles.header, {
				[styles.light]: themeMode === 'light'
			})}
		>
			<SearchForm />
			<div className={styles.right}>
				<ThemeBtn />
				<Profile />
			</div>
		</header>
	)
}
