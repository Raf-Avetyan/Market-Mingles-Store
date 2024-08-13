import classNames from 'classnames'
import { ShoppingBag } from 'lucide-react'
import { useState } from 'react'

import { useCart } from '@/hooks/useCart'
import { useTheme } from '@/hooks/useTheme'

import styles from './Cart.module.scss'
import { CartMenu } from './cartMenu/CartMenu'

export const Cart = () => {
	const { themeMode } = useTheme()
	const [isCartOpen, setIsCartOpen] = useState(false)

	const { data: cartData, isLoading: cartDataIsLoading } = useCart()

	return (
		<div
			className={classNames(styles.cart, {
				[styles.light]: themeMode === 'light'
			})}
		>
			<div className={styles.icon}>
				<ShoppingBag onClick={() => setIsCartOpen(!isCartOpen)} />
			</div>
			<CartMenu
				isCartOpen={isCartOpen}
				setIsCartOpen={setIsCartOpen}
				cartData={cartData}
			/>
		</div>
	)
}
