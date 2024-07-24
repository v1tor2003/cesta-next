import React, { ForwardedRef, forwardRef } from 'react'
interface ButtonProps 
extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  buttonlabel: string
}

function FButton(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { buttonlabel, type } = props
  
  return (
    <button 
      type={type}
      ref={ref}
      {...props}
    >
      {buttonlabel}
    </button>
  )
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(FButton)

Button.displayName = "button"

export default Button