import { NavBarProps } from "../lib/types";
import NavBarOption from "./NavBarOption";

export default function NavBar({options, className}: NavBarProps) { 
  return (
    <nav className={className}>
      {options && options.map((option, key) => 
        <NavBarOption {...option} 
        key={`parent${option.label}-${key}`}/>
      )}
    </nav> 
  )
}
