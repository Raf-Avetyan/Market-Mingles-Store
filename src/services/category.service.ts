import { ICategoryFormState, ICategoryResponse } from '@/types/products.types'

import { axiosClassic, axiosWithAuth } from '@/api/interceptors'

class CategoryItemService {
	private BASE_URL = '/categories'

	async getAll() {
		const response = await axiosClassic.get<ICategoryResponse[]>(this.BASE_URL)
		return response.data
	}

	async getByName(name: string) {
		const response = await axiosClassic.get<ICategoryResponse>(
			`${this.BASE_URL}/${name}`
		)
		return response.data
	}

	async getAllNames() {
		const response = await axiosClassic.get<string[]>(`${this.BASE_URL}/names`)
		return response.data
	}

	async create(data: ICategoryFormState) {
		const response = await axiosWithAuth.post<ICategoryResponse>(
			this.BASE_URL,
			data
		)
		return response.data
	}
}

export const categoryItemService = new CategoryItemService()
