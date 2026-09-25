import { useState } from 'react'
import './CalcSkeleton.css'

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function CalcSkeleton() {
  const [display, setDisplay] = useState(0)
  const [invalidInput, setInvalidInput] = useState(false)

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

  return (
    <div className="calc-skeleton">
      <div className="calc-display">{display}</div>
      <div className={invalidInput ? 'calc-buttons invalid' : 'calc-buttons'}>
        {DIGITS.map((d) => (
       	<button 
	key={d}
	onClick={() => changeCalcValues(d)}>{d}</button>
        ))}
      </div>
    </div>
  )
}

export default CalcSkeleton
