import { GameCanvas, GameScreen, Stat } from './index'
import useSnakeGame from '../hooks/useSnakeGame'
import '../styles/components/game.css'

const Game = (props) => {
  const { onClose } = props
  const { gameState, handleStart, handleRestart } = useSnakeGame()
  const { snake, food, status, score, bestScore, multiplier } = gameState

  return (
    <div className="game">
      <div className="game__header">
        <span className="game__name">Retro Snake</span>
        <button
          className="game__close"
          aria-label="Close"
          title="Close game"
          type="button"
          onClick={onClose}
        >
          <svg className="game__close-icon" viewBox="0 0 20 20">
            <path d="M4 4L16 16M16 4L4 16" />
          </svg>
        </button>
      </div>

      <div className="game__body">
        {status === 'game' && (
          <div className="game__stats">
            <Stat label="Multiplier" value={multiplier} suffix="x" />
            <Stat label="Score" value={score} />
          </div>
        )}

        <div className="game__field">
          {status === 'start' && (
            <GameScreen variant="start" onStart={handleStart} />
          )}

          {status === 'game' && <GameCanvas snake={snake} food={food} />}

          {status === 'gameover' && (
            <GameScreen
              variant="gameover"
              score={score}
              bestScore={bestScore}
              onRestart={handleRestart}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Game
