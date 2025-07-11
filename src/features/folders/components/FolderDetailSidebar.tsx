import {Search} from 'lucide-react'

const menuItems = [
	{name: 'Processo', id: 'processo'},
	{name: 'Andamento', id: 'andamento'},
	{name: 'Informações Gerais', id: 'informacoes'},
	{name: 'Publicações', id: 'publicacoes'},
	{name: 'Agenda', id: 'agenda'},
	{name: 'Instância', id: 'instancia'},
	{name: 'Verbas', id: 'verbas'},
	{name: 'Garantias', id: 'garantias'},
	{name: 'Desdobramento', id: 'desdobramento'},
	{name: 'Honorários', id: 'honorarios'}
]

interface FolderDetailSidebarProps {
	activeTab: string
	onTabChange: (tabId: string) => void
}

export function FolderDetailSidebar({ activeTab, onTabChange }: FolderDetailSidebarProps) {
	return (
		<div className='w-64 bg-white rounded-lg p-4 shadow-sm'>
			<div className='relative mb-4'>
				<Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
				<input
					className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-cyan-500 focus:border-cyan-500'
					placeholder='Buscar'
					type='text'
				/>
			</div>
			<nav>
				<ul>
					{menuItems.map(item => (
						<li key={item.id}>
							<button
								className={`block w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
									activeTab === item.id
										? 'bg-cyan-500 text-white'
										: 'text-gray-700 hover:bg-gray-100'
								}`}
								type='button'
								onClick={() => onTabChange(item.id)}
							>
								{item.name}
							</button>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}
