import { useQuery } from '@tanstack/react-query'

import { IProductResponse } from '@/types/products.types'

import { productService } from '@/services/product.service'

export default function useProducts() {
	const { data, isFetching, isLoading } = useQuery<IProductResponse[]>({
		queryKey: ['products'],
		queryFn: () => productService.getAll()
	})

	return { data, isFetching, isLoading }
}
