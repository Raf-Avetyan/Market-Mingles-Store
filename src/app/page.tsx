'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { DASHBOARD_PAGES } from '@/config/pages.config'

import styles from './page.module.scss'

export default function Page() {
	const { replace } = useRouter()

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			replace(`https://www.marketmingles.shop${DASHBOARD_PAGES.HOME}`)
		}, 2500)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [])

	return (
		<div className={styles.wrapper}>
			<div className={styles.icon}>
				<img src='./icon.svg' />
			</div>
			<div className={styles.loader}></div>
		</div>
	)
}
