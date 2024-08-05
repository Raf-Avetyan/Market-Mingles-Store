'use client'

import { Skeleton } from '@mui/material'
import classNames from 'classnames'
import { SquarePen } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import styles from './userAvatarChange.module.scss'
import { IProfileResponse } from '@/services/user.service'

interface IUserAvatarChangeProps {
	userProfile: IProfileResponse | undefined
	userSelectedAvatarURL: string
	handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	themeMode: string
}

export const UserAvatarChange = ({
	userProfile,
	userSelectedAvatarURL,
	handleFileChange,
	themeMode
}: IUserAvatarChangeProps) => {
	const [fileValue, setFileValue] = useState('')
	const [isAvatarHovered, setisAvatarHovered] = useState(false)
	const [isAvatarLoading, setIsAvatarLoading] = useState(true)
	const onImageLoad = () => setIsAvatarLoading(false)

	return (
		<div
			className={classNames(styles.avatarSide, {
				[styles.light]: themeMode === 'light'
			})}
		>
			<div
				className={classNames(styles.avatar, {
					[styles.opacity]: isAvatarHovered
				})}
				onMouseEnter={() => setisAvatarHovered(true)}
				onMouseLeave={() => setisAvatarHovered(false)}
			>
				{userProfile?.avatarPath ? (
					<>
						{isAvatarLoading && (
							<Skeleton
								variant='circular'
								animation='wave'
								className={styles.skeletonCircle}
							/>
						)}
						<Image
							src={
								userSelectedAvatarURL
									? userSelectedAvatarURL
									: userProfile?.avatarPath
							}
							width={140}
							height={140}
							alt=''
							onLoad={onImageLoad}
							style={{ display: isAvatarLoading ? 'none' : 'block' }}
							className={styles.userAvatar}
							priority
						/>
					</>
				) : userSelectedAvatarURL ? (
					<Image
						src={userSelectedAvatarURL}
						width={140}
						height={140}
						onLoad={onImageLoad}
						style={{ display: isAvatarLoading ? 'none' : 'block' }}
						alt=''
						className={styles.userAvatar}
						priority
					/>
				) : (
					<div className={styles.userAvatar}>
						{userProfile?.username[0].toUpperCase()}
					</div>
				)}
				<input
					type='file'
					onChange={handleFileChange}
					value={fileValue}
					className={styles.hidden}
					id='avatar'
				/>
				<label
					htmlFor='avatar'
					className={classNames(styles.labelAvatar, {
						[styles.visible]: isAvatarHovered
					})}
					onClick={() => {
						setFileValue('')
					}}
				>
					<SquarePen
						size={30}
						className={styles.cutomizeIcon}
					/>
				</label>
			</div>
		</div>
	)
}
