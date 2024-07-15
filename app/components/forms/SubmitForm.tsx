import { FormButtonProps } from "../../lib/types"

export default function SubmitForm({pending,buttonLabel, className}: FormButtonProps) {  
  return (
    <button type="submit" aria-disabled={pending} className={className + ' ' + `${pending ? 'bg-gray-400' : ''}`}>{buttonLabel}</button>
  )
}
