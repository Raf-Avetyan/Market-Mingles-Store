'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { Search } from 'lucide-react'
import {
	ChangeEvent,
	Dispatch,
	KeyboardEvent,
	SetStateAction,
	useEffect,
	useRef,
	useState
} from 'react'

import { useTheme } from '@/hooks/useTheme'

import styles from './SearchInput.module.scss'
import { categoryItemService } from '@/services/category.service'

interface ISearchInputProps {
	inputText: string | null
	setInputText: Dispatch<SetStateAction<string | null>>
	handleSearch: (term: string, e?: KeyboardEvent<HTMLInputElement>) => void
}

export const SearchInput = ({
	inputText,
	setInputText,
	handleSearch
}: ISearchInputProps) => {
	const { themeMode } = useTheme()
	const [openDropdown, setOpenDropdown] = useState<boolean>(false)
	const [categoryNames, setCategoryNames] = useState<string[]>()
	const selectRef = useRef<HTMLDivElement>(null)

	const { data: categories } = useQuery<string[]>({
		queryKey: ['category names'],
		queryFn: () => categoryItemService.getAllNames()
	})

	const handleSelect = (selectText: string) => {
		if (selectText !== 'Not found') {
			setInputText(selectText)
			setOpenDropdown(false)
		}
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const filteredData = categories?.filter(name =>
			name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
		)
		setCategoryNames(filteredData?.length ? filteredData : ['Not found'])
		setInputText(e.target.value)
	}

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
				setOpenDropdown(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [selectRef])

	useEffect(() => {
		setCategoryNames(categories)
	}, [categories])

	return (
		<div
			className={classNames(styles.select, {
				[styles.light]: themeMode === 'light'
			})}
			ref={selectRef}
		>
			<input
				className={styles.input}
				onFocus={() => setOpenDropdown(true)}
				onChange={e => handleInputChange(e)}
				value={inputText ? inputText : ''}
				placeholder='Search...'
				onKeyDown={e => handleSearch(inputText ? inputText : '', e)}
			/>
			<button
				type='submit'
				className={styles.searchIcon}
			>
				<Search size={24} />
			</button>
			<div
				className={classNames(styles.dropdown, {
					[styles.active]: openDropdown
				})}
			>
				{categoryNames?.map((item, index) => (
					<span
						key={index}
						onClick={() => handleSelect(item)}
					>
						{item}
					</span>
				))}
			</div>
		</div>
	)
}
