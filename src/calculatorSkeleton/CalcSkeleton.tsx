import { useEffect, useState } from 'react'
import './CalcSkeleton.css'
import { add } from './CalcSkeletonLogic'

const DIGIT_ROWS = [
  [7, 8, 9],
  [4, 5, 6],
  [1, 2, 3],
  [0],
]

type FlashTarget = '+' | '=' | null

const FLASH_MS = 100

function CalcSkeleton() {
  const [display, setDisplay] = useState(0)
  const [invalidInput, setInvalidInput] = useState(false)
  const [storedOperand, setStoredOperand] = useState<number | null>(null)
  const [resultShown, setResultShown] = useState(false)
  const [flashing, setFlashing] = useState<FlashTarget>(null)

  const canClear = display !== 0 || storedOperand !== null

  useEffect(() => {
    if (flashing === null) {
      return
    }
    const timer = setTimeout(() => setFlashing(null), FLASH_MS)
    return () => clearTimeout(timer)
  }, [flashing])

  function changeCalcValues(digit: number): void {
    if (!Number.isInteger(digit) || digit < 0 || digit > 9) {
      setInvalidInput(true)
      return
    }

    setInvalidInput(false)

    if (resultShown) {
      setDisplay(digit)
      setResultShown(false)
      return
    }

    if (display === 0) {
      setDisplay(digit)
    } else {
      setDisplay(display * 10 + digit)
    }
  }

  function pressPlus(): void {
    if (storedOperand !== null || display === 0) {
      setFlashing('+')
      return
    }

    setStoredOperand(display)
    setDisplay(0)
    setResultShown(false)
  }

  function pressEquals(): void {
    if (storedOperand === null || display === 0) {
      setFlashing('=')
      return
    }

    setDisplay(add(storedOperand, display))
    setStoredOperand(null)
    setResultShown(true)
  }

  function clearDisplay(): void {
    setResultShown(false)

    if (display !== 0) {
      setDisplay(0)
    } else if (storedOperand !== null) {
      setDisplay(storedOperand)
    }
  }

  function flashClass(base: string, target: FlashTarget): string {
    return flashing === target ? `${base} flash` : base
  }

  return (
    <div className="calc-skeleton">
      <div className="calc-pending">
        <div className="calc-operand">{storedOperand}</div>
        <div className="calc-operator">{storedOperand !== null ? '+' : ''}</div>
      </div>
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
            {rowIndex === 1 && (
              <button
                className={flashClass('calc-plus', '+')}
                onClick={() => pressPlus()}
              >
                +
              </button>
            )}
            {rowIndex === 2 && (
              <button
                className={flashClass('calc-equals', '=')}
                onClick={() => pressEquals()}
              >
                =
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalcSkeleton
