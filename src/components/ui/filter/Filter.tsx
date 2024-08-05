'use client'

import { SlidersHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import styles from './Filter.module.scss'
import { FilterMenu } from './menu/FilterMenu'

export const Filter = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const filter = useRef<HTMLDivElement | null>(null)

	const handleMenuOpen = (e: globalThis.MouseEvent) => {
		if (filter.current && !filter.current.contains(e.target as Node)) {
			setIsMenuOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', e => handleMenuOpen(e))

		return () => {
			document.removeEventListener('mousedown', e => handleMenuOpen(e))
		}
	}, [])

	return (
		<div
			className={styles.filter}
			ref={filter}
		>
			<div onClick={() => setIsMenuOpen(!isMenuOpen)}>
				<SlidersHorizontal size={24} />
				<span>Filters</span>
			</div>
			<FilterMenu
				className={isMenuOpen ? 'active' : null}
				setIsMenuOpen={setIsMenuOpen}
			/>
		</div>
	)
}
