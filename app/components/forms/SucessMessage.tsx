import { MdCheckCircle } from "react-icons/md"

interface SucessMessageProps {
  message: string
}

export default function SucessMessage({message} : SucessMessageProps): JSX.Element {
  return (
    <div className="flex justify-start space-x-1 p-1 rounded-sm w-full bg-green-100 transition-all border-e-green-50">
      <MdCheckCircle className="text-green-600"/>
      <p className="text-green-600 text-sm">{message}</p>
    </div>
  )
}
