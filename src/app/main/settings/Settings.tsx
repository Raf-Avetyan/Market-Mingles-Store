'use client'

import { Button, Skeleton } from '@mui/material'
import classNames from 'classnames'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Heading } from '@/components/ui/heading/Heading'

import { TypeUserForm } from '@/types/auth.types'

import { useTheme } from '@/hooks/useTheme'

import styles from './Settings.module.scss'
import { useInitialData } from './hooks/useInitialData'
import { useUpdateSettings } from './hooks/useUpdateSetting'
import { Profile } from './profile/Profile'
import { UserAvatarChange } from './userAvatarChange/userAvatarChange'
import { Modal } from '@/app/main/settings/modal/Modal'

export const Settings = () => {
	const [isLoaded, setIsLoaded] = useState(false)
	const router = useRouter()

	useEffect(() => {
		setIsLoaded(true)
	}, [])

	return (
		<div className={styles.settings}>
			<Heading title='Settings' />
			{isLoaded ? (
				<Profile router={router} />
			) : (
				<Skeleton
					variant='rectangular'
					className={styles.skeleton}
				/>
			)}
		</div>
	)
}
