import NavBarOption from "./NavBarOption";
import RenderProfile from "../userui/RenderProfile";

export interface NavBarOptionProps {
  icon?: React.ReactNode 
  label: string
  url: string
  children?: NavBarOptionProps[]
}

interface NavBarProps {
  options: NavBarOptionProps[]
  isNavOpen: boolean
  isMobile: boolean
}

export default function NavBar({options, isNavOpen, isMobile}: NavBarProps) { 
  let navVisibilityClass: string = ''
  if (isMobile) navVisibilityClass = isNavOpen ? 'block' : 'hidden';
  
  return (
    <div className={`${navVisibilityClass} shadow w-full md:w-80 flex flex-col justify-between space-y-8`}>
      <nav className={`pt-6 md:pt-10 transition-all duration-300 flex flex-col overflow-x-auto scrollbar-thin scrollbar-thumb-accb-green scrollbar-track-gray-300`}>
        {options && options.map((option, key) => 
          <NavBarOption {...option} 
          key={`parent${option.label}-${key}`}/>
        )}
      </nav>
      <RenderProfile />
    </div>
  )
}
