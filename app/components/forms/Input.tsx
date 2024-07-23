import React, { ForwardedRef, forwardRef } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

function FInput(props: InputProps, ref: ForwardedRef<HTMLInputElement>){
  const { icon, type } = props

  return (
    <div className="flex items-center border bg-gray-300 border-gray-300 rounded-lg overflow-hidden shadow-sm">
      {icon && <span className="px-2">{icon}</span>}
      <input 
        type={type}
        ref={ref}
        {...props}
      />
    </div>
  )
}

const Input = forwardRef<HTMLInputElement, InputProps>(FInput)

Input.displayName = "Input"

export default Input

