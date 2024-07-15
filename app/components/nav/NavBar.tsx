import { NavBarProps } from "../../lib/types";
import NavBarOption from "./NavBarOption";
import Profile from "../userui/Profile";

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
      <Profile />
    </div>
  )
}
