import {ActiveFoldersCard} from './widgets/ActiveFoldersCard'
import {AreaDivisionCard} from './widgets/AreaDivisionCard'
import {BillingCard} from './widgets/BillingCard'
import {BirthdaysCard} from './widgets/BirthdaysCard'
import {FolderActivityCard} from './widgets/FolderActivityCard'
import {HearingsCard} from './widgets/HearingsCard'
import {RequestsCard} from './widgets/RequestsCard'
import {TasksCard} from './widgets/TasksCard'

export function DashboardContent() {
	return (
		<div className='p-6'>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
				<ActiveFoldersCard />
				<AreaDivisionCard />
				<FolderActivityCard />
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
				<TasksCard />
				<RequestsCard />
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				<div className='lg:col-span-2'>
					<HearingsCard />
				</div>
				<div className='flex flex-col gap-6'>
					<BillingCard />
					<BirthdaysCard />
				</div>
			</div>
		</div>
	)
}
