'use client'

import classNames from 'classnames'
import { PropsWithChildren, useEffect, useState } from 'react'

import { useTheme } from '@/hooks/useTheme'

import { GlobalLoader } from '../ui/globalLoader/globalLoader'

import styles from './DashboardLayout.module.scss'
import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'

export default function DashboardLayout({ children }: PropsWithChildren) {
	const [sidebarWidth, setSidebarWidth] = useState(1.4)
	const [mainWidth, setMainWidth] = useState(6)
	const [fullWidth, setFullWidth] = useState(1)
	const { themeMode } = useTheme()

	useEffect(() => {
		const width = window.innerWidth
		setFullWidth(width)

		const storeSidebarWidth = localStorage.getItem('sidebarWidth')

		if (storeSidebarWidth) {
			const newSidebarWidth = parseFloat(storeSidebarWidth)
			const newMainWidth = sidebarWidth + mainWidth - newSidebarWidth

			setSidebarWidth(newSidebarWidth)
			setMainWidth(newMainWidth)
		}

		if (width >= 320 && width <= 650) {
			onWidthChange(10)
		}
	}, [])

	const onWidthChange = (width: number) => {
		const newSidebarWidth =
			(width / window.innerWidth) * (sidebarWidth + mainWidth)
		const newMainWidth = sidebarWidth + mainWidth - newSidebarWidth

		setSidebarWidth(Number(newSidebarWidth.toFixed(1)))
		setMainWidth(Number(newMainWidth.toFixed(1)))

		localStorage.setItem('sidebarWidth', String(newSidebarWidth.toFixed(1)))
	}

	return (
		<div
			className={classNames(styles.wrapper, {
				[styles.light]: themeMode === 'light'
			})}
			style={{
				gridTemplateColumns:
					sidebarWidth < 1.4
						? `100px ${mainWidth}fr`
						: `${sidebarWidth}fr ${mainWidth}fr`
			}}
		>
			<Sidebar
				onWidthChange={onWidthChange}
				sidebarWidth={sidebarWidth}
				fullWidth={fullWidth}
			/>
			<main className={styles.main}>
				<Header />
				<GlobalLoader />
				{children}
			</main>
		</div>
	)
}
