import { NavBarProps } from "../lib/types";
import NavBarOption from "./NavBarOption";

export default function NavBar({options, isNavOpen}: NavBarProps) { 
  return (
    <nav className={`transition-all duration-300 ${isNavOpen ? 'block w-full' : 'hidden'} flex flex-col md:w-64`}>
      {options && options.map((option, key) => 
        <NavBarOption {...option} 
        key={`parent${option.label}-${key}`}/>
      )}
    </nav> 
  )
}
