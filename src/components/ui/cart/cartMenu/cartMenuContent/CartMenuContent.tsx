import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { ICartResponse } from '@/types/auth.types'

import styles from './CartMenuContent.module.scss'
import { CartMenuContentSlide } from './cartMenuContentCardSlider/CartMenuContentCardSlider'

interface ICartMenuContent {
	cartData?: ICartResponse
}

export const CartMenuContent = ({ cartData }: ICartMenuContent) => {
	const [showAllImages, setShowAllImages] = useState(false)

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
		<div className={styles.wrapper}>
			{cartData?.items.map(item => (
				<div
					className={styles.card}
					key={item.product.id}
				>
					<CartMenuContentSlide
						data={item.product}
						setShowAllImages={setShowAllImages}
						showAllImages={showAllImages}
					/>
					<div className={styles.info}>
						<p className={styles.name}>{item.product?.name}</p>
						<p className={styles.description}>{item.product?.description}</p>
						<p className={styles.price}>{item.product?.price}</p>
						<p className={styles.quantity}>{item.quantity}</p>
					</div>
				</div>
			))}
		</div>
	)
}
