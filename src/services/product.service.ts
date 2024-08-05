import { resolve } from 'path'

import { IProductResponse, TypeProductFormState } from '@/types/products.types'

import { axiosClassic, axiosWithAuth } from '@/api/interceptors'

import { uploadService } from './upload.service'

class ProductService {
	private BASE_URL = '/products'

	async getAll() {
		const response = await axiosClassic.get<IProductResponse[]>(this.BASE_URL)
		return response.data
	}

	async create(data: {
		data: Omit<TypeProductFormState, 'imagePath'>
		productImage: FormData
	}) {
		const response = await axiosWithAuth.post<IProductResponse>(
			this.BASE_URL,
			data.data
		)
		if (response) {
			return uploadService.uploadProductImage({
				productImage: data.productImage,
				id: response.data.id
			})
		}
	}

	async search(slug: string) {
		const response = await axiosClassic.get<IProductResponse[]>(
			`${this.BASE_URL}/${slug}`
		)
		return response.data
	}

	async getById(id: string) {
		const response = await axiosClassic.get<IProductResponse>(
			`${this.BASE_URL}/${id}`
		)
		return response.data
	}
}

export const productService = new ProductService()
