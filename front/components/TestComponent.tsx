import React from 'react'

interface ColorProps {
  color: string
  handleClick: () => void
}

const TestComponent: React.FC<ColorProps> = ({ color, handleClick }) => {
  return (
    <div style={{ color }} onClick={handleClick}>
      React HOCの練習だよ
    </div>
  )
}
export default TestComponent