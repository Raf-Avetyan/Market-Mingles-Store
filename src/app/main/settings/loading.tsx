import { Skeleton } from '@mui/material'

import { Heading } from '@/components/ui/heading/Heading'

import styles from './Settings.module.scss'

export default function Loading() {
	return (
		<div className={styles.settings}>
			<Heading title='Settings' />
			<Skeleton
				variant='rectangular'
				className={styles.skeleton}
			/>
		</div>
	)
}
