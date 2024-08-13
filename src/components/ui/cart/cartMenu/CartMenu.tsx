import classNames from 'classnames'
import { ChevronLeft } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import { LogoutButton } from '@/components/dashboard-layout/sidebar/logoutButton/LogoutButton'

import { ICartResponse } from '@/types/auth.types'

import { useTheme } from '@/hooks/useTheme'

import styles from './CartMenu.module.scss'
import { CartMenuContent } from './cartMenuContent/CartMenuContent'

interface ICartMenu {
	isCartOpen: boolean
	setIsCartOpen: Dispatch<SetStateAction<boolean>>
	cartData?: ICartResponse
}

export const CartMenu = ({
	isCartOpen,
	setIsCartOpen,
	cartData
}: ICartMenu) => {
	const { themeMode } = useTheme()
	const dropdownRef = useRef<HTMLDivElement | null>(null)

	const handleClickOutside = (e: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(e.target as Node)
		) {
			setIsCartOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div
			className={classNames(styles.wrapper, {
				[styles.active]: isCartOpen,
				[styles.light]: themeMode === 'light'
			})}
		>
			<div
				className={classNames(styles.cart, {
					[styles.active]: isCartOpen
				})}
				ref={dropdownRef}
			>
				<div className={styles.top}>
					<ChevronLeft
						className={styles.closeBtn}
						onClick={() => setIsCartOpen(!isCartOpen)}
					/>
				</div>
				<div className={styles.content}>
					<CartMenuContent cartData={cartData} />
				</div>
			</div>
		</div>
	)
}
