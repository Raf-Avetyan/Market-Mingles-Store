import { Skeleton } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import { ICartResponse } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages.config'

import { useTheme } from '@/hooks/useTheme'

import styles from './CartMenuContent.module.scss'
import { CartMenuContentCardSlider } from './cartMenuContentCardSlider/CartMenuContentCardSlider'

interface ICartMenuContent {
	cartData?: ICartResponse
	currShowAllImagesId: string | null
	setCurrShowAllImagesId: Dispatch<SetStateAction<string | null>>
	setIsCartOpen: Dispatch<SetStateAction<boolean>>
}

export const CartMenuContent = ({
	cartData,
	currShowAllImagesId,
	setCurrShowAllImagesId,
	setIsCartOpen
}: ICartMenuContent) => {
	const cardRef = useRef<HTMLDivElement | null>(null)
	const [showAllImages, setShowAllImages] = useState(false)
	const [isLoadingImage, setIsLoadingImage] = useState(true)
	const image = useRef<HTMLDivElement | null>(null)
	const router = useRouter()
	const { themeMode } = useTheme()

	const onImageLoad = () => {
		setIsLoadingImage(false)
	}

	const handleToSinglePage = (productId: string) => {
		router.push(`${DASHBOARD_PAGES.MARKET}/${productId}`)
	}

	const handleMoveOutside = (e: MouseEvent) => {
		if (!(e.target as HTMLElement).closest(`.${styles.card}`)) {
			setShowAllImages(false)
			setCurrShowAllImagesId(null)
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
					ref={cardRef}
				>
					<div
						className={styles.image}
						ref={image}
					>
						<div>
							{isLoadingImage && (
								<Skeleton
									variant='rectangular'
									animation='wave'
									className={styles.skeleton}
								/>
							)}

							<CartMenuContentCardSlider
								data={item.product}
								imageUrls={item.product.imageUrls}
								id={item.product.id}
								onImageLoad={onImageLoad}
								isLoadingImage={isLoadingImage}
								handleToSinglePage={handleToSinglePage}
								currShowAllImagesId={currShowAllImagesId}
								setCurrShowAllImagesId={setCurrShowAllImagesId}
								showAllImages={showAllImages}
								setShowAllImages={setShowAllImages}
								setIsCartOpen={setIsCartOpen}
							/>
							<div className={styles.category}>
								<span>{item.product.category?.name}</span>
							</div>
						</div>
					</div>
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
