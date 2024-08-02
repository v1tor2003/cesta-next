'use client'
import { useRouter } from "next/navigation"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"

interface PaginationProps {
  currPage: number
  totalPages: number
}

export default function Pagination({currPage, totalPages} : PaginationProps): JSX.Element {
  const router = useRouter()
  const previousPage: number = currPage - 1 > 0 ? currPage - 1 : 1
  const nextPage: number = currPage + 1 <= totalPages ? currPage + 1 : currPage
  const outOfRange: boolean = currPage > totalPages

  const offset: number = 3
  
  let numbers: number[] = []
  for(let i = currPage - offset; i <= currPage + offset; i++)
    if(i >= 1 && i < totalPages)
      numbers.push(i)

  const handlePageChange = (url: string): void => {
    if(!outOfRange) router.push(url)
  }

  return (
    <div className="flex justify-center items-center mt-16">
      <div className="flex border-[1px] rounded-sm broder-accb-green p-4">
        <ul className="flex flex-row space-x-1">
          {currPage === 1 ? (
            <li className="opacity-60" aria-disabled={true}>
             <FaChevronLeft />
            </li>
          ) : (
            <li className="cursor-pointer" onClick={() => handlePageChange(`?page=${previousPage}`)}>
             <FaChevronLeft />
            </li>
          )}

          {numbers.map(pageNumber => 
            <li 
              key={pageNumber}
              className={
                currPage === pageNumber ?
                "bg-accb-green fw-bold px-2 rounded-md text-white" :
                "hover:bg-accb-green px-1 rounded-md"
              }
              onClick={() => handlePageChange(`?page=${pageNumber}`)}
            >
              {pageNumber}
            </li>
          )}

          {currPage === totalPages ? (
            <li className="opacity-60" aria-disabled={true}>
              <FaChevronRight />
            </li>
          ) : (
            <li className="cursor-pointer" onClick={() => handlePageChange(`?page=${nextPage}`)}>
              <FaChevronRight />
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
