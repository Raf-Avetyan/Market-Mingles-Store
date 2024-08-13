import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import { LogoutButton } from '@/components/dashboard-layout/sidebar/logoutButton/LogoutButton'

import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/useProfile'
import { useTheme } from '@/hooks/useTheme'

import styles from './ProfileMenu.module.scss'
import { productService } from '@/services/product.service'

interface IProfileMenuProps {
	isProfileOpen: boolean
	setIsProfileOpen: Dispatch<SetStateAction<boolean>>
}

export const ProfileMenu = ({
	isProfileOpen,
	setIsProfileOpen
}: IProfileMenuProps) => {
	const dropdownRef = useRef<HTMLDivElement | null>(null)
	const { themeMode } = useTheme()

	const { data, isLoading } = useProfile()

	const handleClickOutside = (e: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(e.target as Node)
		) {
			setIsProfileOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div
			className={classNames(styles.wrapper, {
				[styles.active]: isProfileOpen,
				[styles.light]: themeMode === 'light'
			})}
		>
			<div
				className={classNames(styles.profile, {
					[styles.active]: isProfileOpen
				})}
				ref={dropdownRef}
			>
				<div className={styles.top}>
					<ChevronLeft
						className={styles.closeBtn}
						onClick={() => setIsProfileOpen(!isProfileOpen)}
					/>
					<div className={styles.userId}>ID: {data?.id}</div>
				</div>
				<div className={styles.content}>
					<div className={styles.avatar}>
						{data?.avatarPath ? (
							<img
								src={data.avatarPath}
								alt='Avatar'
							/>
						) : (
							<div className={styles.default}>
								{data?.username[0].toUpperCase()}
							</div>
						)}
					</div>
					<div className={styles.username}>{data?.username}</div>
					<div className={styles.email}>{data?.email}</div>
					<LogoutButton />
				</div>
			</div>
		</div>
	)
}
