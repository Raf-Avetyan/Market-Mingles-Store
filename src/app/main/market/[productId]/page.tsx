import { Metadata } from 'next'
import { useParams } from 'next/navigation'

import { ProductSingleCard } from './ProductSinglePage'
import { NO_INDEX_PAGE } from '@/constants/ceo.constants'

export const metadata: Metadata = {
	title: 'Single page',
	...NO_INDEX_PAGE
}

export default function ProductSinglePage({
	params
}: {
	params: {
		productId: string
	}
}) {
	return <ProductSingleCard params={params} />
}
