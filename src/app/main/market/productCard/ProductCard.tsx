'use client'

import { Skeleton } from '@mui/material'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState
} from 'react'

import { IProductResponse } from '@/types/products.types'

import { DASHBOARD_PAGES } from '@/config/pages.config'

import { useTheme } from '@/hooks/useTheme'

import styles from './ProductCard.module.scss'
import { ImagesSlide } from './imagesSlide/ImagesSlide'

interface IProductCardProps {
	data: IProductResponse
	currShowAllImagesId: string | null
	setCurrShowAllImagesId: Dispatch<SetStateAction<string | null>>
}

export const ProductCard = ({
	data,
	currShowAllImagesId,
	setCurrShowAllImagesId
}: IProductCardProps) => {
	const [isLoadingImage, setIsLoadingImage] = useState(true)
	const cardRef = useRef<HTMLDivElement | null>(null)
	const [showAllImages, setShowAllImages] = useState(false)
	const image = useRef<HTMLDivElement | null>(null)
	const router = useRouter()
	const { themeMode } = useTheme()

	const onImageLoad = () => {
		setIsLoadingImage(false)
	}

	const handleToSinglePage = () => {
		router.push(`${DASHBOARD_PAGES.MARKET}/${data.id}`)
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
		<div
			className={classNames(styles.wrapper, {
				[styles.light]: themeMode === 'light'
			})}
			ref={cardRef}
		>
			<div className={styles.card}>
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

						<ImagesSlide
							imageUrls={data.imageUrls}
							id={data.id}
							onImageLoad={onImageLoad}
							isLoadingImage={isLoadingImage}
							handleToSinglePage={handleToSinglePage}
							currShowAllImagesId={currShowAllImagesId}
							setCurrShowAllImagesId={setCurrShowAllImagesId}
							showAllImages={showAllImages}
							setShowAllImages={setShowAllImages}
						/>
						<div className={styles.category}>
							<span>{data.category.name}</span>
						</div>
					</div>
				</div>
				<div className={styles.info}>
					<div>
						<h2 className={styles.name}>{data.name}</h2>
					</div>
					<p className={styles.price}>
						<span>$</span>
						{data.price.split('.').map((item, index, arr) => (
							<span key={index}>
								{index == 1 && item.length == 1 ? (
									item.concat('0')
								) : arr.length == 1 ? (
									<>
										{item}
										<span>00</span>
									</>
								) : (
									item
								)}
							</span>
						))}
					</p>
				</div>
				<p className={styles.description}>{data.description}</p>
			</div>
		</div>
	)
}
