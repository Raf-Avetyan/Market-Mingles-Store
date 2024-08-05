'use client'

import { Box, Skeleton } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { DASHBOARD_PAGES } from '@/config/pages.config'

import styles from './Market.module.scss'
import useProducts from './hooks/useProducts'
import loadingStyles from './loading.module.scss'
import { ProductCard } from './productCard/ProductCard'
import { filtersService } from '@/services/filters.service'
import { searchService } from '@/services/search.service'

const arr = Array.from({ length: 16 }).fill(null)
export const Market = () => {
	const { data, isFetching, isLoading } = useProducts()
	const searchParams = useSearchParams()
	const [filterParams, setFilterParams] = useState('')
	const [currShowAllImagesId, setCurrShowAllImagesId] = useState<string | null>(
		null
	)

	const { mutate: searchMutate, data: searchedData } = useMutation({
		mutationKey: ['search products'],
		mutationFn: (t: string | null) => searchService.search(t)
	})

	const { data: filteredData, refetch: refetchFilteredData } = useQuery({
		queryKey: ['filter products'],
		queryFn: () => filtersService.submitFilters(filterParams),
		enabled: !!filterParams
	})

	useEffect(() => {
		const searchTerm = searchParams.get('t')
		if (searchTerm) searchMutate(searchParams.get('t'))
	}, [searchParams.get('t'), searchParams])

	useEffect(() => {
		setFilterParams(searchParams.toString())
		if (filterParams) {
			refetchFilteredData()
		}
	}, [filterParams, searchParams])

	return !isFetching || !isLoading ? (
		<div className={styles.wrapper}>
			{searchedData && searchParams.get('t')
				? searchedData?.map(item => (
						<React.Fragment key={item.id}>
							<ProductCard
								data={item}
								currShowAllImagesId={currShowAllImagesId}
								setCurrShowAllImagesId={setCurrShowAllImagesId}
							/>
						</React.Fragment>
					))
				: filteredData && searchParams.get('category')
					? filteredData.map(item => (
							<React.Fragment key={item.id}>
								<ProductCard
									data={item}
									currShowAllImagesId={currShowAllImagesId}
									setCurrShowAllImagesId={setCurrShowAllImagesId}
								/>
							</React.Fragment>
						))
					: data
						? data.map(item => (
								<React.Fragment key={item.id}>
									<ProductCard
										data={item}
										currShowAllImagesId={currShowAllImagesId}
										setCurrShowAllImagesId={setCurrShowAllImagesId}
									/>
								</React.Fragment>
							))
						: null}
		</div>
	) : (
		<Box className={loadingStyles.skeletonBox}>
			{arr.map((_, index) => (
				<div key={index}>
					<Skeleton
						variant='rectangular'
						width={140}
						className={`${loadingStyles.skeleton} ${loadingStyles.rectangular}`}
					/>
					<div className={loadingStyles.bottom}>
						<div className={loadingStyles.bottomLeft}>
							<Skeleton
								animation='wave'
								className={`${loadingStyles.skeleton} ${loadingStyles.name}`}
							/>
							<Skeleton
								animation='wave'
								className={`${loadingStyles.skeleton} ${loadingStyles.description}`}
							/>
						</div>
						<div className={loadingStyles.bottomRight}>
							<Skeleton
								animation='wave'
								className={`${loadingStyles.skeleton} ${loadingStyles.price}`}
							/>
						</div>
					</div>
				</div>
			))}
		</Box>
	)
}
