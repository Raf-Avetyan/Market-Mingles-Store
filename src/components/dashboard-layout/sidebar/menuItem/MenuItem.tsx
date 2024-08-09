'use client'

import classNames from 'classnames'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { IMenuItem, IconName } from '@/types/menu-item.types'

import styles from './MenuItem.module.scss'

interface IMenuProps {
	item: IMenuItem
	pathname: string
	sidebarWidth: number
	themeMode: string
	onWidthChange: (newWidth: number) => void
}

export const MenuItem = ({
	item,
	pathname,
	sidebarWidth,
	themeMode,
	onWidthChange
}: IMenuProps) => {
	const [hoveredItemName, setHoveredItemName] = useState('')

	const LucideIcon = Icons[item.icon as IconName] as Icons.LucideIcon

	const handleMouseEnter = (name: string) => {
		setHoveredItemName(name)
	}

	const handleMouseLeave = () => {
		setHoveredItemName('')
	}

	return (
		<div
			className={classNames(styles.menuItem, {
				[styles.hidden]: sidebarWidth < 1.4,
				[styles.light]: themeMode === 'light'
			})}
			onMouseEnter={() => handleMouseEnter(item.name)}
			onMouseLeave={handleMouseLeave}
			onClick={() => onWidthChange(10)}
		>
			<div>
				<span className={hoveredItemName === item.name ? styles.active : ''}>
					{item.name}
				</span>
				<Link
					href={item.link}
					className={item.link == pathname ? styles.active : ''}
				>
					<LucideIcon className={styles.icon} />
					<span className={styles.name}>{item.name}</span>
				</Link>
			</div>
		</div>
	)
}
