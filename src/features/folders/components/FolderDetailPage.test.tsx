import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { useParams } from 'react-router'
import { FolderDetailPage } from './FolderDetailPage'

// Mock react-router
vi.mock('react-router', () => ({
  useParams: vi.fn()
}))

// Mock hooks
vi.mock('../hooks/use-folder-detail', () => ({
  useFolderDetail: vi.fn()
}))

// Mock components
vi.mock('./FolderDetailHeader', () => ({
  FolderDetailHeader: ({ folder }: any) => (
    <div data-testid="folder-detail-header">Header for {folder.id}</div>
  )
}))

vi.mock('./FolderDetailSidebar', () => ({
  FolderDetailSidebar: ({ activeTab, onTabChange }: any) => (
    <div data-testid="folder-detail-sidebar">
      <button onClick={() => onTabChange('processo')}>Processo</button>
      <button onClick={() => onTabChange('andamento')}>Andamento</button>
      <button onClick={() => onTabChange('informacoes')}>Informações Gerais</button>
      <button onClick={() => onTabChange('publicacoes')}>Publicações</button>
      <button onClick={() => onTabChange('agenda')}>Agenda</button>
      <div>Active: {activeTab}</div>
    </div>
  )
}))

vi.mock('./FolderDetailForm', () => ({
  FolderDetailForm: ({ folder }: any) => (
    <div data-testid="folder-detail-form">Form for {folder.id}</div>
  )
}))

vi.mock('./ProcessTimeline', () => ({
  ProcessTimeline: ({ folderId }: any) => (
    <div data-testid="process-timeline">Timeline for {folderId}</div>
  )
}))

import { useFolderDetail } from '../hooks/use-folder-detail'

describe('FolderDetailPage', () => {
  const mockFolder = {
    id: '123',
    code: 'TEST-123',
    title: 'Test Folder'
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useParams).mockReturnValue({ folderId: '123' })
  })

  it('should render loading state', () => {
    vi.mocked(useFolderDetail).mockReturnValue({
      folder: null,
      isLoading: true,
      isError: false
    } as any)

    render(<FolderDetailPage />)
    
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('should render error state', () => {
    vi.mocked(useFolderDetail).mockReturnValue({
      folder: null,
      isLoading: false,
      isError: true
    } as any)

    render(<FolderDetailPage />)
    
    expect(screen.getByText('Erro ao buscar os detalhes da pasta.')).toBeInTheDocument()
  })

  it('should render folder details with default processo tab', () => {
    vi.mocked(useFolderDetail).mockReturnValue({
      folder: mockFolder,
      isLoading: false,
      isError: false
    } as any)

    render(<FolderDetailPage />)
    
    expect(screen.getByTestId('folder-detail-header')).toBeInTheDocument()
    expect(screen.getByTestId('folder-detail-sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('folder-detail-form')).toBeInTheDocument()
    expect(screen.getByText('Active: processo')).toBeInTheDocument()
  })

  it('should handle special folder ID 1830', () => {
    vi.mocked(useParams).mockReturnValue({ folderId: '1830' })
    vi.mocked(useFolderDetail).mockReturnValue({
      folder: mockFolder,
      isLoading: false,
      isError: false
    } as any)

    render(<FolderDetailPage />)
    
    expect(useFolderDetail).toHaveBeenCalledWith('1830')
  })

  it('should switch to andamento tab and show timeline', () => {
    vi.mocked(useFolderDetail).mockReturnValue({
      folder: mockFolder,
      isLoading: false,
      isError: false
    } as any)

    render(<FolderDetailPage />)
    
    const andamentoButton = screen.getByText('Andamento')
    fireEvent.click(andamentoButton)
    
    expect(screen.getByTestId('process-timeline')).toBeInTheDocument()
    expect(screen.getByText('Timeline for 123')).toBeInTheDocument()
  })

  it('should switch to informacoes tab', () => {
    vi.mocked(useFolderDetail).mockReturnValue({
      folder: mockFolder,
      isLoading: false,
      isError: false
    } as any)

    render(<FolderDetailPage />)
    
    const infoButton = screen.getByRole('button', { name: 'Informações Gerais' })
    fireEvent.click(infoButton)
    
    expect(screen.getByRole('heading', { name: 'Informações Gerais' })).toBeInTheDocument()
    expect(screen.getByText('Conteúdo das informações gerais...')).toBeInTheDocument()
  })

  it('should switch to publicacoes tab', () => {
    vi.mocked(useFolderDetail).mockReturnValue({
      folder: mockFolder,
      isLoading: false,
      isError: false
    } as any)

    render(<FolderDetailPage />)
    
    const pubButton = screen.getByText('Publicações')
    fireEvent.click(pubButton)
    
    expect(screen.getByText('Lista de publicações...')).toBeInTheDocument()
  })

  it('should switch to agenda tab', () => {
    vi.mocked(useFolderDetail).mockReturnValue({
      folder: mockFolder,
      isLoading: false,
      isError: false
    } as any)

    render(<FolderDetailPage />)
    
    const agendaButton = screen.getByText('Agenda')
    fireEvent.click(agendaButton)
    
    expect(screen.getByText('Eventos agendados...')).toBeInTheDocument()
  })

  it('should handle null folder error state', () => {
    vi.mocked(useFolderDetail).mockReturnValue({
      folder: null,
      isLoading: false,
      isError: false
    } as any)

    render(<FolderDetailPage />)
    
    expect(screen.getByText('Erro ao buscar os detalhes da pasta.')).toBeInTheDocument()
  })
})
