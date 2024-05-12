"use client"
import { Disclosure, Transition } from "@headlessui/react";
import { NavBarOptionProps } from "../lib/types";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

const NavLink = ({icon, url, label, children}: NavBarOptionProps) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center w-full space-x-2 rounded-md py-2 px-3 text-left text-sm hover:bg-gray-100">
            <div className="text-accb-green">{icon}</div>
            {children && children.length > 0 ? (
              <span className="grow text-accb-green font-medium text-xl">{label}</span>
              ) : (
              <Link href={url} legacyBehavior>
                <span className="grow text-accb-green font-medium text-xl">{label}</span>
              </Link>
            )}
            {children && children.length > 0 && <FaChevronDown className={`w-4 h-auto transform ${open ? 'rotate-180' : 'rotate-0'}`} />}
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
              
                <div className="ml-4">
                  {children && children.map((child, key) =>
                    <NavLink
                      icon={child.icon}
                      label={child.label}
                      url={`${url}${child.url}`}
                      children={child.children}
                      key={`child-${child.label}-${key}`} />)
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
  return (
    <div className="md:mx-4 md:px-2 mt-2 px-8">
      <NavLink 
        icon={icon}
        label={label}
        url={url}
        children={children}
      />      
    </div>
  )
}
