import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FolderDetailHeader } from './FolderDetailHeader'
import type { FolderDetail } from '../types/folder.types'

// Mock react-router
const mockNavigate = vi.fn()
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate
}))

// Mock lucide-react
vi.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid="chevron-left-icon">ChevronLeft</div>
}))

const mockFolder: FolderDetail = {
  id: '12345678',
  status: 'Completed',
  date: '2024-01-15',
  time: '14:30',
  clientName: 'Test Client',
  clientCode: 'TC001',
  area: 'Test Area',
  contractType: 'Standard',
  birthDate: '1990-01-01',
  deathDate: null,
  unionMember: false,
  sealRequest: false,
  priority: 'Normal',
  folderType: 'Type A'
}

describe('FolderDetailHeader', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('should render folder ID truncated to 4 characters', () => {
    render(<FolderDetailHeader folder={mockFolder} />)
    
    expect(screen.getByText('Pasta #1234')).toBeInTheDocument()
  })

  it('should render status badge with correct status', () => {
    render(<FolderDetailHeader folder={mockFolder} />)
    
    const statusBadge = screen.getByText('Completed')
    expect(statusBadge).toBeInTheDocument()
    expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800')
  })

  it('should render date and time', () => {
    render(<FolderDetailHeader folder={mockFolder} />)
    
    expect(screen.getByText('2024-01-15 14:30')).toBeInTheDocument()
  })

  it('should render back button with chevron icon', () => {
    render(<FolderDetailHeader folder={mockFolder} />)
    
    const backButton = screen.getByRole('button', { name: 'ChevronLeft' })
    expect(backButton).toBeInTheDocument()
    expect(screen.getByTestId('chevron-left-icon')).toBeInTheDocument()
  })

  it('should navigate back when back button is clicked', () => {
    render(<FolderDetailHeader folder={mockFolder} />)
    
    const backButton = screen.getByRole('button', { name: 'ChevronLeft' })
    fireEvent.click(backButton)
    
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('should render save button', () => {
    render(<FolderDetailHeader folder={mockFolder} />)
    
    const saveButton = screen.getByText('Salvar')
    expect(saveButton).toBeInTheDocument()
    expect(saveButton.tagName).toBe('BUTTON')
  })

  it('should render add files button', () => {
    render(<FolderDetailHeader folder={mockFolder} />)
    
    const addFilesButton = screen.getByText('Adicionar arquivos')
    expect(addFilesButton).toBeInTheDocument()
    expect(addFilesButton.tagName).toBe('BUTTON')
    expect(addFilesButton).toHaveClass('bg-cyan-500')
  })

  it('should render unknown status with default styling', () => {
    const folderWithUnknownStatus = { ...mockFolder, status: 'Unknown' }
    render(<FolderDetailHeader folder={folderWithUnknownStatus} />)
    
    const statusBadge = screen.getByText('Unknown')
    expect(statusBadge).toHaveClass('bg-gray-100', 'text-gray-800')
  })

  it('should have correct header layout', () => {
    const { container } = render(<FolderDetailHeader folder={mockFolder} />)
    
    const header = container.firstChild
    expect(header).toHaveClass('flex', 'items-center', 'justify-between')
  })
})
