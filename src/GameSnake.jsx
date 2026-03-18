import { useState } from 'react'
import { Game } from './components'

const GameSnake = () => {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="game-snake">{isOpen && <Game onClose={handleClose} />}</div>
  )
}

export default GameSnake
