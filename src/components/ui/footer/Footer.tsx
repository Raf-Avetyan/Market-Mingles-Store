import classNames from 'classnames'
import Link from 'next/link'

import { DASHBOARD_PAGES } from '@/config/pages.config'

import { useTheme } from '@/hooks/useTheme'

import styles from './Footer.module.scss'
import { SITE_NAME } from '@/constants/ceo.constants'

interface IFooterProps {
	sidebarWidth: number
}

export const Footer = ({ sidebarWidth }: IFooterProps) => {
	const { themeMode } = useTheme()

	return (
		<footer
			className={classNames(styles.footer, {
				[styles.small]: sidebarWidth < 1.4,
				[styles.light]: themeMode === 'light'
			})}
		>
			2024 &copy; With love from{' '}
			<Link
				href={DASHBOARD_PAGES.HOME}
				target='_blank'
			>
				{SITE_NAME}.
			</Link>
			<br />
			All rights reserved.
		</footer>
	)
}
