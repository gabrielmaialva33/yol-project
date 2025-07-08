import downIcon from '/icons/down.svg'

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

const getActiveClasses = (isCollapsed: boolean) => {
	return isCollapsed ? 'text-[#EC6553]' : 'bg-[#EC6553] text-white'
}

const getHoverClasses = (isCollapsed: boolean) => {
	return isCollapsed
		? 'hover:text-[#EC6553]'
		: 'hover:bg-[#EC6553] hover:text-white'
}

const getIconClasses = (active: boolean, isCollapsed: boolean) => {
	if (active && !isCollapsed) {
		return 'w-6 h-6 brightness-0 invert'
	}
	if (active && isCollapsed) {
		return 'w-6 h-6 filter-orange'
	}
	return 'w-6 h-6'
}

const renderIcon = (props: SidebarItemProps) => {
	if (props.color) {
		return (
			<span
				className='w-2.5 h-2.5 rounded-full'
				style={{backgroundColor: props.color}}
			/>
		)
	}

	return (
		<img
			alt={props.text}
			className={getIconClasses(props.active, props.isCollapsed)}
			src={props.icon || '/placeholder.svg'}
		/>
	)
}

const SidebarItem = (props: SidebarItemProps) => {
	const activeClasses = getActiveClasses(props.isCollapsed)
	const hoverClasses = getHoverClasses(props.isCollapsed)

	return (
		<>
			<style>
				{`
        .filter-orange {
          filter: invert(55%) sepia(98%) saturate(1268%) hue-rotate(359deg) brightness(101%) contrast(101%);
        }
      `}
			</style>
			<li
				className={`
      relative flex items-center py-2 px-3 my-1
      font-semibold rounded-md cursor-pointer
      transition-colors group text-base
      ${props.active ? activeClasses : `text-white ${hoverClasses}`}
  `}
			>
				{renderIcon(props)}
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
							props.isOpen ? 'rotate-180' : ''
						}`}
						src={downIcon || '/placeholder.svg'}
					/>
				)}
				{!props.isCollapsed && props.badge && (
					<div className='ml-auto text-xs bg-[#475569] text-white rounded-md px-2 py-1'>
						{props.badge}
					</div>
				)}
			</li>
		</>
	)
}

export {SidebarItem}
