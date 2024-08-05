import { IProductResponse } from '@/types/products.types'

import { axiosClassic } from '@/api/interceptors'

class FiltersService {
	private BASE_URL = '/filters'

	async submitFilters(filterParams: string) {
		const response = await axiosClassic.get<IProductResponse[]>(
			`${this.BASE_URL}?${filterParams}`
		)
		return response.data
	}
}

export const filtersService = new FiltersService()
