import { Box, Skeleton } from '@mui/material'

import { Heading } from '@/components/ui/heading/Heading'

import styles from './loading.module.scss'

const arr = Array.from({ length: 16 }).fill(null)

export default function Loading() {
	return (
		<div className={styles.wrapper}>
			<Heading title='Market' />
			<Box className={styles.skeletonBox}>
				{arr.map((_, index) => (
					<div key={index}>
						<Skeleton
							variant='rectangular'
							width={140}
							className={`${styles.skeleton} ${styles.rectangular}`}
						/>
						<div className={styles.bottom}>
							<div className={styles.bottomLeft}>
								<Skeleton
									animation='wave'
									className={`${styles.skeleton} ${styles.name}`}
								/>
								<Skeleton
									animation='wave'
									className={styles.skeleton}
								/>
							</div>
							<div className={styles.bottomRight}>
								<Skeleton
									animation='wave'
									className={`${styles.skeleton} ${styles.price}`}
								/>
							</div>
						</div>
					</div>
				))}
			</Box>
		</div>
	)
}
