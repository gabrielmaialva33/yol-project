import type React from 'react'

interface FolderPageLayoutProps {
	children: React.ReactNode
}

export function FolderPageLayout({children}: FolderPageLayoutProps) {
	return <div className='p-6'>{children}</div>
}
