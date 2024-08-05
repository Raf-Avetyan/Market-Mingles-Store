import { IMenuItem } from '@/types/menu-item.types'

import { axiosClassic } from '@/api/interceptors'

class MenuItemService {
	private BASE_URL = '/menu-item'

	async getAll() {
		const response = await axiosClassic.get<IMenuItem[]>(this.BASE_URL)
		return response.data
	}

	async create(data: IMenuItem) {
		const response = await axiosClassic.post<IMenuItem>(this.BASE_URL, data)
		return response.data
	}
}

export const menuItemService = new MenuItemService()
