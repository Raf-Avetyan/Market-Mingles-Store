'use client'

import { Box, Skeleton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'

import { Footer } from '@/components/ui/footer/Footer'
import { Logo } from '@/components/ui/logo/Logo'

import { IMenuItem } from '@/types/menu-item.types'

import { useTheme } from '@/hooks/useTheme'

import styles from './Sidebar.module.scss'
import { MenuItem } from './menuItem/MenuItem'
import { menuItemService } from '@/services/menu-item.service'

interface SidebarProps {
	onWidthChange: (newWidth: number) => void
	sidebarWidth: number
	fullWidth: number
}

export const Sidebar = ({
	onWidthChange,
	sidebarWidth,
	fullWidth
}: SidebarProps) => {
	const isResizing = useRef(false)
	const [isResizingSidebar, setIsResizingSidebar] = useState(false)
	const { themeMode, setThemeMode } = useTheme()

	const { data, isLoading } = useQuery<IMenuItem[]>({
		queryKey: ['menu-items'],
		queryFn: () => menuItemService.getAll()
	})

	const pathname = usePathname()

	const handleMouseDown = (e: React.MouseEvent | MouseEvent) => {
		document.body.style.cursor = 'w-resize'

		if (e.clientX >= 95 && e.clientX <= 100) {
			return onWidthChange(300)
		}

		e.preventDefault()
		e.stopPropagation()

		isResizing.current = true
		setIsResizingSidebar(true)

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (!isResizing) return
		let newWidth = e.clientX

		if (newWidth > 450) newWidth = 450

		onWidthChange(newWidth)
	}

	const handleMouseUp = () => {
		document.body.style.cursor = 'auto'

		isResizing.current = false
		setIsResizingSidebar(false)

		document.removeEventListener('mousemove', handleMouseMove)
		document.removeEventListener('mouseup', handleMouseUp)
	}

	return (
		<aside
			className={classNames(styles.sidebar, {
				[styles.hidden]: sidebarWidth < 1.4,
				[styles.light]: themeMode === 'light'
			})}
		>
			<Logo sidebarWidth={sidebarWidth} />
			<div className={styles.menu}>
				{sidebarWidth >= 1.4 ? (
					<div
						className={styles.panelToggleBtn}
						onClick={() => {
							if (fullWidth <= 650) {
								onWidthChange(10)
							} else {
								onWidthChange(100)
							}
						}}
					>
						<PanelRightOpen />
					</div>
				) : (
					<div
						className={styles.panelToggleBtn}
						onClick={() => {
							if (fullWidth <= 650) {
								onWidthChange(240)
							} else {
								onWidthChange(300)
							}
						}}
					>
						<PanelLeftOpen />
					</div>
				)}

				{!isLoading ? (
					data
						?.sort((item, currItem) => item.id - currItem.id)
						?.map(item => (
							<MenuItem
								item={item}
								key={item.id}
								pathname={pathname}
								sidebarWidth={sidebarWidth}
								themeMode={themeMode}
								onWidthChange={onWidthChange}
							/>
						))
				) : (
					<Box className={styles.skeletonWrapper}>
						{[
							...Array(4)
								.fill(null)
								.map((_, index) => (
									<Box
										className={styles.skeletonBox}
										key={index}
									>
										<Skeleton
											variant='rectangular'
											className={styles.skeletonRectangular}
										/>
										{sidebarWidth > 1.4 || fullWidth >= 650 ? (
											<Skeleton
												animation='wave'
												className={styles.skeleton}
											/>
										) : null}
									</Box>
								))
						]}
					</Box>
				)}
			</div>
			<Footer sidebarWidth={sidebarWidth} />
			<div
				className={classNames(styles.resize, {
					[styles.active]: isResizingSidebar
				})}
				onMouseDown={handleMouseDown}
			/>
		</aside>
	)
}
