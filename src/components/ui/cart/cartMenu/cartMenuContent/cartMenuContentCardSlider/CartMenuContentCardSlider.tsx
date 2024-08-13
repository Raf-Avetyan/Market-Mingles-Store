'use client'

import classNames from 'classnames'
import {
	ChevronLeft,
	ChevronRight,
	Images,
	Image as LucideImage
} from 'lucide-react'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import Slider, { Settings } from 'react-slick'

import { IProductResponse } from '@/types/products.types'

import { useTheme } from '@/hooks/useTheme'

import './CartMenuContentCardSlider.scss'
import { ImagesShow } from '@/app/main/market/productCard/imagesShow/ImagesShow'

interface ICartMenuContentSlide {
	data?: IProductResponse | Omit<IProductResponse, 'createdAt' | 'updatedAt'>
	setShowAllImages: Dispatch<SetStateAction<boolean>>
	showAllImages: boolean
}

export const CartMenuContentSlide = ({
	data,
	setShowAllImages,
	showAllImages
}: ICartMenuContentSlide) => {
	const [isLoadingImage, setIsLoadingImage] = useState(true)
	const [selectedIndex, setSelectedIndex] = useState(0)
	let sliderRef = useRef<Slider | null>(null)
	const { themeMode } = useTheme()

	const handleSwitchToImages = () => {
		setShowAllImages(!showAllImages)
	}

	const settings: Settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		autoplay: true,
		autoplaySpeed: 8000,
		beforeChange: (current, next) => setSelectedIndex(next)
	}

	function SamplePrevArrow(props: any) {
		const { onClick } = props
		return (
			<div
				onClick={onClick}
				className='slick-arrow slick-prev'
			>
				<ChevronLeft size={25} />
			</div>
		)
	}

	function SampleNextArrow(props: any) {
		const { onClick } = props
		return (
			<div
				onClick={onClick}
				className='slick-arrow slick-next'
			>
				<ChevronRight size={25} />
			</div>
		)
	}

	const onImageLoad = () => {
		setIsLoadingImage(false)
	}

	const handleImageClick = (index: number) => {
		setSelectedIndex(index)
		setShowAllImages(false)
		if (sliderRef.current) {
			sliderRef.current.slickGoTo(index)
		}
	}

	return (
		<div className='cartMenuContentSlider-container'>
			<Slider
				{...settings}
				className='cartMenuContentSlider'
				ref={sliderRef}
			>
				{data?.imageUrls.map((img, index) => (
					<div key={index}>
						<img
							src={img}
							alt=''
							onLoad={onImageLoad}
							style={{ display: isLoadingImage ? 'none' : 'block' }}
						/>
					</div>
				))}
			</Slider>
			<div
				className={classNames('imageShow', {
					active: showAllImages
				})}
			>
				<ImagesShow
					sliderRef={sliderRef}
					setShowAllImages={setShowAllImages}
					imageUrls={data?.imageUrls ? data?.imageUrls : []}
					selectedIndex={selectedIndex}
					handleImageClick={handleImageClick}
				/>
			</div>
			<div
				className={classNames('switchToImages', {
					light: themeMode === 'light'
				})}
				onClick={handleSwitchToImages}
			>
				{showAllImages ? <LucideImage /> : <Images />}
			</div>
		</div>
	)
}
