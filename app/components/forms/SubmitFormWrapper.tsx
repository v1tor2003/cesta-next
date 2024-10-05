'use client'
import { useFormStatus } from "react-dom"
import { Oval } from "react-loader-spinner"

interface SubmitFormProps {
  children: React.ReactNode
  className?: string
  submiting?: boolean
}

export default function SubmitFormWrapper({submiting, children}: SubmitFormProps) {  
  const { pending } = useFormStatus()
  
  return pending || submiting ? 
    (<div className="w-full flex items-center justify-center p-2 rounded-md border border-accb-green">
      <Oval 
        color="#142527"
        width={24}
        height={24}
      />
    </div>) 
    : (<>{children}</>)
}
