'use client'

import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useTheme } from '@/hooks/useTheme'

import styles from './LogoutButton.module.scss'
import { authService } from '@/services/auth.service'

export const LogoutButton = () => {
	const { themeMode } = useTheme()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.replace('/auth')
	})

	const router = useRouter()

	return (
		<div
			className={classNames(styles.logoutBtn, {
				[styles.light]: themeMode === 'light'
			})}
		>
			<button onClick={() => mutate()}>
				<LogOut size={20} />
			</button>
		</div>
	)
}
