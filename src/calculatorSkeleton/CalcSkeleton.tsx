import { useState } from 'react'
import './CalcSkeleton.css'

function CalcSkeleton() {
  const [display] = useState(0)

  return (
    <div className="calc-skeleton">
	<div className="calc-display">{display}</div>
    </div>
  )
}

export default CalcSkeleton
