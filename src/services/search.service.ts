import { IProductResponse } from '@/types/products.types'

import { axiosClassic } from '@/api/interceptors'

class SearchService {
	private BASE_URL = '/s'

	async search(slug: string | null) {
		const response = await axiosClassic.post<IProductResponse[]>(
			`${this.BASE_URL}?t=${slug}`
		)
		return response.data
	}
}

export const searchService = new SearchService()
