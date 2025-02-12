'use client'

import classNames from 'classnames'
import {
	ChevronLeft,
	ChevronRight,
	Images,
	Image as LucideImage
} from 'lucide-react'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { IProductResponse } from '@/types/products.types'

import { useTheme } from '@/hooks/useTheme'

import './CartMenuContentCardSlider.scss'
import { ImagesShow } from '@/app/main/market/productCard/imagesShow/ImagesShow'

interface ICartMenuContentCardSlider {
	data?: IProductResponse | Omit<IProductResponse, 'createdAt' | 'updatedAt'>
	imageUrls: string[]
	onImageLoad: () => void
	isLoadingImage: boolean
	handleToSinglePage: (productId: string) => void
	id: string
	currShowAllImagesId: string | null
	setCurrShowAllImagesId: Dispatch<SetStateAction<string | null>>
	showAllImages: boolean
	setShowAllImages: Dispatch<SetStateAction<boolean>>
	setIsCartOpen: Dispatch<SetStateAction<boolean>>
}

export const CartMenuContentCardSlider = ({
	data,
	imageUrls,
	onImageLoad,
	isLoadingImage,
	handleToSinglePage,
	id,
	currShowAllImagesId,
	setCurrShowAllImagesId,
	showAllImages,
	setShowAllImages,
	setIsCartOpen
}: ICartMenuContentCardSlider) => {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const { themeMode } = useTheme()
	let sliderRef = useRef<Slider | null>(null)

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
		afterChange: current => setSelectedIndex(current)
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

	const handleImageClick = (index: number) => {
		setSelectedIndex(index)
		setShowAllImages(false)
		if (sliderRef.current) {
			sliderRef.current.slickGoTo(index)
		}
	}

	const handleSwitchToImages = () => {
		if (currShowAllImagesId === id) {
			setShowAllImages(!showAllImages)
		} else {
			setShowAllImages(true)
			setCurrShowAllImagesId(id)
		}
	}

	return (
		<div className='cartMenuContentSlider-container'>
			<Slider
				{...settings}
				className={classNames('cartMenuContentSlider-slider', {
					hidden: isLoadingImage
				})}
				ref={sliderRef}
			>
				{imageUrls.map((img, index) => (
					<div
						key={index}
						className='image-container'
					>
						<img
							src={img}
							onLoad={onImageLoad}
							style={{ display: isLoadingImage ? 'none' : 'block' }}
							onClick={() => {
								handleToSinglePage(id)
								setIsCartOpen(false)
							}}
						/>
					</div>
				))}
			</Slider>
			<div
				className={classNames('imageShow', {
					active: showAllImages && currShowAllImagesId === id
				})}
			>
				<ImagesShow
					id={data?.id}
					sliderRef={sliderRef}
					setShowAllImages={setShowAllImages}
					imageUrls={imageUrls}
					selectedIndex={selectedIndex}
					handleImageClick={handleImageClick}
					handleToSinglePage={handleToSinglePage}
					setIsCartOpen={setIsCartOpen}
				/>
			</div>
			<div
				className={classNames('switchToImages', {
					light: themeMode === 'light'
				})}
				onClick={handleSwitchToImages}
				style={{ display: isLoadingImage ? 'none' : 'flex' }}
			>
				{showAllImages && currShowAllImagesId === id ? (
					<LucideImage />
				) : (
					<Images />
				)}
			</div>
		</div>
	)
}
