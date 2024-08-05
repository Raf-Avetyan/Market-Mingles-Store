import { Metadata } from 'next'

import { Filter } from '@/components/ui/filter/Filter'
import { Heading } from '@/components/ui/heading/Heading'

import { Market } from './Market'
import styles from './Market.module.scss'
import { NO_INDEX_PAGE } from '@/constants/ceo.constants'

export const metadata: Metadata = {
	title: 'Market',
	...NO_INDEX_PAGE
}

export default function page() {
	return (
		<div className={styles.market}>
			<div className={styles.top}>
				<Heading title='Market' />
				<Filter />
			</div>
			<Market />
		</div>
	)
}
