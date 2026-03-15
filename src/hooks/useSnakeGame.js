import { useEffect, useReducer } from "react";
import { COLS, ROWS } from "../utils/constants";

const createInitialState = () => ({
  status: "start", // "start" | "game" | "gameover"
  score: 0,
  bestScore: Number(localStorage.getItem("snake-best-score") ?? 0),
  multiplier: 1,
  speed: 120,
  snake: [
    { x: 10, y: 10 }, //голова
    { x: 9, y: 10 },
    { x: 8, y: 10 },
    { x: 7, y: 10 },
  ],
  food: { x: 14, y: 12 },
  dir: { x: 1, y: 0 },
  nextDir: { x: 1, y: 0 },
})

const generateFood = (snake) => {

  let newFood = {
    x: Math.floor(Math.random() * COLS),
    y: Math.floor(Math.random() * ROWS)
  }

  let isOnSnake = snake.some(
    segment => segment.x === newFood.x && segment.y === newFood.y
  )

  while (isOnSnake) {

    newFood = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS)
    }

    isOnSnake = snake.some(
      segment => segment.x === newFood.x && segment.y === newFood.y
    )
  }

  return newFood
}

const getGameOverState = (state) => ({
  ...state,
  status: "gameover",
  bestScore: Math.max(state.bestScore, state.score),
})

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START': {
      const freshState = createInitialState();

      return {
        ...freshState,
        status: "game",
        bestScore: state.bestScore,
      };
    }
    case 'RESTART': {

      const freshState = createInitialState()

      return {
        ...freshState,
        status: "game",
        bestScore: state.bestScore
      }
    }
    case 'TICK': {
      const dir = state.nextDir
      const head = state.snake[0]
      const newHead = {
        x: head.x + dir.x,
        y: head.y + dir.y
      }
      const hitWall =
        newHead.x < 0 ||
        newHead.x >= COLS ||
        newHead.y < 0 ||
        newHead.y >= ROWS

      const isFoodEaten = newHead.x === state.food.x && newHead.y === state.food.y
      let newSnake
      let newFood = state.food
      let newScore = state.score
      let newMultiplier = state.multiplier
      let newSpeed = state.speed

      if (isFoodEaten) {
        newSnake = [newHead, ...state.snake]
        newFood = generateFood(newSnake)
        newScore = state.score + 1

        if (newScore % 3 === 0) {
          newMultiplier = state.multiplier + 1
          newSpeed = Math.max(60, state.speed - 10)
        }
      }
      else {
        newSnake = [newHead, ...state.snake.slice(0, -1)]
      }

      const bodyToCheck = isFoodEaten
        ? state.snake.slice(1)
        : state.snake.slice(1, -1)

      const hitSelf = bodyToCheck.some(segment => segment.x === newHead.x && segment.y === newHead.y)

      const gameOver = hitWall || hitSelf

      if (gameOver) return getGameOverState(state)

      return {
        ...state,
        dir,
        snake: newSnake,
        food: newFood,
        score: newScore,
        multiplier: newMultiplier,
        speed: newSpeed
      }

    }
    case 'CHANGE_DIRECTION': {
      const dir = state.dir
      const newDir = action.dir
      if (dir.x + newDir.x === 0 && dir.y + newDir.y === 0) return state
      return {
        ...state,
        nextDir: newDir
      }
    }
    default: {
      return state
    }
  }
}

const useSnakeGame = () => {
  const [gameState, dispatch] = useReducer(gameReducer, undefined, createInitialState)

  const handleStart = () => {
    dispatch({ type: 'START' })
  }
  const handleRestart = () => {
    dispatch({ type: 'RESTART' })
  }
  const handleKeyDown = (event) => {
    const { key } = event
    let newDir
    switch (key) {
      case 'ArrowUp': {
        newDir = {x:0, y:-1}
        break
      }
      case 'ArrowDown': {
        newDir = {x:0, y:1}
        break
      }
      case 'ArrowRight': {
        newDir = {x:1, y:0}
        break
      }
      case 'ArrowLeft': {
        newDir = {x:-1, y:0}
        break
      }
      default: {
        return
      }
    }
    dispatch({ type: 'CHANGE_DIRECTION', dir: newDir})
  }


  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, []);

  useEffect(() => {
    if (gameState.status !== 'game') return

    const interval = setInterval(() => {
      dispatch({type: 'TICK'})
    }, gameState.speed)

    return () => clearInterval(interval)

  }, [gameState.status, gameState.speed]);

  useEffect(() => {
    localStorage.setItem("snake-best-score", gameState.bestScore)
  }, [gameState.bestScore])

  return {
    gameState,
    handleStart,
    handleRestart,
  }
}



export default useSnakeGame