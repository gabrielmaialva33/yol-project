import {useId} from 'react'

export function LoginForm() {
	const emailId = useId()
	const passwordId = useId()
	return (
		<div className='flex h-[607px] w-[490px] flex-col items-center justify-center gap-10 rounded-lg bg-white p-[75px] font-sans shadow-lg'>
			<div className='flex flex-col items-center gap-[15px] self-stretch'>
				<h2 className='self-stretch text-center text-[40px] font-semibold leading-[0.6em] tracking-[-0.01em] text-gray-900'>
					Fazer login
				</h2>
			</div>
			<form className='flex flex-col items-start gap-5 self-stretch'>
				<div className='flex flex-col items-start gap-5 self-stretch'>
					<div className='flex h-[50px] items-center gap-2.5 self-stretch rounded-md border border-default px-3 py-2.5'>
						<div className='flex flex-col items-start justify-center'>
							<label className='sr-only' htmlFor={emailId}>
								E-mail
							</label>
							<input
								autoComplete='email'
								className='w-full bg-transparent text-base font-semibold text-gray-500 placeholder-gray-500 focus:outline-none'
								id={emailId}
								name='email'
								placeholder='E-mail'
								required={true}
								type='email'
							/>
						</div>
					</div>
					<div className='flex h-[50px] items-center gap-2.5 self-stretch rounded-md border border-default px-3 py-2.5'>
						<div className='flex flex-col items-start justify-center'>
							<label className='sr-only' htmlFor={passwordId}>
								Senha
							</label>
							<input
								autoComplete='current-password'
								className='w-full bg-transparent text-base font-semibold text-gray-500 placeholder-gray-500 focus:outline-none'
								id={passwordId}
								name='password'
								placeholder='Senha'
								required={true}
								type='password'
							/>
						</div>
					</div>
					<a
						className='self-stretch text-right text-base font-medium text-gray-500 underline'
						href='/#'
					>
						Esqueci minha senha
					</a>
				</div>
				<button
					className='flex h-[50px] items-center justify-center gap-2.5 self-stretch rounded-full bg-gray-900 px-4 py-3 font-work-sans'
					type='submit'
				>
					<span className='text-base font-semibold text-white'>Entrar</span>
				</button>
			</form>
		</div>
	)
}
