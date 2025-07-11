import {Search} from 'lucide-react'

const menuItems = [
	{name: 'Processo', active: true},
	{name: 'Andamento'},
	{name: 'Informações Gerais'},
	{name: 'Publicações'},
	{name: 'Agenda'},
	{name: 'Instância'},
	{name: 'Verbas'},
	{name: 'Garantias'},
	{name: 'Desdobramento'},
	{name: 'Honorários'}
]

export function FolderDetailSidebar() {
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
						<li key={item.name}>
							<button
								className={`block w-full text-left px-4 py-2 rounded-md text-sm font-medium ${
									item.active
										? 'bg-cyan-500 text-white'
										: 'text-gray-700 hover:bg-gray-100'
								}`}
								type='button'
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
