import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { Header } from './Header'

// Mock navigate function
const mockNavigate = vi.fn()
let mockPathname = '/dashboard'

// Mock react-router
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: mockPathname })
}))

// Mock components
vi.mock('./NotificationsDropdown', () => ({
  NotificationsDropdown: () => <div data-testid="notifications-dropdown">Notifications</div>
}))

vi.mock('./MessagesDropdown', () => ({
  MessagesDropdown: () => <div data-testid="messages-dropdown">Messages</div>
}))

// Mock hooks
vi.mock('../../../shared/utils/use-detect-outside-click', () => ({
  useDetectOutsideClick: () => ({
    isActive: false,
    nodeRef: { current: null },
    triggerRef: { current: null }
  })
}))

// Mock data
vi.mock('../../../mocks/data/notifications', () => ({
  notifications: { unread: 2 }
}))

vi.mock('../../../mocks/data/messages', () => ({
  messages: { unread: 3 }
}))

describe('Header', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    mockPathname = '/dashboard'
  })

  it('should render header with title and subtitle', () => {
    render(<Header />)
    
    // Check for title and subtitle
    expect(screen.getByText('Visão Geral')).toBeInTheDocument()
    expect(screen.getByText('Suas tarefas principais estão nessa sessão.')).toBeInTheDocument()
  })

  it('should render correct title for folder consultation page', () => {
    mockPathname = '/dashboard/folders/consultation'
    render(<Header />)
    
    expect(screen.getByText('Consulta de pastas')).toBeInTheDocument()
    // This page doesn't have a description
    expect(screen.queryByText('Suas tarefas principais estão nessa sessão.')).not.toBeInTheDocument()
  })

  it('should render default title for unknown paths', () => {
    mockPathname = '/unknown/path'
    render(<Header />)
    
    // Should fallback to dashboard title
    expect(screen.getByText('Visão Geral')).toBeInTheDocument()
  })

  it('should render notification button with red dot', () => {
    render(<Header />)
    
    // Check for notification button by alt text
    expect(screen.getByAltText('Notificações')).toBeInTheDocument()
    
    // Check for red notification dot
    const redDot = document.querySelector('.bg-red-600')
    expect(redDot).toBeInTheDocument()
  })

  it('should render calendar button', () => {
    render(<Header />)
    
    expect(screen.getByAltText('Calendário')).toBeInTheDocument()
  })

  it('should render messages button with notification dot', () => {
    render(<Header />)
    
    expect(screen.getByAltText('mensagens')).toBeInTheDocument()
    
    // Should have notification dots for both notifications and messages
    const redDots = document.querySelectorAll('.bg-red-600')
    expect(redDots).toHaveLength(2)
  })

  it('should render user avatar', () => {
    render(<Header />)
    
    const avatar = screen.getByAltText('Avatar do usuário')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', expect.stringContaining('avataaars.io'))
  })

  it('should have correct header styling', () => {
    const { container } = render(<Header />)
    
    const header = container.firstChild
    expect(header).toHaveClass('bg-white', 'border-b', 'border-gray-200')
  })

  it('should render all action buttons', () => {
    render(<Header />)
    
    // Should have multiple buttons (notifications, calendar, messages, logout)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(4)
  })

  it('should handle logout button click', () => {
    render(<Header />)
    
    const logoutButton = screen.getByAltText('sair').parentElement
    fireEvent.click(logoutButton)
    
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('should render logout button', () => {
    render(<Header />)
    
    const logoutIcon = screen.getByAltText('sair')
    expect(logoutIcon).toBeInTheDocument()
    // The icon is an inline SVG, so we just check it exists
    expect(logoutIcon.tagName).toBe('IMG')
  })
})
