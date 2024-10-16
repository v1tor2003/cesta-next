import { MdError, MdErrorOutline } from "react-icons/md"

interface InputErrorMessageProps {
  hasError?: boolean
  message?: string
}

export default function InputErrorMessage({hasError, message}: InputErrorMessageProps): JSX.Element {
  if(!hasError) return <></>

  return (
    <div className="flex justify-start space-x-1 rounded-md w-[17rem] bg-red-100 transition-all border-red-600">
      <MdErrorOutline className="text-red-600"/>
      <p className="text-red-600 text-xs">{message}</p>
    </div>
  )
}
