'use client'

import { useMutation } from '@tanstack/react-query'
import { EyeOff, ScanEye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button/Button'
import { Loader } from '@/components/ui/loader/Loader'

import { ISigninForm, ISignupForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages.config'

import styles from './Auth.module.scss'
import { authService } from '@/services/auth.service'

export default function Auth() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ISigninForm | ISignupForm>({
		mode: 'onChange'
	})

	const [isLoginForm, setIsLoginForm] = useState(true)

	const { replace } = useRouter()

	const { mutate, isPending } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: ISigninForm | ISignupForm) =>
			authService.main(isLoginForm ? 'signin' : 'signup', data),
		onSuccess: () => {
			toast.success(`Successfully ${isLoginForm ? 'logined' : 'registered'}!`)
			reset()
			replace(DASHBOARD_PAGES.HOME)
		},
		onError: () => {
			toast.error(`${isLoginForm ? 'Login' : 'Register'} failed! Try again`)
			reset()
		}
	})

	const onSubmit: SubmitHandler<ISigninForm | ISignupForm> = data => {
		mutate(data)
	}

	const [isShowPassword, setIsShowPassword] = useState(false)

	return (
		<div className={styles.wrapper}>
			{!isPending ? (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={styles.form}
				>
					<h1 className={styles.title}>{isLoginForm ? 'Signin' : 'Signup'}</h1>
					<div className={styles.inputs}>
						{!isLoginForm && (
							<input
								type='text'
								placeholder='Username*'
								{...register('username')}
								autoComplete='off'
							/>
						)}
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
						<div className={styles.password}>
							<input
								type={isShowPassword ? 'text' : 'password'}
								placeholder='Password'
								{...register('password', { required: true, minLength: 6 })}
								className={errors.password ? styles.error : ''}
							/>
							{errors.password && (
								<p className={styles.inputError}>
									Password must be at least 6 characters long!
								</p>
							)}
							<span onClick={() => setIsShowPassword(!isShowPassword)}>
								{isShowPassword ? (
									<EyeOff className={styles.eyeIcon} />
								) : (
									<ScanEye className={styles.eyeIcon} />
								)}
							</span>
						</div>
					</div>
					{isLoginForm ? (
						<>
							<Button
								type='submit'
								onClick={() => setIsLoginForm(true)}
								className={styles.button}
								disabled={isPending}
							>
								Login
							</Button>
							<p className={styles.question}>
								Don&apos;t have an account?
								<span onClick={() => setIsLoginForm(false)}> Signup</span>
							</p>
						</>
					) : (
						<>
							<Button
								type='submit'
								onClick={() => setIsLoginForm(false)}
								className={styles.button}
								disabled={isPending}
							>
								Signup
							</Button>
							<p className={styles.question}>
								Already have an account?
								<span onClick={() => setIsLoginForm(true)}> Signin</span>
							</p>
						</>
					)}
				</form>
			) : (
				<Loader size={60} />
			)}
		</div>
	)
}
