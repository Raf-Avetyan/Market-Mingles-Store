import SiteLogo from '/src/app/icon.svg'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import { DASHBOARD_PAGES } from '@/config/pages.config'

import { useTheme } from '@/hooks/useTheme'

import styles from './Logo.module.scss'
import { SITE_NAME } from '@/constants/ceo.constants'

interface ILogoProps {
	sidebarWidth: number
	fullWidth: number
}

export const Logo = ({ sidebarWidth, fullWidth }: ILogoProps) => {
	const { themeMode } = useTheme()

	return (
		<div
			className={classNames(styles.logo, {
				[styles.light]: themeMode === 'light',
				[styles.hidden]: sidebarWidth < 1.4
			})}
		>
			<Link href={DASHBOARD_PAGES.HOME}>
				<Image
					src={SiteLogo}
					alt='Logo'
					width={60}
					height={60}
					draggable={false}
				/>
				{fullWidth > 650 || sidebarWidth > 1.4 ? (
					<>
						<h1>
							{SITE_NAME.toUpperCase()
								.split(' ')
								.map((word, index) => (
									<p key={index}>{word}</p>
								))}
						</h1>
						<span className={styles.beta}>beta</span>
					</>
				) : null}
			</Link>
		</div>
	)
}
