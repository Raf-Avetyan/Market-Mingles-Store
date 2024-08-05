import classNames from 'classnames'
import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react'

import styles from './Button.module.scss'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

interface IButtonProps {
	children: ReactNode
	className?: string
}

export const Button = ({
	children,
	className,
	...rest
}: IButtonProps & PropsWithChildren<IButton>) => {
	return (
		<button
			className={classNames(className, styles.button)}
			{...rest}
		>
			{children}
		</button>
	)
}
