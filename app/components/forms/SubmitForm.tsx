interface SubmitFormProps {
  children: React.ReactNode
  className?: string
  pending: boolean
}

export default function SubmitForm({children}: SubmitFormProps) {  
  return (
    <>{children}</>
  )
}
