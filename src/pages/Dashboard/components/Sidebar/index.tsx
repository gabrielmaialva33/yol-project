import {useState} from 'react'
import {SidebarItem} from './SidebarItem'

interface MenuItem {
	icon: string
	text: string
	active?: boolean
	color?: string
	badge?: number
	subItems?: {text: string}[]
}

const pages: MenuItem[] = [
	{
		icon: '/icons/overview.svg',
		text: 'Visão Geral',
		active: true
	},
	{
		icon: '/icons/folders.svg',
		text: 'Pastas',
		subItems: [{text: 'Cadastro'}, {text: 'Consulta'}]
	}
]

const favorites: MenuItem[] = [
	{
		icon: '',
		color: '#008980',
		text: 'Cliente A',
		badge: 6
	},
	{
		icon: '',
		color: '#2FAC68',
		text: 'Cliente B',
		badge: 2
	},
	{
		icon: '',
		color: '#F6C000',
		text: 'Cliente C',
		badge: 37
	},
	{
		icon: '',
		color: '#5A5DFF',
		text: 'Cliente D',
		badge: 12
	},
	{
		icon: '',
		color: '#FF5A5D',
		text: 'Cliente E',
		badge: 5
	},
	{
		icon: '',
		color: '#FF8A00',
		text: 'Cliente F',
		badge: 10
	}
]

const SidebarHeader = (props: {isCollapsed: boolean; toggle: () => void}) => (
	<div
		className={`flex items-center ${
			props.isCollapsed ? 'justify-center' : 'justify-between px-4'
		}`}
	>
		<img
			alt='Logo'
			className={`cursor-pointer duration-500 ${
				props.isCollapsed ? 'w-10' : 'w-[159px] ml-4'
			}`}
			src={props.isCollapsed ? '/icons/logo.svg' : '/logo-yol.svg'}
		/>
		{!props.isCollapsed && (
			<button onClick={props.toggle} type='button'>
				<img
					alt='Toggle Sidebar'
					className='transition-transform duration-300'
					src='/icons/left-square.svg'
				/>
			</button>
		)}
	</div>
)

const SearchInput = (props: {isCollapsed: boolean}) =>
	props.isCollapsed ? null : (
		<div className='flex items-center rounded-md bg-[#86878B] mt-6 px-4 py-2'>
			<img
				alt='Search'
				className='w-4 h-4 text-white'
				src='/icons/magnifier.svg'
			/>
			<input
				className='text-sm bg-transparent w-full text-white focus:outline-none ml-2 placeholder:text-white'
				placeholder='Search'
				type='search'
			/>
		</div>
	)

const MenuItemComponent = (props: {
	item: MenuItem
	isCollapsed: boolean
	openDropdown: string
	handleDropdown: (text: string) => void
}) => (
	<div key={props.item.text}>
		<button
			className='w-full'
			onClick={() =>
				props.item.subItems && props.handleDropdown(props.item.text)
			}
			type='button'
		>
			<SidebarItem
				active={props.item.active}
				badge={props.item.badge}
				color={props.item.color}
				hasSubItems={Boolean(props.item.subItems)}
				icon={props.item.icon}
				isCollapsed={props.isCollapsed}
				isOpen={props.openDropdown === props.item.text}
				text={props.item.text}
			/>
		</button>
		{props.item.subItems &&
			props.openDropdown === props.item.text &&
			!props.isCollapsed && (
				<ul className='pl-8'>
					{props.item.subItems.map(subItem => (
						<li className='py-1 text-gray-400' key={subItem.text}>
							{subItem.text}
						</li>
					))}
				</ul>
			)}
	</div>
)

const MenuList = (props: {
	title: string
	items: MenuItem[]
	isCollapsed: boolean
	isDropdown?: boolean
}) => {
	const [openDropdown, setOpenDropdown] = useState('')
	const [showAll, setShowAll] = useState(false)

	const handleDropdown = (text: string) => {
		setOpenDropdown(openDropdown === text ? '' : text)
	}

	let visibleItems = props.items
	if (props.isDropdown && !showAll && !props.isCollapsed) {
		visibleItems = props.items.slice(0, 3)
	}

	return (
		<ul className='pt-2'>
			<p
				className={`text-white font-semibold text-sm mt-4 mb-2 ${
					props.isCollapsed ? 'hidden' : 'block'
				}`}
			>
				{props.title}
			</p>
			{visibleItems.map(item => (
				<MenuItemComponent
					handleDropdown={handleDropdown}
					isCollapsed={props.isCollapsed}
					item={item}
					key={item.text}
					openDropdown={openDropdown}
				/>
			))}
			{props.isDropdown && !props.isCollapsed && props.items.length > 3 && (
				<button
					className='flex items-center pl-3 mt-2 cursor-pointer'
					onClick={() => setShowAll(!showAll)}
					type='button'
				>
					<img
						alt='Show more'
						className={`w-4 h-4 transition-transform ${
							showAll ? 'rotate-180' : ''
						}`}
						src='/icons/down.svg'
					/>
					<span className='ml-2 text-sm text-white font-semibold'>
						{showAll ? 'Show less' : 'Show more'}
					</span>
				</button>
			)}
		</ul>
	)
}

const Sidebar = () => {
	const [isCollapsed, setIsCollapsed] = useState(false)

	const toggleSidebar = () => setIsCollapsed(!isCollapsed)

	return (
		<aside
			className={`bg-[#373737] text-white ${
				isCollapsed ? 'w-24 items-center' : 'w-[340px]'
			} py-10 transition-all duration-300 ease-in-out flex flex-col gap-y-6`}
		>
			<SidebarHeader isCollapsed={isCollapsed} toggle={toggleSidebar} />
			{isCollapsed && (
				<button
					className='bg-[#373737] text-white rounded-full p-1'
					onClick={toggleSidebar}
					type='button'
				>
					<img
						alt='Toggle Sidebar'
						className='transition-transform duration-300 rotate-180'
						src='/icons/left-square.svg'
					/>
				</button>
			)}
			<div className='w-full'>
				<div className={`${isCollapsed ? '' : 'px-10'}`}>
					<SearchInput isCollapsed={isCollapsed} />
				</div>
				<div
					className={`${isCollapsed ? 'flex flex-col items-center' : 'px-10'}`}
				>
					<MenuList isCollapsed={isCollapsed} items={pages} title='PAGES' />
				</div>
				{!isCollapsed && (
					<>
						<div className='border-b border-solid border-[#BABBC1] mx-10' />
						<div className='px-10'>
							<MenuList
								isCollapsed={isCollapsed}
								isDropdown={true}
								items={favorites}
								title='FAVORITOS'
							/>
						</div>
					</>
				)}
			</div>
		</aside>
	)
}

export {Sidebar}
