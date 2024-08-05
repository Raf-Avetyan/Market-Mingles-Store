import * as Icons from 'lucide-react'

export type IconName = keyof typeof Icons

export interface IMenuItem {
	id: number
	icon: IconName
	link: string
	name: string
}
