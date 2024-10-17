"use client"
import { Disclosure, Transition } from "@headlessui/react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { NavBarOptionProps } from "./NavBar";
interface NavLinkProps {
  icon: React.ReactNode
  label: string
  url: string
  children?: NavBarOptionProps[]
  isActive: boolean
}
// may fix the children with calling it another name
const NavLink = ({ icon, url, label, children, isActive }: NavLinkProps) => {
  const path = usePathname()

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button 
            className={`${isActive ? 'bg-accb-green hover:opacity-75': 'hover:bg-gray-200'} 
            flex items-center w-full space-x-2 rounded-md py-2 px-3 text-left text-sm `}
          >
            <div className={`${isActive ? 'text-white': 'text-accb-green'} `}>
              {icon}
            </div>
            {children && children.length > 0 ? (
              <span className={`${isActive ? 'text-white': 'text-accb-green'} grow font-medium text-xl`}>
                {label}
              </span>
              ) : (
              <Link 
                href={url} 
                className="w-full"
              >
                <span className={`${isActive ? 'text-white': 'text-accb-green'} grow font-medium text-xl`}>
                  {label}
                </span>
              </Link>
            )}
            {children && children.length > 0 && 
              <FaChevronDown 
                className={`${isActive ? 'text-white': 'text-accb-green'} w-4 h-auto transform ${open ? 'rotate-180' : 'rotate-0'}`} 
              />
            }
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
          <Disclosure.Panel>
            <div 
              className="ml-4"
            >
              {children && children.map((child, key) =>
                <NavLink
                  icon={child.icon}
                  label={child.label}
                  url={`${url}${child.url}`}
                  children={child.children}
                  isActive={path.startsWith(`${url}${child.url}`)}
                  key={`child-${child.label}-${key}`} 
                />
                )
              }
            </div>
          </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}

export default function NavBarOption( { icon, label, url, children}: NavBarOptionProps) {
  const path = usePathname()
  return (
    <div className="md:mx-4 md:px-2 px-8">
      <NavLink 
        icon={icon}
        label={label}
        url={url}
        children={children}
        isActive={path.startsWith(url)}
      />      
    </div>
  )
}
