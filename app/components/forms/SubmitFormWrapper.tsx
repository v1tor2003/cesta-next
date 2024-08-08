'use client'
import { useFormStatus } from "react-dom"
import Spinner from "../layout/Spinner"

interface SubmitFormProps {
  children: React.ReactNode
  className?: string
  submiting?: boolean
}

export default function SubmitFormWrapper({submiting, children}: SubmitFormProps) {  
  const { pending } = useFormStatus()
  
  return pending || submiting ? 
    (<div className="w-full flex items-center justify-center p-2 rounded-md border border-accb-green">
      <Spinner 
        size="6"
        color="red-500"
        name="Entrando..."
      />
    </div>) 
    : (<>{children}</>)
}
