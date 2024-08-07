'use client'

import classNames from 'classnames'
import Image from 'next/image'
import { Dispatch, MouseEvent, MutableRefObject, SetStateAction } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import styles from './ImagesShow.module.scss'

interface ImagesShowProps {
	sliderRef: MutableRefObject<Slider | null>
	setShowAllImages: Dispatch<SetStateAction<boolean>>
	imageUrls: string[]
	selectedIndex?: number
	handleImageClick?: (index: number) => void
	handleToSinglePage?: () => void
}

export const ImagesShow = ({
	sliderRef,
	setShowAllImages,
	imageUrls,
	selectedIndex,
	handleImageClick,
	handleToSinglePage
}: ImagesShowProps) => {
	return (
		<div
			className={classNames(styles.imagesWrapper, {
				[styles.one]: imageUrls.length === 1,
				[styles.two]: imageUrls.length === 2,
				[styles.three]: imageUrls.length === 3,
				[styles.four]: imageUrls.length === 4,
				[styles.more]: imageUrls.length > 4
			})}
		>
			{imageUrls.map((imgUrl, index) => (
				<div
					className={classNames(styles.image, {
						[styles.active]: index === selectedIndex,
						[styles.hidden]: imageUrls.length > 4 && index > 2
					})}
					onClick={e =>
						handleImageClick ? handleImageClick(index) : undefined
					}
					key={`${imgUrl}-${index}`}
				>
					<Image
						src={imgUrl}
						alt=''
						width={300}
						height={160}
						priority
					/>
				</div>
			))}
			{imageUrls.length > 4 ? (
				<div
					className={styles.more}
					onClick={handleToSinglePage}
				>
					<p>
						<span>+</span>
						{imageUrls.length - 3}
					</p>
				</div>
			) : null}
		</div>
	)
}
