import { NavBarProps } from "../lib/types";
import NavBarOption from "./NavBarOption";

export default function NavBar({options}: NavBarProps) { 
  return (
    <nav className="mt-2 px-2">
      {options && options.map((option, key) => 
        <NavBarOption {...option} 
        key={`parent${option.label}-${key}`}/>
      )}
    </nav> 
  )
}
