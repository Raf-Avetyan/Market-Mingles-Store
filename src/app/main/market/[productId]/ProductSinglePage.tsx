'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import styles from './ProductSiglePage.module.scss'
import { ProductSinglePageSlider } from './productSinglePageSlider/ProductSinglePageSlider'
import useProductById from './useProductById'

export const ProductSingleCard = ({
	params
}: {
	params: {
		productId: string
	}
}) => {
	const { data } = useProductById(params.productId)
	const [showAllImages, setShowAllImages] = useState(false)
	const { push } = useRouter()
	const { productId } = params

	useEffect(() => {
		if (!productId) {
			push('/market')
		}
	}, [productId])

	const handleMoveOutside = (e: MouseEvent) => {
		if (!(e.target as HTMLElement).closest(`.${styles.card}`)) {
			setShowAllImages(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousemove', handleMoveOutside)

		return () => {
			document.removeEventListener('mousemove', handleMoveOutside)
		}
	}, [])

	return (
		<div className={styles.card}>
			<ProductSinglePageSlider
				data={data}
				setShowAllImages={setShowAllImages}
				showAllImages={showAllImages}
			/>
			<div className={styles.info}>
				<p className={styles.name}>{data?.name}</p>
				<p className={styles.description}>{data?.description}</p>
				<p className={styles.price}>{data?.price}</p>
			</div>
		</div>
	)
}
