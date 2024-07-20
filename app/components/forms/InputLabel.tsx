interface InputLabelProps {
  label: string
}

export default function InputLabel({label}: InputLabelProps): JSX.Element {
  return (
    <label 
      htmlFor={label.toLocaleLowerCase()} 
      className="block mb-2 text-sm font-medium text-gray-700 capitalize">
        {label}:
    </label>
  )
}
