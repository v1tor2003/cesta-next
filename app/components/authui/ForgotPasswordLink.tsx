import Link from "next/link";

export default function ForgotPasswordLink() {
  return (
    <div className="flex justify-between">            
      <Link 
        href="#" 
        className="text-sm font-medium text-blue-500 hover:underline">
          Esqueceu a senha?
      </Link>
    </div>
  )
}

