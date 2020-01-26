import React from 'react'

interface ColorProps {
  color: string
}


const WithWrapper = <P extends ColorProps>(Component: React.ComponentType<P>) => {
  return (props: Omit<P, keyof ColorProps>) => {
    const handleClick = () => {
    }
    return (
      <div>
        <Component {...props as P} color="red" handleClick={handleClick}></Component>
      </div>
    )
  }
}

export default WithWrapper
