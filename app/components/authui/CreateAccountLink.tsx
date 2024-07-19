import Link from "next/link";

export default function CreateAccountLink() {
  return (
    <div className="text-sm font-light text-accb-green">
      Ainda não tem conta?
      <Link 
        href="/auth/register" 
        className="font-medium text-blue-500 hover:underline"> Registre-se
      </Link>
    </div>
  )
}
