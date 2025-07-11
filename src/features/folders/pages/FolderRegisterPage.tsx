import {Calendar, ChevronDown} from 'lucide-react'
import {useState} from 'react'
import {useNavigate} from 'react-router'

interface FormData {
	// Informações básicas
	numeroProcesso: string
	numeroCNJ: string
	instancia: string
	natureza: string
	tipoAcao: string
	fase: string
	eletronico: string
	codigoCliente: string
	pasta: string
	casoPadraoFaturamento: string
	totus: boolean
	migrado: boolean

	// Informações do Tribunal
	orgao: string
	distribuicao: string
	dataEntrada: string
	status: string
	codigoInterno: string
	tipoPesquisa: string
	codigo: string
	juiz: string

	// Localização e Responsáveis
	area: string
	subArea: string
	nucleo: string
	comarca: string
	foro: string
	vara: string
	socio: string
	coordenador: string
	advogado: string

	// Partes
	poloAtivo: {
		nome: string
		documento: string
		tipo: string
	}
	poloPassivo: {
		nome: string
		documento: string
		tipo: string
	}

	// Valores
	valorCausa: string
	custas: string
	honorarios: string

	// Informações Detalhadas
	observacao: string
	detalhamentoObjeto: string
}

const toKebabCase = (str: string) =>
	str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()

const SelectInput = (props: {
	label: string
	options: string[]
	value: string
	onChange: (value: string) => void
}) => {
	const id = toKebabCase(props.label)
	return (
		<div className='flex flex-col gap-1'>
			<label className='text-sm font-medium text-gray-700' htmlFor={id}>
				{props.label}
			</label>
			<div className='relative'>
				<select
					className='w-full appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-cyan-500'
					id={id}
					onChange={e => props.onChange(e.target.value)}
					value={props.value}
				>
					<option value=''>Selecione...</option>
					{props.options.map(option => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
				<ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
			</div>
		</div>
	)
}

const TextInput = (props: {
	label: string
	placeholder?: string
	value: string
	onChange: (value: string) => void
}) => {
	const id = toKebabCase(props.label)
	return (
		<div className='flex flex-col gap-1'>
			<label className='text-sm font-medium text-gray-700' htmlFor={id}>
				{props.label}
			</label>
			<input
				className='w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-cyan-500'
				id={id}
				onChange={e => props.onChange(e.target.value)}
				placeholder={props.placeholder}
				type='text'
				value={props.value}
			/>
		</div>
	)
}

const DateInput = (props: {
	label: string
	value: string
	onChange: (value: string) => void
}) => {
	const id = toKebabCase(props.label)
	return (
		<div className='flex flex-col gap-1'>
			<label className='text-sm font-medium text-gray-700' htmlFor={id}>
				{props.label}
			</label>
			<div className='relative'>
				<input
					className='w-full bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-cyan-500'
					id={id}
					onChange={e => props.onChange(e.target.value)}
					type='date'
					value={props.value}
				/>
				<Calendar className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
			</div>
		</div>
	)
}

const TextareaInput = (props: {
	label: string
	value: string
	onChange: (value: string) => void
}) => {
	const id = toKebabCase(props.label)
	return (
		<div className='flex flex-col gap-1'>
			<label className='text-sm font-medium text-gray-700' htmlFor={id}>
				{props.label}
			</label>
			<textarea
				className='w-full bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 h-24 resize-none'
				id={id}
				onChange={e => props.onChange(e.target.value)}
				placeholder='Digite aqui...'
				value={props.value}
			/>
		</div>
	)
}

const ToggleSwitch = (props: {
	label: string
	checked: boolean
	onChange: (checked: boolean) => void
}) => (
	<div className='flex items-center gap-2'>
		<button
			aria-pressed={props.checked}
			className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
				props.checked ? 'bg-cyan-500' : 'bg-gray-200'
			}`}
			onClick={() => props.onChange(!props.checked)}
			type='button'
		>
			<span
				aria-hidden='true'
				className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
					props.checked ? 'translate-x-5' : 'translate-x-0'
				}`}
			/>
		</button>
		<span className='text-sm text-gray-700'>{props.label}</span>
	</div>
)

export function FolderRegisterPage() {
	const navigate = useNavigate()
	const [formData, setFormData] = useState<FormData>({
		numeroProcesso: '',
		numeroCNJ: '',
		instancia: '',
		natureza: '',
		tipoAcao: '',
		fase: '',
		eletronico: 'Sim',
		codigoCliente: '',
		pasta: '',
		casoPadraoFaturamento: 'Sim',
		totus: false,
		migrado: false,
		orgao: '',
		distribuicao: '',
		dataEntrada: '',
		status: 'Ativo',
		codigoInterno: '',
		tipoPesquisa: 'Padrão',
		codigo: '',
		juiz: '',
		area: '',
		subArea: '',
		nucleo: '',
		comarca: '',
		foro: '',
		vara: '',
		socio: '',
		coordenador: '',
		advogado: '',
		poloAtivo: {
			nome: '',
			documento: '',
			tipo: 'Autor'
		},
		poloPassivo: {
			nome: '',
			documento: '',
			tipo: 'Réu'
		},
		valorCausa: '',
		custas: '',
		honorarios: '',
		observacao: '',
		detalhamentoObjeto: ''
	})

	const updateField = (
		field: keyof FormData,
		value: string | boolean | {nome: string; documento: string; tipo: string}
	) => {
		setFormData(prev => ({
			...prev,
			[field]: value
		}))
	}

	const updateNestedField = (
		parent: 'poloAtivo' | 'poloPassivo',
		field: 'nome' | 'documento' | 'tipo',
		value: string
	) => {
		setFormData(prev => ({
			...prev,
			[parent]: {
				...prev[parent],
				[field]: value
			}
		}))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Navigate back to consultation page
		void navigate('/dashboard/folders/consultation')
	}

	return (
		<div className='p-6 bg-gray-50 min-h-full'>
			<div className='mb-6'>
				<h1 className='text-2xl font-semibold text-gray-900'>
					Cadastro de Pasta
				</h1>
				<p className='text-sm text-gray-500 mt-1'>
					Preencha os dados do novo processo
				</p>
			</div>

			<form onSubmit={handleSubmit}>
				{/* Informações Básicas */}
				<div className='bg-white rounded-lg p-6 shadow-sm mb-6'>
					<h2 className='text-lg font-semibold text-gray-900 mb-4'>
						Informações Básicas
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
						<TextInput
							label='Nº Processo'
							onChange={value => updateField('numeroProcesso', value)}
							value={formData.numeroProcesso}
						/>
						<TextInput
							label='Nº CNJ'
							onChange={value => updateField('numeroCNJ', value)}
							value={formData.numeroCNJ}
						/>
						<SelectInput
							label='Instância'
							onChange={value => updateField('instancia', value)}
							options={[
								'Primeira Instância',
								'Segunda Instância',
								'Tribunais Superiores'
							]}
							value={formData.instancia}
						/>
						<SelectInput
							label='Natureza'
							onChange={value => updateField('natureza', value)}
							options={[
								'Cível',
								'Criminal',
								'Trabalhista',
								'Tributário',
								'Administrativo'
							]}
							value={formData.natureza}
						/>
						<TextInput
							label='Tipo de Ação'
							onChange={value => updateField('tipoAcao', value)}
							value={formData.tipoAcao}
						/>
						<SelectInput
							label='Fase'
							onChange={value => updateField('fase', value)}
							options={[
								'Conhecimento',
								'Execução',
								'Recurso',
								'Cumprimento de Sentença'
							]}
							value={formData.fase}
						/>
						<SelectInput
							label='Eletrônico'
							onChange={value => updateField('eletronico', value)}
							options={['Sim', 'Não']}
							value={formData.eletronico}
						/>
						<TextInput
							label='Código do Cliente'
							onChange={value => updateField('codigoCliente', value)}
							value={formData.codigoCliente}
						/>
						<TextInput
							label='Pasta'
							onChange={value => updateField('pasta', value)}
							value={formData.pasta}
						/>
						<SelectInput
							label='Caso Padrão Faturamento'
							onChange={value => updateField('casoPadraoFaturamento', value)}
							options={['Sim', 'Não']}
							value={formData.casoPadraoFaturamento}
						/>
						<div className='flex items-end'>
							<ToggleSwitch
								checked={formData.totus}
								label='TOTUS'
								onChange={value => updateField('totus', value)}
							/>
						</div>
						<div className='flex items-end'>
							<ToggleSwitch
								checked={formData.migrado}
								label='Migrado'
								onChange={value => updateField('migrado', value)}
							/>
						</div>
					</div>
				</div>

				{/* Informações do Tribunal */}
				<div className='bg-white rounded-lg p-6 shadow-sm mb-6'>
					<h2 className='text-lg font-semibold text-gray-900 mb-4'>
						Informações do Tribunal
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
						<SelectInput
							label='Órgão'
							onChange={value => updateField('orgao', value)}
							options={[
								'TJSP',
								'TJRJ',
								'TJMG',
								'TRF-1',
								'TRF-2',
								'TRF-3',
								'TST',
								'STJ',
								'STF'
							]}
							value={formData.orgao}
						/>
						<SelectInput
							label='Distribuição'
							onChange={value => updateField('distribuicao', value)}
							options={['Sorteio', 'Dependência', 'Prevenção']}
							value={formData.distribuicao}
						/>
						<DateInput
							label='Data de Entrada'
							onChange={value => updateField('dataEntrada', value)}
							value={formData.dataEntrada}
						/>
						<SelectInput
							label='Status'
							onChange={value => updateField('status', value)}
							options={['Ativo', 'Arquivado', 'Suspenso', 'Encerrado']}
							value={formData.status}
						/>
						<TextInput
							label='Código Interno'
							onChange={value => updateField('codigoInterno', value)}
							value={formData.codigoInterno}
						/>
						<SelectInput
							label='Tipo de Pesquisa'
							onChange={value => updateField('tipoPesquisa', value)}
							options={['Padrão', 'Especial']}
							value={formData.tipoPesquisa}
						/>
						<TextInput
							label='Código'
							onChange={value => updateField('codigo', value)}
							value={formData.codigo}
						/>
						<TextInput
							label='Juiz'
							onChange={value => updateField('juiz', value)}
							value={formData.juiz}
						/>
					</div>
				</div>

				{/* Localização e Responsáveis */}
				<div className='bg-white rounded-lg p-6 shadow-sm mb-6'>
					<h2 className='text-lg font-semibold text-gray-900 mb-4'>
						Localização e Responsáveis
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<SelectInput
							label='Área'
							onChange={value => updateField('area', value)}
							options={[
								'Cível Contencioso',
								'Trabalhista',
								'Tributário',
								'Criminal',
								'Administrativo',
								'Consumidor',
								'Família',
								'Empresarial'
							]}
							value={formData.area}
						/>
						<TextInput
							label='SubÁrea'
							onChange={value => updateField('subArea', value)}
							value={formData.subArea}
						/>
						<TextInput
							label='Núcleo'
							onChange={value => updateField('nucleo', value)}
							value={formData.nucleo}
						/>
						<TextInput
							label='Comarca'
							onChange={value => updateField('comarca', value)}
							value={formData.comarca}
						/>
						<TextInput
							label='Foro'
							onChange={value => updateField('foro', value)}
							value={formData.foro}
						/>
						<TextInput
							label='Vara'
							onChange={value => updateField('vara', value)}
							value={formData.vara}
						/>
						<TextInput
							label='Sócio'
							onChange={value => updateField('socio', value)}
							value={formData.socio}
						/>
						<TextInput
							label='Coordenador'
							onChange={value => updateField('coordenador', value)}
							value={formData.coordenador}
						/>
						<TextInput
							label='Advogado'
							onChange={value => updateField('advogado', value)}
							value={formData.advogado}
						/>
					</div>
				</div>

				{/* Partes */}
				<div className='bg-white rounded-lg p-6 shadow-sm mb-6'>
					<h2 className='text-lg font-semibold text-gray-900 mb-4'>
						Partes do Processo
					</h2>

					<div className='mb-6'>
						<h3 className='text-md font-semibold text-gray-800 mb-3'>
							Polo Ativo
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<TextInput
								label='Nome'
								onChange={value =>
									updateNestedField('poloAtivo', 'nome', value)
								}
								value={formData.poloAtivo.nome}
							/>
							<TextInput
								label='CPF/CNPJ'
								onChange={value =>
									updateNestedField('poloAtivo', 'documento', value)
								}
								value={formData.poloAtivo.documento}
							/>
							<SelectInput
								label='Tipo'
								onChange={value =>
									updateNestedField('poloAtivo', 'tipo', value)
								}
								options={['Autor', 'Requerente', 'Exequente', 'Impetrante']}
								value={formData.poloAtivo.tipo}
							/>
						</div>
					</div>

					<div>
						<h3 className='text-md font-semibold text-gray-800 mb-3'>
							Polo Passivo
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<TextInput
								label='Nome'
								onChange={value =>
									updateNestedField('poloPassivo', 'nome', value)
								}
								value={formData.poloPassivo.nome}
							/>
							<TextInput
								label='CPF/CNPJ'
								onChange={value =>
									updateNestedField('poloPassivo', 'documento', value)
								}
								value={formData.poloPassivo.documento}
							/>
							<SelectInput
								label='Tipo'
								onChange={value =>
									updateNestedField('poloPassivo', 'tipo', value)
								}
								options={['Réu', 'Requerido', 'Executado', 'Impetrado']}
								value={formData.poloPassivo.tipo}
							/>
						</div>
					</div>
				</div>

				{/* Valores */}
				<div className='bg-white rounded-lg p-6 shadow-sm mb-6'>
					<h2 className='text-lg font-semibold text-gray-900 mb-4'>Valores</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<TextInput
							label='Valor da Causa'
							onChange={value => updateField('valorCausa', value)}
							placeholder='R$ 0,00'
							value={formData.valorCausa}
						/>
						<TextInput
							label='Custas'
							onChange={value => updateField('custas', value)}
							placeholder='R$ 0,00'
							value={formData.custas}
						/>
						<TextInput
							label='Honorários'
							onChange={value => updateField('honorarios', value)}
							placeholder='R$ 0,00'
							value={formData.honorarios}
						/>
					</div>
				</div>

				{/* Informações Detalhadas */}
				<div className='bg-white rounded-lg p-6 shadow-sm mb-6'>
					<h2 className='text-lg font-semibold text-gray-900 mb-4'>
						Informações Detalhadas
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<TextareaInput
							label='Observação'
							onChange={value => updateField('observacao', value)}
							value={formData.observacao}
						/>
						<TextareaInput
							label='Detalhamento do Objeto'
							onChange={value => updateField('detalhamentoObjeto', value)}
							value={formData.detalhamentoObjeto}
						/>
					</div>
				</div>

				{/* Buttons */}
				<div className='flex justify-end gap-4'>
					<button
						className='px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
						onClick={() => navigate('/dashboard/folders/consultation')}
						type='button'
					>
						Cancelar
					</button>
					<button
						className='px-4 py-2 text-sm font-semibold text-white bg-cyan-500 rounded-md hover:bg-cyan-600'
						type='submit'
					>
						Salvar Pasta
					</button>
				</div>
			</form>
		</div>
	)
}
