import {LoginForm} from './components/LoginForm'

export function LoginPage() {
	return (
		<div className='relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#373737]'>
			<div className='absolute -left-80 top-60 hidden h-[1102px] w-[1136px] rounded-full border-[15px] border-orange-500/50 shadow-[0_4px_94.6px_13px_#0F172A] md:block' />
			<div className='absolute -left-80 top-[-314px] hidden h-[1102px] w-[1136px] rounded-full border-[15px] border-orange-500/50 shadow-[0_4px_94.6px_13px_#0F172A] md:block' />
			<div className='container mx-auto flex h-full items-center justify-center px-4 md:justify-between'>
				<div className='hidden flex-col items-start justify-center gap-5 md:flex'>
					<img
						alt='YOL'
						className='h-auto w-full max-w-[406px]'
						src='/logo-yol.svg'
					/>
				</div>
				<div className='z-10 w-full max-w-md'>
					<LoginForm />
				</div>
			</div>
		</div>
	)
}
