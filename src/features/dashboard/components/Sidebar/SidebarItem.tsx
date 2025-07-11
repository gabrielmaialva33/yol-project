import {useState} from 'react'
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
	asButton?: boolean
}

const getIconClasses = (isCollapsed: boolean, active = false) => {
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
			className={getIconClasses(props.isCollapsed, props.active)}
			src={props.icon || '/placeholder.svg'}
		/>
	)
}

const SidebarItem = (props: SidebarItemProps) => {
	const [showTooltip, setShowTooltip] = useState(false)
	const activeClasses = props.active
		? 'bg-orange-500 text-white'
		: 'text-white hover:bg-gray-700'

	const className = `
    relative flex items-center py-2 px-3 my-1
    font-semibold rounded-md cursor-pointer
    transition-colors group text-base w-full
    ${props.isCollapsed ? 'justify-center' : ''}
    ${activeClasses}
`

	const content = (
		<>
			{renderIcon(props)}
			<span
				className={`overflow-hidden transition-all ${props.isCollapsed ? 'w-0' : 'w-52 ml-4'}`}
			>
				{props.text}
			</span>
			{props.hasSubItems && !props.isCollapsed && (
				<img
					alt='Dropdown'
					className={`w-5 h-5 ml-auto transition-transform ${props.isOpen ? 'rotate-180' : ''}`}
					src={downIcon || '/placeholder.svg'}
				/>
			)}
			{!props.isCollapsed && props.badge && (
				<div className='ml-auto text-xs bg-[#475569] text-white rounded-md px-2 py-1'>
					{props.badge}
				</div>
			)}
			{/* Tooltip */}
			{showTooltip && props.isCollapsed && (
				<div className='absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap z-50'>
					{props.text}
					{props.badge && <span className='ml-2'>({props.badge})</span>}
				</div>
			)}
		</>
	)

	return (
		<>
			<style>
				{`
      .filter-orange {
        filter: invert(55%) sepia(98%) saturate(1268%) hue-rotate(359deg) brightness(101%) contrast(101%);
      }
    `}
			</style>
			{props.asButton !== false ? (
				<button
					className={className}
					onMouseEnter={() => props.isCollapsed && setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
					type='button'
				>
					{content}
				</button>
			) : (
				<div className={className}>{content}</div>
			)}
		</>
	)
}

export {SidebarItem}
