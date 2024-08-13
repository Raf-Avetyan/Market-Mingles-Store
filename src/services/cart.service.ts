import { resolve } from 'path'

import { ICartResponse } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'

import { uploadService } from './upload.service'

class CartService {
	private BASE_URL = '/cart'

	async getByUserId() {
		const response = await axiosWithAuth.get<ICartResponse>(this.BASE_URL)
		return response.data
	}

	// async getByUserId() {
	// 	const response = await axiosWithAuth.get<ICartResponse[]>(this.BASE_URL)
	// 	return response.data
	// }
}

export const cartService = new CartService()
