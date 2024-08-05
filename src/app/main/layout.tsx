import { PropsWithChildren } from 'react'

import DashboardLayout from '@/components/dashboard-layout/DashboardLayout'

export default function Layout({ children }: PropsWithChildren) {
	return <DashboardLayout>{children}</DashboardLayout>
}
