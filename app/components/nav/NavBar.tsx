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
    <nav className='w-full justify-between space-y-4 pt-6 transition-all duration-300 flex flex-col overflow-x-auto scrollbar-thin scrollbar-thumb-accb-green scrollbar-track-gray-300'>
      {options && options.map((option, key) => 
        <NavBarOption {...option} 
          key={`parent${option.label}-${key}`}/>
      )}
    </nav>
  )
}
