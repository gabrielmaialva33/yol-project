'use client'

import {useState} from 'react'
import {Link, useLocation} from 'react-router'
import downIcon from '/icons/down.svg'
import foldersIcon from '/icons/folders.svg'
import leftSquareIcon from '/icons/left-square.svg'
import logoCollapsed from '/icons/logo.svg'
import magnifierIcon from '/icons/magnifier.svg'
import overviewIcon from '/icons/overview.svg'
import logoExpanded from '/logo-yol.svg'
import {SidebarItem} from './SidebarItem'

interface SubMenuItem {
	text: string
	path: string
}

interface MenuItem {
	icon: string
	text: string
	path?: string
	active?: boolean
	color?: string
	badge?: number
	subItems?: SubMenuItem[]
}

const pages: MenuItem[] = [
	{
		icon: overviewIcon,
		text: 'Visão Geral',
		path: '/dashboard'
	},
	{
		icon: foldersIcon,
		text: 'Pastas',
		path: '/dashboard/folders',
		subItems: [
			{text: 'Cadastro', path: '/dashboard/folders/register'},
			{text: 'Consulta', path: '/dashboard/folders/consultation'}
		]
	}
]

const favorites: MenuItem[] = [
	{
		icon: '',
		color: '#008980',
		text: 'Cliente A',
		badge: 6,
		path: '#'
	},
	{
		icon: '',
		color: '#2FAC68',
		text: 'Cliente B',
		badge: 2,
		path: '#'
	},
	{
		icon: '',
		color: '#F6C000',
		text: 'Cliente C',
		badge: 37,
		path: '#'
	},
	{
		icon: '',
		color: '#5A5DFF',
		text: 'Cliente D',
		badge: 12,
		path: '#'
	},
	{
		icon: '',
		color: '#FF5A5D',
		text: 'Cliente E',
		badge: 5,
		path: '#'
	},
	{
		icon: '',
		color: '#FF8A00',
		text: 'Cliente F',
		badge: 10,
		path: '#'
	}
]

const DROPDOWN_VISIBLE_ITEMS_LIMIT = 3

const SidebarHeader = (props: {isCollapsed: boolean; toggle: () => void}) => (
	<div
		className={`flex items-center ${props.isCollapsed ? 'justify-center' : 'justify-between px-4'}`}
	>
		<img
			alt='Logo'
			className={`cursor-pointer duration-500 ${props.isCollapsed ? 'w-10' : 'w-[159px]'}`}
			src={props.isCollapsed ? logoCollapsed : logoExpanded}
		/>
		{!props.isCollapsed && (
			<button onClick={props.toggle} type='button'>
				<img
					alt='Toggle Sidebar'
					className='transition-transform duration-300'
					src={leftSquareIcon || '/placeholder.svg'}
				/>
			</button>
		)}
	</div>
)

const SearchInput = (props: {isCollapsed: boolean}) =>
	props.isCollapsed ? null : (
		<div className='flex items-center rounded-md bg-[#475569] mt-6 px-4 py-2'>
			<img
				alt='Search'
				className='w-4 h-4 text-white'
				src={magnifierIcon || '/placeholder.svg'}
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
	location: ReturnType<typeof useLocation>
}) => {
	const isActive = props.location.pathname === props.item.path
	const isDropdownOpen =
		props.openDropdown === props.item.text ||
		props.location.pathname.startsWith(props.item.path || '---')

	const content = (
		<SidebarItem
			active={isActive}
			badge={props.item.badge}
			color={props.item.color}
			hasSubItems={Boolean(props.item.subItems)}
			icon={props.item.icon}
			isCollapsed={props.isCollapsed}
			isOpen={isDropdownOpen}
			text={props.item.text}
		/>
	)

	return (
		<div key={props.item.text}>
			{props.item.subItems ? (
				<button
					className='w-full'
					onClick={() => props.handleDropdown(props.item.text)}
					type='button'
				>
					{content}
				</button>
			) : (
				<Link to={props.item.path || '#'}>{content}</Link>
			)}
			{props.item.subItems && isDropdownOpen && !props.isCollapsed && (
				<ul className='pl-8 mt-2 space-y-2'>
					{props.item.subItems.map(subItem => {
						const isSubItemActive = props.location.pathname === subItem.path
						return (
							<li key={subItem.text}>
								<Link
									className={`flex items-center p-2 rounded-md text-sm font-medium transition-colors ${
										isSubItemActive
											? 'bg-orange-500 text-white'
											: 'text-gray-400 hover:text-white hover:bg-gray-700'
									}`}
									to={subItem.path}
								>
									<span className='w-1.5 h-1.5 bg-white rounded-full mr-3' />
									{subItem.text}
								</Link>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}

const MenuList = (props: {
	title: string
	items: MenuItem[]
	isCollapsed: boolean
	isDropdown?: boolean
}) => {
	const location = useLocation()
	const [openDropdown, setOpenDropdown] = useState(
		props.items.find(item => location.pathname.startsWith(item.path || '---'))
			?.text || ''
	)
	const [showAll, setShowAll] = useState(false)

	const handleDropdown = (text: string) => {
		setOpenDropdown(openDropdown === text ? '' : text)
	}

	let visibleItems = props.items
	if (props.isDropdown && !showAll && !props.isCollapsed) {
		visibleItems = props.items.slice(0, DROPDOWN_VISIBLE_ITEMS_LIMIT)
	}

	return (
		<ul className='pt-2'>
			<p
				className={`text-sm font-semibold text-[#A1A5B7] mt-4 mb-2 ${props.isCollapsed ? 'hidden' : 'block'}`}
			>
				{props.title}
			</p>
			{visibleItems.map(item => (
				<MenuItemComponent
					handleDropdown={handleDropdown}
					isCollapsed={props.isCollapsed}
					item={item}
					key={item.text}
					location={location}
					openDropdown={openDropdown}
				/>
			))}
			{props.isDropdown &&
				!props.isCollapsed &&
				props.items.length > DROPDOWN_VISIBLE_ITEMS_LIMIT && (
					<button
						className='flex items-center pl-3 mt-2 cursor-pointer'
						onClick={() => setShowAll(!showAll)}
						type='button'
					>
						<img
							alt='Show more'
							className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
							src={downIcon || '/placeholder.svg'}
						/>
						<span className='ml-2 text-sm text-[#A1A5B7] font-semibold'>
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
			className={`bg-[#1F2A37] text-white ${
				isCollapsed ? 'w-24 items-center' : 'w-[340px]'
			} py-10 transition-all duration-300 ease-in-out flex flex-col gap-y-6`}
		>
			<SidebarHeader isCollapsed={isCollapsed} toggle={toggleSidebar} />
			{isCollapsed && (
				<button
					className='bg-[#1F2A37] text-white rounded-full p-1'
					onClick={toggleSidebar}
					type='button'
				>
					<img
						alt='Toggle Sidebar'
						className='transition-transform duration-300 rotate-180'
						src={leftSquareIcon || '/placeholder.svg'}
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
						<div className='border-b border-solid border-[#334155] mx-10 my-4' />
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
