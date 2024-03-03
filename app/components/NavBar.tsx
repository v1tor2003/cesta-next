import { NavBarProps } from "../types";
import NavBarOption from "./NavBarOption";

export default function NavBar({options}: NavBarProps) {
  return (
    <div>
      {options && options.map((option, key) => 
        <NavBarOption {...option} key={`parent${option.label}-${key}`}/>
      )}
    </div>
  )
}
