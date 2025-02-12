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

import { useTheme } from '@/hooks/useTheme'

import { ImagesShow } from '../imagesShow/ImagesShow'

import './ImagesSlide.scss'

interface IImagesSlideProps {
	imageUrls: string[]
	onImageLoad: () => void
	isLoadingImage: boolean
	handleToSinglePage: () => void
	id: string
	currShowAllImagesId: string | null
	setCurrShowAllImagesId: Dispatch<SetStateAction<string | null>>
	showAllImages: boolean
	setShowAllImages: Dispatch<SetStateAction<boolean>>
}

export const ImagesSlide = ({
	imageUrls,
	onImageLoad,
	isLoadingImage,
	handleToSinglePage,
	id,
	currShowAllImagesId,
	setCurrShowAllImagesId,
	showAllImages,
	setShowAllImages
}: IImagesSlideProps) => {
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
		<div className='slider-container'>
			<Slider
				{...settings}
				className={classNames('product-slider', {
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
							onClick={handleToSinglePage}
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
					sliderRef={sliderRef}
					setShowAllImages={setShowAllImages}
					imageUrls={imageUrls}
					selectedIndex={selectedIndex}
					handleImageClick={handleImageClick}
					handleToSinglePage={handleToSinglePage}
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
					<LucideImage size={22} />
				) : (
					<Images size={22} />
				)}
			</div>
		</div>
	)
}
