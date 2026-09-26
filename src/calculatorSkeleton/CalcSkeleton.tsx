import { useState } from 'react'
import './CalcSkeleton.css'

const DIGIT_ROWS = [
  [7, 8, 9],
  [4, 5, 6],
  [1, 2, 3],
  [0],
]

function CalcSkeleton() {
  const [display, setDisplay] = useState(0)
  const [invalidInput, setInvalidInput] = useState(false)

  const canClear = display !== 0

  function changeCalcValues(digit: number): void {
    if (!Number.isInteger(digit) || digit < 0 || digit > 9) {
      setInvalidInput(true)
      return
    }

    setInvalidInput(false)

    if (display === 0) {
      setDisplay(digit)
    } else {
      setDisplay(display * 10 + digit)
    }
  }

  function clearDisplay(): void {
    setDisplay(0)
  }

  return (
    <div className="calc-skeleton">
      <div className="calc-display">{display}</div>
      <div className={invalidInput ? 'calc-buttons invalid' : 'calc-buttons'}>
        {DIGIT_ROWS.map((row, rowIndex) => (
          <div className="calc-row" key={rowIndex}>
            {row.map((d) => (
              <button
                key={d}
                className={d === 0 ? 'calc-zero' : undefined}
                onClick={() => changeCalcValues(d)}
              >
                {d}
              </button>
            ))}
            {rowIndex === 0 && (
              <button
                className={canClear ? 'calc-clear can-clear' : 'calc-clear'}
                onClick={()=>clearDisplay()}
              >
                C
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalcSkeleton
