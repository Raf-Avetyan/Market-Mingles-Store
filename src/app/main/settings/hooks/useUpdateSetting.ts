import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeUserForm } from '@/types/auth.types'

import { uploadService } from '@/services/upload.service'
import { userService } from '@/services/user.service'

export function useUpdateSettings() {
	const queryClient = useQueryClient()

	const { mutate: avatarMutate } = useMutation({
		mutationKey: ['upload avatar'],
		mutationFn: (formData: FormData) => uploadService.uploadAvatar(formData)
	})

	const {
		mutate: profileMutate,
		isPending,
		isSuccess
	} = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: TypeUserForm) => userService.updateProfile(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['profile'] }),
				toast.success('Successfully update profile!')
		},
		onError() {
			toast.error('Updating failed! Try again later!')
		}
	})

	return { profileMutate, avatarMutate, isPending, isSuccess }
}
