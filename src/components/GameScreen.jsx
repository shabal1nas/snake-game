import { Button, Stat } from './index';
import '../styles/components/game-screen.css'

const GameScreen = (props) => {
  const {
    onStart,
    onRestart,
    variant,
    score,
    bestScore
  } = props

  switch (variant) {
    case 'start':
      return (
        <div className="game-screen game-screen--start">
          <Button
            className="game-screen__button"
            onClick={onStart}
          >
            Start
          </Button>
        </div>
      )

    case 'gameover':
      return (
        <div className="game-screen game-screen--game-over">
          <Stat
            label="Best Score"
            value={bestScore}
          />
          <span className="game-screen__title" aria-label="Final score title">Final Score</span>
          <div className="game-screen__final" aria-label="Final score value">{score}</div>
          <Button
            className="game-screen__button"
            onClick={onRestart}
            >
            Restart
          </Button>
        </div>
      )

    default:
      return null
  }
}


export default GameScreen