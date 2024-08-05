'use client'

import { useIsFetching, useIsMutating } from '@tanstack/react-query'

import styles from './GlobalLoader.module.scss'

export const GlobalLoader = () => {
	const isMuatating = useIsMutating()
	const isFetching = useIsFetching()

	return isMuatating || isFetching ? (
		<div className={styles.loaderLine}></div>
	) : null
}
