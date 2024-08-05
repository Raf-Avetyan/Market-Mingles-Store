import type { Metadata } from 'next'

import Auth from './Auth'
import { NO_INDEX_PAGE } from '@/constants/ceo.constants'

export const metadata: Metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE
}

export default function AuthPage() {
	return <Auth />
}
