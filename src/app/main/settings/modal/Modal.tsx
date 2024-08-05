'use client'

import { Skeleton } from '@mui/material'
import classNames from 'classnames'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'

import { useTheme } from '@/hooks/useTheme'

import styles from './Modal.module.scss'

interface IModalProps {
	avatarPath: string
	setIsDoneNewAvatar: Dispatch<SetStateAction<boolean>>
	setModalIsOpen: Dispatch<SetStateAction<boolean>>
	setuserSelectedAvatarURL: Dispatch<SetStateAction<string>>
	setSelectedFile: Dispatch<SetStateAction<File | null>>
	selectedFile: File | null
	setCurrFile: Dispatch<SetStateAction<File | null>>
}

export const Modal = ({
	avatarPath,
	setIsDoneNewAvatar,
	setModalIsOpen,
	setuserSelectedAvatarURL,
	setSelectedFile,
	selectedFile,
	setCurrFile
}: IModalProps) => {
	const [loading, setLoading] = useState(true)
	const { themeMode } = useTheme()

	function onImageLoad() {
		setLoading(false)
	}

	return (
		<div
			className={classNames(styles.wrapper, {
				[styles.light]: themeMode === 'light'
			})}
		>
			<div className={styles.modal}>
				<div className={styles.avatarWrapper}>
					{loading && (
						<Skeleton
							variant='rectangular'
							animation='wave'
							className={styles.skeletonCircle}
						/>
					)}
					<Image
						src={avatarPath}
						alt=''
						width={300}
						height={300}
						className={styles.avatar}
						onLoad={onImageLoad}
						style={{ display: loading ? 'none' : 'block' }}
						priority
					/>
				</div>
				<div className={styles.buttons}>
					<button
						className={`${styles.modalBtn} ${styles.red}`}
						onClick={() => {
							setModalIsOpen(false)
							setIsDoneNewAvatar(false)
							setSelectedFile(null)
						}}
					>
						cancel
					</button>
					<button
						className={`${styles.modalBtn} ${styles.green}`}
						onClick={() => {
							setModalIsOpen(false)
							setIsDoneNewAvatar(true)
							setuserSelectedAvatarURL(avatarPath)
							setSelectedFile(null)
							setCurrFile(selectedFile)
						}}
					>
						done
					</button>
				</div>
			</div>
		</div>
	)
}
