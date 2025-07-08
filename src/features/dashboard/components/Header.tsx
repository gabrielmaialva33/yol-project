import {useNavigate} from 'react-router'
import bellIcon from '/icons/bell.svg'
import calendarIcon from '/icons/calendar.svg'
import exitIcon from '/icons/exit-right.svg'
import messagesIcon from '/icons/messages.svg'
import {messages} from '../../../mocks/data/messages'
import {notifications} from '../../../mocks/data/notifications'
import {useDetectOutsideClick} from '../../../shared/utils/useDetectOutsideClick'
import {MessagesDropdown} from './MessagesDropdown'
import {NotificationsDropdown} from './NotificationsDropdown'

export function Header() {
	const navigate = useNavigate()
	const {
		isActive: showNotifications,
		nodeRef: notificationsRef,
		triggerRef: notificationsTriggerRef
	} = useDetectOutsideClick(false)
	const {
		isActive: showMessages,
		nodeRef: messagesRef,
		triggerRef: messagesTriggerRef
	} = useDetectOutsideClick(false)

	const handleLogout = () => {
		void navigate('/')
	}

	return (
		<header className='bg-white border-b border-gray-200 px-6 py-4'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-semibold text-gray-900'>Visão Geral</h1>
					<p className='text-gray-500 mt-1'>
						Suas tarefas principais estão nessa sessão.
					</p>
				</div>
				<div className='flex items-center space-x-4'>
					<div className='relative' ref={notificationsRef}>
						<button
							className='p-2 text-gray-400 hover:text-gray-600'
							ref={notificationsTriggerRef}
							type='button'
						>
							<img
								alt='Notifications'
								className='w-5 h-5'
								src={bellIcon || '/placeholder.svg'}
							/>
							{notifications.unread > 0 && (
								<span className='absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-white' />
							)}
						</button>
						{showNotifications && <NotificationsDropdown />}
					</div>
					<button
						className='p-2 text-gray-400 hover:text-gray-600'
						type='button'
					>
						<img
							alt='Calendar'
							className='w-5 h-5'
							src={calendarIcon || '/placeholder.svg'}
						/>
					</button>
					<div className='relative' ref={messagesRef}>
						<button
							className='p-2 text-gray-400 hover:text-gray-600'
							ref={messagesTriggerRef}
							type='button'
						>
							<img
								alt='messages'
								className='w-5 h-5'
								src={messagesIcon || '/placeholder.svg'}
							/>
							{messages.unread > 0 && (
								<span className='absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-white' />
							)}
						</button>
						{showMessages && <MessagesDropdown />}
					</div>
					<img
						alt='User Avatar'
						className='w-8 h-8 rounded-full'
						src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Prescription01&hairColor=Blonde&facialHairType=MoustacheMagnum&facialHairColor=Blonde&clotheType=GraphicShirt&clotheColor=Red&graphicType=Skull&eyeType=EyeRoll&eyebrowType=FlatNatural&mouthType=Sad&skinColor=Pale'
					/>
					<button
						className='p-2 text-gray-400 hover:text-gray-600'
						onClick={handleLogout}
						type='button'
					>
						<img
							alt='exit'
							className='w-5 h-5'
							src={exitIcon || '/placeholder.svg'}
						/>
					</button>
				</div>
			</div>
		</header>
	)
}
