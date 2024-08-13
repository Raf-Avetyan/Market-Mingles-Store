import { IBase } from './root.types'

export interface ICategoryResponse extends ICategoryFormState {
	id: string
	value: string
	products: IProductResponse[]
	filters: IFilter[]
}

export interface ICategoryFormState {
	name: string
}

export interface IFilter {
	id: string
	name: string
	options: IFilterOption[]
}

export interface IFilterOption {
	id: string
	text: string
	value: string
}

export interface IProductResponse extends IBase {
	name: string
	price: string
	description: string
	imageUrls: string[]
	category: ICategoryResponse
}
export interface IProductResponseForUser
	extends Omit<IProductResponse, 'userId'> {}

export type TypeProductFormState = Omit<
	IProductResponse,
	'id' | 'updatedAt' | 'userId' | 'createdAt'
>
