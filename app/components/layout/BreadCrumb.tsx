'use client'
import { usePathname } from "next/navigation"

export default function BreadCrumb() {
  const path: string = usePathname()
  const segments: string [] = path.split('/').filter(s => s)

  return (
    <nav aria-label="breadcrumb" className="p-4">
      <ol className="flex text-gray-600">
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1

          return (
            <li key={segment} className={`flex capitalize items-center ${isLast ? 'font-semibold text-accb-green' : ''}`}>
                {segment}
              {!isLast && <span className="mx-2">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
