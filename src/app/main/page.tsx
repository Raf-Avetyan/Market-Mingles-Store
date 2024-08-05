import type { Metadata } from 'next'

import styles from './page.module.scss'
import { Statistics } from './statistics/Statistics'
import { NO_INDEX_PAGE } from '@/constants/ceo.constants'

export const metadata: Metadata = {
	title: 'Welcome',
	...NO_INDEX_PAGE
}

export default function AuthPage() {
	return (
		<section className={styles.welcomeSection}>
			<Statistics />
		</section>
	)
}
