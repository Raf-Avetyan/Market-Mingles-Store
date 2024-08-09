import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { ChevronLeft, LogOut } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import { useProfile } from '@/hooks/useProfile'
import { useTheme } from '@/hooks/useTheme'

import styles from './ProfileMenu.module.scss'
import { authService } from '@/services/auth.service'

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

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.replace('/auth')
	})

	const router = useRouter()

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
						size={40}
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
					<div
						className={classNames(styles.logoutBtn, {
							[styles.light]: themeMode === 'light'
						})}
					>
						<button onClick={() => mutate()}>
							<LogOut size={20} />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
