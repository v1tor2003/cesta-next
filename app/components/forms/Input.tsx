interface InputProps {
  icon?: React.ReactNode
  children: Readonly<React.ReactNode>
}

export default function Input({icon, children}: InputProps) {
  return (
    <div className="flex items-center border bg-gray-300 border-gray-300 rounded-lg overflow-hidden shadow-sm">
      {icon && <span className="px-2">{icon}</span>}
      {children}
    </div>
  )
}

