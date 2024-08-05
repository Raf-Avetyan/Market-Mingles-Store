import { Inter, Rubik } from 'next/font/google'

const rubik = Rubik({
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--first-family',
	style: ['normal']
})

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
	variable: '--second-family',
	style: ['normal']
})

export { rubik, inter }
