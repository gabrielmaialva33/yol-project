import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MessagesDropdown } from './MessagesDropdown'

// Mock luxon DateTime
vi.mock('luxon', () => ({
  DateTime: {
    fromJSDate: () => ({
      toRelative: () => 'há 2 horas'
    })
  }
}))

// Mock messages data
vi.mock('../../../mocks/data/messages', () => ({
  messages: {
    unread: 3,
    items: [
      {
        id: '1',
        avatar: 'https://example.com/avatar1.jpg',
        name: 'João Silva',
        message: 'Olá, como está?',
        time: new Date()
      },
      {
        id: '2',
        avatar: 'https://example.com/avatar2.jpg',
        name: 'Maria Santos',
        message: 'Reunião às 15h',
        time: new Date()
      }
    ]
  }
}))

describe('MessagesDropdown', () => {
  it('should render messages dropdown with title', () => {
    render(<MessagesDropdown />)
    
    expect(screen.getByText('Mensagens')).toBeInTheDocument()
  })

  it('should render all message items', () => {
    render(<MessagesDropdown />)
    
    expect(screen.getByText('João Silva')).toBeInTheDocument()
    expect(screen.getByText('Olá, como está?')).toBeInTheDocument()
    expect(screen.getByText('Maria Santos')).toBeInTheDocument()
    expect(screen.getByText('Reunião às 15h')).toBeInTheDocument()
  })

  it('should render avatars for each message', () => {
    render(<MessagesDropdown />)
    
    const avatars = screen.getAllByAltText('Avatar')
    expect(avatars).toHaveLength(2)
    expect(avatars[0]).toHaveAttribute('src', 'https://example.com/avatar1.jpg')
    expect(avatars[1]).toHaveAttribute('src', 'https://example.com/avatar2.jpg')
  })

  it('should render relative time for messages', () => {
    render(<MessagesDropdown />)
    
    const relativeTimes = screen.getAllByText('há 2 horas')
    expect(relativeTimes).toHaveLength(2)
  })

  it('should render view all messages button', () => {
    render(<MessagesDropdown />)
    
    const button = screen.getByText('Ver todas as mensagens')
    expect(button).toBeInTheDocument()
    expect(button.tagName).toBe('BUTTON')
  })

  it('should have correct dropdown styling', () => {
    const { container } = render(<MessagesDropdown />)
    
    const dropdown = container.firstChild
    expect(dropdown).toHaveClass('absolute', 'top-12', 'right-0', 'w-80', 'bg-gray-50')
  })
})
