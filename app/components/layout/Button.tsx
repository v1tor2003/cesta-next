interface ButtonProps{
  className: string
  colors: {
    default: string,
    hover: string
  }
  buttonType: "submit" | "reset" | "button" | undefined
  buttonLabel: string
}
export default function Button({className, colors, buttonType, buttonLabel} : ButtonProps): JSX.Element {
  return (
    <button 
      type={buttonType} 
      
      className={className + ` text-${colors.default} border-${colors.default} hover:border-${colors.default} hover:bg-${colors.default} hover:text-${colors.hover}  transition-colors`}>
        {buttonLabel}
    </button>
  )
}
