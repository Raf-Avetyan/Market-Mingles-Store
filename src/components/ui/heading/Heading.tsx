import styles from './Heading.module.scss'

interface IHeadingProps {
	title: string
}

export const Heading = ({ title }: IHeadingProps) => {
	return <h1 className={styles.title}>{title}</h1>
}
