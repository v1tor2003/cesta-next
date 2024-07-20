import { MdError } from "react-icons/md"

interface InputErrorMessageProps {
  hasError?: boolean
  message?: string
}

export default function InputErrorMessage({hasError, message}: InputErrorMessageProps): JSX.Element {
  console.log(hasError)
  if(!hasError) return <></>

  return (
    <div className="flex justify-start space-x-1 p-1 rounded-sm w-full bg-red-100 transition-all border-e-red-50">
      <MdError className="text-red-600"/>
      <p className="text-red-600 text-xs">{message}</p>
    </div>
  )
}
