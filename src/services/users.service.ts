import { IUser } from '@/types/auth.types'

import { axiosClassic } from '@/api/interceptors'

class UsersService {
	private BASE_URL = '/users'

	async getAll() {
		const response = await axiosClassic.get<IUser[]>(this.BASE_URL)
		return response.data
	}
}

export const usersService = new UsersService()
