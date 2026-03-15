import { useEffect, useRef } from "react";
import { CELL, COLS, ROWS, WIDTH, HEIGHT } from "../utils/constants";
import '../styles/components/game-canvas.css'

const GameCanvas = (props) => {
  const ref = useRef(null)

  const { snake, food } = props

  const rootStyles = getComputedStyle(document.documentElement);

  const snakeColors = [
    rootStyles.getPropertyValue("--game-color-1").trim(),
    rootStyles.getPropertyValue("--game-color-2").trim(),
    rootStyles.getPropertyValue("--game-color-3").trim(),
    rootStyles.getPropertyValue("--game-color-4").trim(),
    rootStyles.getPropertyValue("--game-color-5").trim(),
  ];

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    canvas.width = WIDTH
    canvas.height = HEIGHT

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    drawBackground(ctx)
    drawGrid(ctx)
    drawSnake(ctx)
    drawFood(ctx)

  }, [snake, food])

  const drawBackground = (ctx) => {
    ctx.fillStyle = "#26282B"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
  }
  const drawGrid = (ctx) => {
    ctx.strokeStyle = "#333"

    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        ctx.strokeRect(
          x * CELL,
          y * CELL,
          CELL,
          CELL
        )
      }
    }
  }

  const drawSnake = (ctx) => {
    if (!snake) return
    snake.forEach((segment, index) => {
      ctx.fillStyle = snakeColors[index % snakeColors.length]
      ctx.fillRect(
        segment.x * CELL,
        segment.y * CELL,
        CELL,
        CELL,
      )
    })
  }

  const drawFood = (ctx) => {
    ctx.save()
    ctx.shadowColor = "#ff7fb6"
    ctx.shadowBlur = 10

    ctx.fillStyle = "#ff7fb6"
    ctx.fillRect(
      food.x * CELL,
      food.y * CELL,
      CELL,
      CELL
    );

    ctx.restore()
  }

  return (
    <div className="game-canvas-frame">
      <canvas className="game-canvas" ref={ref}></canvas>
    </div>
  )
}

export default GameCanvas