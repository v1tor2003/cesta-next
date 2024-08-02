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
        visible={true}
        height="24"
        width="24"
        secondaryColor="white"
        strokeWidth={3}
        strokeWidthSecondary={3}
        color="#142527"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>) 
    : (<>{children}</>)
}
