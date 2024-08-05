import { headers } from 'next/headers'

import { IUser } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'

class UploadService {
	private BASE_URL = '/uploads'

	async uploadAvatar(data: FormData) {
		const response = await axiosWithAuth.post<IUser>(
			`${this.BASE_URL}/avatar`,
			data,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		)
		return response.data
	}

	async uploadProductImage(data: { productImage: FormData; id: string }) {
		const response = await axiosWithAuth.post<IUser>(
			`${this.BASE_URL}/product-image/${data.id}`,
			data.productImage,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		)
		return response.data
	}
}

export const uploadService = new UploadService()
