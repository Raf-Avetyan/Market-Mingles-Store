import { useQuery } from '@tanstack/react-query'

import { cartService } from '@/services/cart.service'

export const useCart = () => {
	return useQuery({
		queryKey: ['cart'],
		queryFn: () => cartService.getByUserId()
	})
}
