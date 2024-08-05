import { Metadata } from 'next'

import { Settings } from './Settings'
import { NO_INDEX_PAGE } from '@/constants/ceo.constants'

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE
}

const SettingsPage = () => {
	return <Settings />
}

export default SettingsPage
