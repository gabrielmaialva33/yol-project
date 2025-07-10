import {Calendar, ChevronDown} from 'lucide-react'

const SelectInput = ({
	label,
	options,
	defaultValue
}: {
	label: string
	options: string[]
	defaultValue?: string
}) => (
	<div className='flex flex-col gap-1'>
		<label className='text-sm font-medium text-gray-700'>{label}</label>
		<div className='relative'>
			<select
				className='w-full appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-cyan-500'
				defaultValue={defaultValue}
			>
				{options.map(option => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
			<ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
		</div>
	</div>
)

const TextInput = ({
	label,
	placeholder
}: {
	label: string
	placeholder?: string
}) => (
	<div className='flex flex-col gap-1'>
		<label className='text-sm font-medium text-gray-700'>{label}</label>
		<input
			className='w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-cyan-500'
			placeholder={placeholder}
			type='text'
		/>
	</div>
)

const DateInput = ({label}: {label: string}) => (
	<div className='flex flex-col gap-1'>
		<label className='text-sm font-medium text-gray-700'>{label}</label>
		<div className='relative'>
			<input
				className='w-full bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-cyan-500'
				type='text'
			/>
			<Calendar className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
		</div>
	</div>
)

const TextareaInput = ({label}: {label: string}) => (
	<div className='flex flex-col gap-1'>
		<label className='text-sm font-medium text-gray-700'>{label}</label>
		<textarea
			className='w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 h-24 resize-none'
			placeholder='Digite aqui...'
		/>
	</div>
)

const ToggleSwitch = ({label}: {label: string}) => (
	<div className='flex items-center gap-2'>
		<button
			aria-pressed='false'
			className='relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2'
			type='button'
		>
			<span
				aria-hidden='true'
				className='translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
			/>
		</button>
		<span className='text-sm text-gray-700'>{label}</span>
	</div>
)

export function FolderDetailForm() {
	return (
		<div className='bg-white rounded-lg p-6 shadow-sm'>
			<div className='grid grid-cols-1 md:grid-cols-4 gap-6 border-b pb-6 mb-6'>
				<TextInput label='Nº Processo' />
				<TextInput label='Nº CNJ' />
				<SelectInput
					label='Instância'
					options={['Primeira Instância', 'Segunda Instância']}
				/>
				<SelectInput label='Natureza' options={['Cível']} />
				<SelectInput label='Tipo ação' options={['Ordinária']} />
				<SelectInput label='Fase' options={['Conhecimento']} />
				<SelectInput label='Eletrônico' options={['Sim', 'Não']} />
				<SelectInput label='Cod. cliente' options={['001', '002']} />
				<TextInput label='Pasta' />
				<SelectInput label='Caso padrão faturamento' options={['Sim', 'Não']} />
				<div className='flex items-end'>
					<ToggleSwitch label='TOTUS' />
				</div>
				<div className='flex items-end'>
					<ToggleSwitch label='Migrado' />
				</div>
				<SelectInput label='Órgão' options={['TJSP']} />
				<SelectInput label='Distribuição' options={['Sorteio']} />
				<DateInput label='Entrada' />
				<SelectInput label='Status' options={['Ativo']} />
				<TextInput label='Cód.Interno' />
				<SelectInput label='Tipo Pesquisa' options={['Padrão']} />
				<TextInput label='Código' />
				<TextInput label='Juiz' />
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 border-b pb-6 mb-6'>
				<SelectInput label='Área' options={['Cível Contencioso']} />
				<SelectInput label='Comarca' options={['São Paulo']} />
				<SelectInput label='Sócio' options={['Dr. João']} />
				<SelectInput label='SubÁrea' options={['Contratos']} />
				<SelectInput label='Foro' options={['Foro Central Cível']} />
				<SelectInput label='Coordenador' options={['Dra. Maria']} />
				<SelectInput label='Núcleo' options={['Equipe 1']} />
				<SelectInput label='Vara' options={['1ª Vara Cível']} />
				<SelectInput label='Advogado' options={['Dr. Carlos']} />
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
				<div className='flex gap-4'>
					<ToggleSwitch label='Polo ativo' />
					<ToggleSwitch label='Polo ativo' />
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				<TextareaInput label='Observação' />
				<TextareaInput label='Detalhamento do objeto' />
				<TextareaInput label='Último andamento' />
			</div>
		</div>
	)
}
