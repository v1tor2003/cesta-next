import Link from "next/link";

export default function LoginAccountLink() {
  return (
    <div className="text-sm font-light text-accb-green">
      Já possui conta?
      <Link 
        href="/auth/login" 
        className="font-medium text-blue-500 hover:underline"> Entrar
      </Link>
    </div>
  )
}
