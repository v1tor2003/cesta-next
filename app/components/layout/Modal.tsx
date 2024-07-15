import { FaXmark } from "react-icons/fa6"

interface ModalProps {
  title: string
  isVisible: boolean
  children: Readonly<React.ReactNode>
  onClose: () => void
}

export default function Modal({title,isVisible, children, onClose}: ModalProps): JSX.Element {
  if(!isVisible) return <></>
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white text-accb-green  p-4 rounded-lg shadow-lg">
        <div className="flex justify-end" onClick={onClose}>
          <FaXmark className="cursor-pointer hover:text-red-700 transition-all" />
        </div>
        <h2 className="text-2xl capitalize font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  )
}
