import { useQuery } from '@tanstack/react-query'

import { IProductResponse } from '@/types/products.types'

import { productService } from '@/services/product.service'

export default function useProductById(id: string) {
	const { data, isFetching, isLoading } = useQuery<IProductResponse>({
		queryKey: ['productById'],
		queryFn: () => productService.getById(id)
	})

	return { data, isFetching, isLoading }
}
