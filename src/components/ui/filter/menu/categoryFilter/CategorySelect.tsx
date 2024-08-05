'use client'

import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

import { ICategoryResponse } from '@/types/products.types'

import { DASHBOARD_PAGES } from '@/config/pages.config'

import filterMenuStyles from '../FilterMenu.module.scss'

interface ICategorySelectProps {
	openDropdown: string | null
	setOpenDropdown: Dispatch<SetStateAction<string | null>>
	selectedFilters: { [key: string]: string | null } | null
	setSelectedFilters: Dispatch<
		SetStateAction<{
			[key: string]: string | null
		}>
	>
	selectedCategoryFilter: ICategoryResponse | undefined
}

export const CategorySelect = ({
	openDropdown,
	setOpenDropdown,
	selectedFilters,
	setSelectedFilters,
	selectedCategoryFilter
}: ICategorySelectProps) => {
	const { push } = useRouter()

	const handleDropdownToggle = (id: string) => {
		setOpenDropdown(prev => (prev === id ? null : id))
	}

	const handleFilterSelect = (filterName: string, optionText: string) => {
		setSelectedFilters(prev => ({
			...prev,
			[filterName]: optionText
		}))

		setOpenDropdown(null)
	}

	const handleFilterClear = (filterName: string) => {
		setSelectedFilters(prev => {
			const newFilters = { ...prev }
			delete newFilters[filterName]

			return newFilters
		})

		setOpenDropdown(null)
	}

	return selectedCategoryFilter?.filters.map(filter => (
		<div
			key={filter.id}
			className={filterMenuStyles.select}
		>
			<button
				className={filterMenuStyles.button}
				onClick={() => handleDropdownToggle(filter.id)}
			>
				{(selectedFilters && selectedFilters[filter.name]) ||
					`Select ${filter.name}`}
				<span
					className={`${filterMenuStyles.icon} ${openDropdown === filter.id ? filterMenuStyles.active : ''}`}
				>
					{openDropdown === filter.id ? <ChevronUp /> : <ChevronDown />}
				</span>
			</button>
			<div
				className={`${filterMenuStyles.dropdown} ${openDropdown === filter.id ? filterMenuStyles.active : ''}`}
			>
				{filter.options?.map((option, index) => (
					<span
						key={option.id}
						onClick={() => handleFilterSelect(filter.name, option.text)}
					>
						{option.text}
						{selectedFilters && selectedFilters[filter.name] === option.text ? (
							<X
								className={filterMenuStyles.clearIcon}
								onClick={e => {
									e.stopPropagation()
									handleFilterClear(filter.name)
								}}
							/>
						) : null}
					</span>
				))}
			</div>
		</div>
	))
}
