import React, { useState, useRef, useEffect } from 'react'

const Grid = ({ size }) => {
  const [grid, setGrid] = useState(() =>
    Array.from({ length: size }, () => new Array(size).fill(false))
  )

  const [running, setRunning] = useState(false)
  const cellRef = useRef([])

  function clickHandler(row, col) {
    if (running) return

    if (
      cellRef.current.find(
        (item) => item.row === row && item.col === col
      )
    ) {
      return
    }

    cellRef.current.push({ row, col })

    setGrid((prev) => {
      const newGrid = prev.map((row) => [...row])
      newGrid[row][col] = true
      return newGrid
    })

    // All cells clicked
    if (cellRef.current.length === size * size) {
      setRunning(true)
    }
  }

  useEffect(() => {
    if (!running) return

    const interval = setInterval(() => {
      const cell = cellRef.current.shift()

      if (!cell) {
        clearInterval(interval)
        setRunning(false)
        return
      }

      setGrid((prev) => {
        const newGrid = prev.map((row) => [...row])
        newGrid[cell.row][cell.col] = false
        return newGrid
      })
    }, 500)

    return () => clearInterval(interval)
  }, [running])

  return (
    <div
      className="Grid"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            disabled={running}
            onClick={() => clickHandler(rowIndex, colIndex)}
            className={`cell ${cell ? 'active' : ''}`}
          />
        ))
      )}
    </div>
  )
}

export default Grid