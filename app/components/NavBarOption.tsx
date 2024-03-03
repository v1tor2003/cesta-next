"use client"
import { useState } from "react";
import { NavBarOptionProps } from "../types";
import { NavLinkProps } from "../types";
import Link from "next/link";

const NavLink = ({url, label, showChildren, isRoot}: NavLinkProps) => {
  if(isRoot) return <Link href={url}>{label}</Link>
  return <span onClick={showChildren}>{label}</span>
}

export default function NavBarOption( {label, url, children}: NavBarOptionProps) {
  const [isVisible, setIsVisible] = useState<boolean>()

  const expand = () => { setIsVisible(!isVisible) }
  
  return (
    <div className="pl-2">
      <NavLink 
        label={label}
        url={url}
        isRoot={(children?.length === 0)}
        showChildren={expand}
      />
      {isVisible ? (children && children.map((child, key) => 
        <NavBarOption 
        label={child.label} 
        url={`${url}${child.url}`}
        children={child.children}
        key={`child-${child.label}-${key}`}/>)) 
        : (<></>)
      }
    </div>
  )
}
