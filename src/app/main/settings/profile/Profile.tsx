'use client'

import { Button } from '@mui/material'
import classNames from 'classnames'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { TypeUserForm } from '@/types/auth.types'

import { useTheme } from '@/hooks/useTheme'

import { useInitialData } from '../hooks/useInitialData'
import { useUpdateSettings } from '../hooks/useUpdateSetting'
import { Modal } from '../modal/Modal'
import { UserAvatarChange } from '../userAvatarChange/userAvatarChange'

import styles from './Profile.module.scss'

interface IProfileProps {
	router: AppRouterInstance
}

export const Profile = ({ router: { prefetch } }: IProfileProps) => {
	const [currFile, setCurrFile] = useState<File | null>(null)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
	const [userAvatarURLForChange, setUserAvatarURLForChange] =
		useState<string>('')
	const [userSelectedAvatarURL, setUserSelectedAvatarURL] = useState<string>('')
	const [isDoneNewAvatar, setIsDoneNewAvatar] = useState<boolean>(false)
	const pathname = usePathname()
	const { themeMode } = useTheme()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TypeUserForm>({
		mode: 'onChange'
	})

	const { data: userProfile } = useInitialData(reset)
	const { profileMutate, avatarMutate, isPending } = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data
		const formData = new FormData()
		if (currFile) formData.append('avatar', currFile)

		profileMutate({
			...rest,
			password: password || undefined
		})
		if (currFile) avatarMutate(formData)
		prefetch(pathname)
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setUserAvatarURLForChange(URL.createObjectURL(e.target.files[0]))
			setModalIsOpen(true)
			setSelectedFile(e.target.files[0])
		}
	}

	return (
		<div className={styles.profile}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={classNames(styles.form, {
					[styles.light]: themeMode === 'light'
				})}
			>
				<h2 className={styles.title}>Profile</h2>
				<div className={styles.inputs}>
					<div>
						<input
							type='text'
							placeholder='Username*'
							{...register('username')}
							autoComplete='off'
						/>
						<input
							type='text'
							placeholder='Email'
							{...register('email', { required: true })}
							autoComplete='off'
							className={errors.email ? styles.error : ''}
						/>
						{errors.email && (
							<p className={styles.inputError}>This field is required!</p>
						)}
						<input
							placeholder='Password'
							{...register('password', { minLength: 6 })}
							className={errors.password ? styles.error : ''}
							autoComplete='off'
						/>
						{errors.password && (
							<p className={styles.inputError}>
								Password must be at least 6 characters long!
							</p>
						)}
					</div>
					<UserAvatarChange
						userProfile={userProfile}
						userSelectedAvatarURL={userSelectedAvatarURL}
						handleFileChange={handleFileChange}
						themeMode={themeMode}
					/>
				</div>
				<div>
					<Button
						type='submit'
						disabled={isPending}
						className={styles.button}
					>
						Save
					</Button>
				</div>
			</form>
			{modalIsOpen ? (
				<Modal
					avatarPath={userAvatarURLForChange}
					setIsDoneNewAvatar={setIsDoneNewAvatar}
					setModalIsOpen={setModalIsOpen}
					setuserSelectedAvatarURL={setUserSelectedAvatarURL}
					setSelectedFile={setSelectedFile}
					selectedFile={selectedFile}
					setCurrFile={setCurrFile}
				/>
			) : null}
		</div>
	)
}
