'use client'
import accbLogo from '@/public/accbLogo.png';
import Image from "next/image";
import RegisterForm from './RegisterForm';

export default function SignUpPage() {
  return (
    <section className="flex justify-center items-center bg-accb-green w-dvh h-lvh">
    <div className="flex flex-col items-center justify-center w-screen h-screen xs:w-80 xs:h-[37rem] transition-all xs:transition-all rounded-md bg-gray-100 ">
      <div className="flex flex-col items-center justify-center mb-4">
        <Image src={accbLogo} alt="Logo for ACCB" className="w-48 h-auto mb-4"/>
        <span className="text-accb-green font-semibold mb-4">Crie sua conta</span>
        <p className="text-center text-sm w-64 font-light">
          Informe seus dados para a criação de uma nova conta.
        </p>
      </div>
      <RegisterForm/>
      </div>
  </section>
  )
}
