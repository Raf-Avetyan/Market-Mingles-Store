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
	handleSearch: (
		term: string,
		helpTerm: string,
		e?: KeyboardEvent<HTMLInputElement>
	) => void
	openDropdown: boolean
	setOpenDropdown: Dispatch<SetStateAction<boolean>>
}

export const SearchInput = ({
	inputText,
	setInputText,
	handleSearch,
	openDropdown,
	setOpenDropdown
}: ISearchInputProps) => {
	const { themeMode } = useTheme()
	const [isInputOpen, setIsInputOpen] = useState(false)
	const [categoryNames, setCategoryNames] = useState<string[]>()
	const selectRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement | null>(null)

	const { data: categories } = useQuery<string[]>({
		queryKey: ['category names'],
		queryFn: () => categoryItemService.getAllNames()
	})

	const handleSelect = (selectText: string) => {
		if (selectText !== 'Not found') {
			setInputText(selectText)
			setOpenDropdown(false)
			setIsInputOpen(false)
			inputRef.current?.blur()
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
				setIsInputOpen(false)
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
				[styles.light]: themeMode === 'light',
				[styles.active]: isInputOpen
			})}
			ref={selectRef}
		>
			<div>
				<input
					className={classNames(styles.input, {
						[styles.active]: isInputOpen && openDropdown
					})}
					ref={inputRef}
					onFocus={() => setOpenDropdown(true)}
					onChange={e => handleInputChange(e)}
					value={inputText ? inputText : ''}
					placeholder='Search...'
					onKeyDown={e =>
						handleSearch(
							inputText ? inputText : '',
							categoryNames ? categoryNames[0] : '',
							e
						)
					}
				/>
				<button
					type='submit'
					className={classNames(styles.searchIcon, {
						[styles.active]: isInputOpen
					})}
					onClick={() => {
						setIsInputOpen(!isInputOpen)
						setOpenDropdown(true)
						inputRef.current?.focus()
					}}
				>
					<Search size={24} />
				</button>
			</div>
			<div
				className={classNames(styles.dropdown, {
					[styles.active]: openDropdown,
					[styles.smallDeviceActive]: openDropdown && isInputOpen
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
