'use client'

import { Box, Skeleton } from '@mui/material'
import classNames from 'classnames'
import { LucideSquareArrowOutUpRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { ProfileMenu } from '@/components/ui/profile/ProfileMenu'

import { useProfile } from '@/hooks/useProfile'
import { useTheme } from '@/hooks/useTheme'

import styles from './Profile.module.scss'

export const Profile = () => {
	let { data, isLoading } = useProfile()
	const { themeMode } = useTheme()

	const [loading, setLoading] = useState(true)
	const [isProfileOpen, setIsProfileOpen] = useState(false)

	function onImageLoad() {
		setLoading(false)
	}

	useEffect(() => {
		setLoading(true)
	}, [data?.avatarPath])

	return (
		<>
			<ProfileMenu
				isProfileOpen={isProfileOpen}
				setIsProfileOpen={setIsProfileOpen}
			/>
			{!isLoading ? (
				<div
					className={classNames(styles.profile, {
						[styles.light]: themeMode === 'light'
					})}
					onClick={() => setIsProfileOpen(!isProfileOpen)}
				>
					{data?.avatarPath ? (
						<>
							{loading && (
								<Skeleton
									variant='circular'
									animation='wave'
									className={styles.skeletonCircle}
								/>
							)}
							<Image
								src={data.avatarPath}
								width={60}
								height={60}
								alt='A'
								onLoad={onImageLoad}
								style={{ display: loading ? 'none' : 'block' }}
								className={styles.userAvatar}
								priority
							/>
						</>
					) : (
						<div className={styles.userAvatar}>
							{data?.username[0].toUpperCase()}
						</div>
					)}

					<div className={styles.info}>
						<span className={styles.username}>{data?.username}</span>
						<span className={styles.email}>{data?.email}</span>
						<span className={styles.userId}>ID: {data?.id}</span>
					</div>
					<LucideSquareArrowOutUpRight
						className={styles.linkIcon}
						size={15}
					/>
				</div>
			) : (
				<Box
					width={{ width: 320 }}
					className={styles.skeletonBox}
				>
					<Skeleton
						variant='circular'
						width={60}
						height={60}
						animation='wave'
						className={styles.skeletonCircle}
					/>
					<Box sx={{ width: 240 }}>
						<Skeleton
							animation='wave'
							height={35}
							className={styles.skeleton}
						/>
						<Skeleton
							animation='wave'
							className={styles.skeleton}
						/>
						<Skeleton
							animation='wave'
							className={styles.skeleton}
						/>
					</Box>
				</Box>
			)}
		</>
	)
}
