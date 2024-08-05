'use client'

import { Box, Skeleton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'

import { useTheme } from '@/hooks/useTheme'

import styles from './Statistics.module.scss'
import { productService } from '@/services/product.service'
import { usersService } from '@/services/users.service'

export const Statistics = () => {
	const { themeMode, setThemeMode } = useTheme()

	const { data: productData, isLoading: productIsLoading } = useQuery({
		queryKey: ['products'],
		queryFn: () => productService.getAll(),
		refetchInterval: 1000 * 60 * 10
	})

	const { data: usersData, isLoading: usersIsLoading } = useQuery({
		queryKey: ['users'],
		queryFn: () => usersService.getAll(),
		refetchInterval: 1000 * 10
	})

	return (
		<div
			className={classNames(styles.statistics, {
				[styles.light]: themeMode === 'light'
			})}
		>
			<div>
				<h1 className={styles.title}>
					<span>W</span>elcome!
				</h1>
				<p className={styles.text}>
					This is the best <span>market</span> of products for you!
				</p>
			</div>

			{!productIsLoading && !usersIsLoading ? (
				<div className={styles.cards}>
					<div className={styles.statisticsCard}>
						<p>
							Total <span>users:</span>
						</p>
						<h1>{usersData?.length}</h1>
					</div>
					<div className={styles.statisticsCard}>
						<p>
							Total <span>products:</span>
						</p>
						<h1>{productData?.length}</h1>
					</div>
				</div>
			) : (
				<Box className={styles.box}>
					<Skeleton
						variant='rectangular'
						className={styles.skeleton}
					/>
					<Skeleton
						variant='rectangular'
						className={styles.skeleton}
					/>
				</Box>
			)}
		</div>
	)
}
