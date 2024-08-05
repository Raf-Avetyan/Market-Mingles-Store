'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState
} from 'react'

import { ICategoryResponse } from '@/types/products.types'

import { DASHBOARD_PAGES } from '@/config/pages.config'

import { useTheme } from '@/hooks/useTheme'

import { Button } from '../../button/Button'

import styles from './FilterMenu.module.scss'
import { CategorySelect } from './categoryFilter/CategorySelect'
import { categoryItemService } from '@/services/category.service'

interface IFilterMenu {
	className: string | null
	setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}

export const FilterMenu = ({ className, setIsMenuOpen }: IFilterMenu) => {
	const selectRef = useRef<HTMLDivElement | null>(null)
	const [selectedCategory, setSelectedCategory] = useState('')
	const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<
		ICategoryResponse | undefined
	>()
	const [openDropdown, setOpenDropdown] = useState<string | null>(null)
	const [selectedFilters, setSelectedFilters] = useState<{
		[key: string]: string | null
	}>({})
	const { push } = useRouter()
	const { themeMode } = useTheme()

	const { data: categories } = useQuery<ICategoryResponse[]>({
		queryKey: ['categories'],
		queryFn: () => categoryItemService.getAll()
	})

	const { data: selectedCategoryData } = useQuery<ICategoryResponse>({
		queryKey: ['categoryByName', selectedCategory],
		queryFn: () => categoryItemService.getByName(selectedCategory),
		enabled: !!selectedCategory
	})

	const handleDropdownToggle = (id: string) => {
		setOpenDropdown(prev => (prev === id ? null : id))
	}

	const handleClickOutsideDropdown = (e: MouseEvent) => {
		if (
			(selectRef.current && !selectRef.current.contains(e.target as Node)) ||
			(e.target instanceof HTMLElement && e.target.className.includes('top'))
		) {
			setOpenDropdown(null)
		}
	}

	const handleSearch = () => {
		const params = new URLSearchParams({
			category: selectedCategory,
			...selectedFilters
		})
		push(`${DASHBOARD_PAGES.MARKET}?${params}`)
		setIsMenuOpen(false)
	}

	const handleFilterClear = (filterName: string) => {
		setSelectedFilters(prev => {
			const newFilters = { ...prev }
			delete newFilters[filterName]

			return newFilters
		})

		setOpenDropdown(null)
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutsideDropdown)
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideDropdown)
		}
	}, [])

	useEffect(() => {
		if (selectedCategoryData) setSelectedCategoryFilter(selectedCategoryData)
	}, [selectedCategoryData])

	return (
		<div
			className={classNames(styles.menu, {
				[styles.active]: className === 'active',
				[styles.light]: themeMode === 'light'
			})}
		>
			<div
				className={styles.form}
				ref={selectRef}
			>
				<div className={styles.top}>
					<div className={styles.select}>
						<button
							className={styles.button}
							onClick={() => handleDropdownToggle('category')}
						>
							{selectedCategory ? selectedCategory : 'Select Category'}
							<span
								className={classNames(styles.icon, {
									[styles.active]: openDropdown === 'category'
								})}
							>
								{openDropdown === 'category' ? <ChevronUp /> : <ChevronDown />}
							</span>
						</button>
						<div
							className={classNames(styles.dropdown, {
								[styles.active]: openDropdown === 'category'
							})}
						>
							{categories?.map((item, index) => (
								<span
									key={index}
									onClick={() => {
										setSelectedCategory(item.name)
										setSelectedFilters({})
										setOpenDropdown(null)
									}}
								>
									{item.name}
									{selectedCategory === item.name ? (
										<X
											className={styles.clearIcon}
											onClick={e => {
												e.stopPropagation()
												handleFilterClear('category')
												setSelectedCategory('')
												setSelectedFilters({})
												push(DASHBOARD_PAGES.MARKET)
											}}
										/>
									) : null}
								</span>
							))}
						</div>
					</div>
					{selectedCategory && (
						<CategorySelect
							openDropdown={openDropdown}
							setOpenDropdown={setOpenDropdown}
							selectedFilters={selectedFilters}
							setSelectedFilters={setSelectedFilters}
							selectedCategoryFilter={selectedCategoryFilter}
						/>
					)}
				</div>
				<Button
					onClick={handleSearch}
					className={styles.searchBtn}
				>
					<Search />
				</Button>
			</div>
		</div>
	)
}
