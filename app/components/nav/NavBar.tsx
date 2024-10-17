import NavBarOption from "./NavBarOption";

export interface NavBarOptionProps {
  icon?: React.ReactNode 
  label: string
  url: string
  children?: NavBarOptionProps[]
}

interface NavBarProps {
  options: NavBarOptionProps[]
}

export default function NavBar({ options }: NavBarProps) { 

  return (
    <nav className='w-full h-full space-y-2 pt-6 transition-all duration-300 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-accb-green scrollbar-track-gray-300'>
      {options && options.map((option, key) => 
        <NavBarOption {...option} 
          key={`parent${option.label}-${key}`}/>
      )}
    </nav>
  )
}
