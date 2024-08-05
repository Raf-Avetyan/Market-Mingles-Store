import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import { Providers } from '@/providers/providers'

import './globals.scss'
import { SITE_NAME } from '@/constants/ceo.constants'
import { inter, rubik } from '@/constants/fonts.constants'

export const metadata: Metadata = {
	title: {
		default: `${SITE_NAME}`,
		template: `%s | ${SITE_NAME}`
	},
	description: 'Best online marketplace of products here!'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${rubik.variable} ${inter.variable}`}>
				<Providers>
					{children}
					<Toaster
						theme='dark'
						position='bottom-right'
						duration={3000}
					/>
				</Providers>
			</body>
		</html>
	)
}
