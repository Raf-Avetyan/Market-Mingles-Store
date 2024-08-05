import { LoaderCircle } from 'lucide-react'
import { StyleHTMLAttributes } from 'react'

import styles from './Loader.module.scss'

interface ILoader extends StyleHTMLAttributes<HTMLButtonElement> {
	className?: string
	size: number
}

export const Loader = ({ className, size }: ILoader) => {
	return (
		<LoaderCircle
			className={`${styles.loader} ${className}`}
			size={size}
		/>
	)
}
