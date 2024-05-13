import Image from "next/image";
import accbLogoWhite from '@/public/accbLogoWhite.png'

export default async function Home() {
  return (
    <div className="transition-all duration-300 flex flex-col md:flex-row items-center justify-center md:justify-start sm:pt-4 md:pl-8 xl:pl-16 bg-accb-texture-dark w-full h-full bg-cover bg-center text-white  space-y-4 md:space-y-0 md:space-x-8 overflow-x-hidden">
      <Image  
        src={accbLogoWhite} 
        alt="White logo for ACCB"
        className="w-64 h-auto"  
      />
      <div className="flex flex-col px-4 md:px-0 text-center w-full md:text-left md:w-2/4 xl:w-2/6 space-y-4">
        <h1 className="capitalize text-4xl font-extrabold">
          Bem-vindo ao gerenciador de dados da cesta básica.
        </h1>
        <h3 className="font-semibold">Gerencie, analize e acompanhe o desenvolvimento do projeto. </h3>
      </div>
    </div>
  )
}
