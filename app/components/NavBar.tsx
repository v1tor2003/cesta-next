import { NavBarProps } from "../lib/types";
import NavBarOption from "./NavBarOption";
import Profile from "./Profile";

export default function NavBar({options, isNavOpen}: NavBarProps) { 
  return (
    <div className={`${isNavOpen ? 'block w-full' : 'hidden'}
    flex flex-col justify-between space-y-8`}>
      <nav className={`transition-all duration-300 flex flex-col md:w-64`}>
        {options && options.map((option, key) => 
          <NavBarOption {...option} 
          key={`parent${option.label}-${key}`}/>
        )}
      </nav> 
      <Profile />
    </div>
  )
}
