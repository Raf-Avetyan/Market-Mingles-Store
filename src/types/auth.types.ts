import { ICategoryResponse } from './products.types'

export interface ISigninForm {
	email: string
	password: string
}

export interface ISignupForm extends ISigninForm {
	username?: string
}

export interface IUser {
	id: string
	email: string
	username: string
	avatarPath: string
	cart: ICartResponse
}

export interface ICartResponse {
	id: string
	items: ICartItems[]
}

export interface ICartItems {
	id: string
	quantity: number
	product: {
		id: string
		name: string
		description: string
		price: string
		imageUrls: string[]
		category: ICategoryResponse
	}
}

export type TypeUserForm = Partial<Omit<IUser, 'id'>> & { password?: string }

export interface IAuthResponse {
	accessToken: string
	user: IUser
}
