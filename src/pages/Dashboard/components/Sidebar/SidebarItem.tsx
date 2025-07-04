interface SidebarItemProps {
	icon: string
	text: string
	active?: boolean | undefined
	isCollapsed: boolean
	color?: string | undefined
	badge?: number | undefined
	hasSubItems?: boolean
	isOpen?: boolean
}

const SidebarItem = (props: SidebarItemProps) => {
	const activeClasses = props.isCollapsed
		? 'text-orange-500'
		: 'bg-orange-500 text-white'
	const hoverClasses = props.isCollapsed
		? 'hover:text-orange-500'
		: 'hover:bg-orange-500 hover:text-white'

	return (
		<li
			className={`
        relative flex items-center py-2 px-3 my-1
        font-semibold rounded-md cursor-pointer
        transition-colors group text-base
        ${props.active ? activeClasses : `text-gray-400 ${hoverClasses}`}
    `}
		>
			{props.color ? (
				<span
					className='w-2.5 h-2.5 rounded-full'
					style={{backgroundColor: props.color}}
				/>
			) : (
				<img
					alt={props.text}
					className={`w-6 h-6 ${
						props.active && !props.isCollapsed ? 'brightness-0 invert' : ''
					} ${props.active && props.isCollapsed ? 'filter-orange' : ''}`}
					src={props.icon}
				/>
			)}
			<style>
				{`
          .filter-orange {
            filter: invert(55%) sepia(98%) saturate(1268%) hue-rotate(359deg) brightness(101%) contrast(101%);
          }
        `}
			</style>
			<span
				className={`overflow-hidden transition-all ${
					props.isCollapsed ? 'w-0' : 'w-52 ml-4'
				}`}
			>
				{props.text}
			</span>
			{props.hasSubItems && !props.isCollapsed && (
				<img
					alt='Dropdown'
					className={`w-5 h-5 ml-auto transition-transform ${
						props.isOpen && 'rotate-180'
					}`}
					src='/icons/down.svg'
				/>
			)}
			{!props.isCollapsed && props.badge && (
				<div className='ml-auto text-xs bg-[#BABBC1] text-[#1E293B] rounded-md px-2 py-1'>
					{props.badge}
				</div>
			)}
		</li>
	)
}

export {SidebarItem}
