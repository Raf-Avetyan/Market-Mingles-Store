'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { KeyboardEvent, useEffect, useState } from 'react'

import styles from './SearchForm.module.scss'
import { SearchInput } from './searchInput/SearchInput'

export const SearchForm = () => {
	const searchParams = useSearchParams()
	const { push } = useRouter()
	const [inputText, setInputText] = useState<string | null>('')
	const [isEnter, setIsEnter] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		const timeout = setTimeout(() => {
			handleSearch(inputText!.replace(/\s+/g, ' ').trim())
		}, 500)

		return () => {
			clearTimeout(timeout)
		}
	}, [inputText])

	useEffect(() => {
		handleSearch(inputText!.replace(/\s+/g, ' ').trim())
	}, [isEnter])

	useEffect(() => {
		if (searchParams.has('t')) setInputText(searchParams.get('t'))
	}, [])

	async function handleSearch(
		term: string,
		helpTerm?: string,
		e?: KeyboardEvent<HTMLInputElement>
	) {
		if (e && e.key === 'Enter') {
			setIsEnter(true)
			setInputText(helpTerm ? helpTerm : term)
			;(e.target as HTMLInputElement).blur()
		}
		const params = new URLSearchParams(searchParams)

		if (term.length) {
			params.set('t', term)
			push(`/main/market${params.toString() ? `?${params.toString()}` : ''}`)
		} else if (pathname.includes('/market')) {
			params.delete('t')
			push(`/main/market${params.toString() ? `?${params.toString()}` : ''}`)
		}
	}

	return (
		<div className={styles.search}>
			<div>
				<SearchInput
					inputText={inputText}
					setInputText={setInputText}
					handleSearch={handleSearch}
				/>
			</div>
		</div>
	)
}
