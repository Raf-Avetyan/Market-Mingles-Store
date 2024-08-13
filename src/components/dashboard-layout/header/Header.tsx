'use client'

import classNames from 'classnames'

import { Cart } from '@/components/ui/cart/Cart'
import { SearchForm } from '@/components/ui/searchForm/SearchForm'

import { useTheme } from '@/hooks/useTheme'

import styles from './Header.module.scss'
import { Profile } from './profile/Profile'
import { ThemeBtn } from './themeBtn/ThemeBtn'

interface IHeaderProps {
	sidebarWidth: number
}

export const Header = ({ sidebarWidth }: IHeaderProps) => {
	const { themeMode } = useTheme()

	return (
		<header
			className={classNames(styles.header, {
				[styles.light]: themeMode === 'light',
				[styles.hidden]: sidebarWidth > 1.4
			})}
		>
			<SearchForm />
			<div className={styles.right}>
				<ThemeBtn />
				<Cart />
				<Profile />
			</div>
		</header>
	)
}
