'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { DASHBOARD_PAGES } from '@/config/pages.config'

export default function Page() {
	const { push } = useRouter()

	useEffect(() => {
		push(DASHBOARD_PAGES.HOME)
	}, [])

	return <div></div>
}
