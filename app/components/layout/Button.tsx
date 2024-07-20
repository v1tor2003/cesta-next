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
  const style = className + ` text-${colors.hover} bg-${colors.default} border-${colors.default} hover:text-${colors.default} hover:border-${colors.default} hover:bg-${colors.hover} transition-colors`
  
  return (
    <button 
      type={buttonType} 
      className={style}>
        {buttonLabel}
    </button>
  )
}
