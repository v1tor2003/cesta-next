'use client'
import { useState } from "react"
import { 
  AccessorKeyColumnDef,  
  AccessorFnColumnDef,
  getCoreRowModel,
  flexRender,
  useReactTable
} from "@tanstack/react-table"

interface TableProps<T, K> {
  defaultData: T[]
  columns: (
    AccessorFnColumnDef<T, K> 
    | AccessorKeyColumnDef<T, K>
  )[]
}

export default function Table <T, K>({defaultData, columns}: TableProps<T, K>): JSX.Element {
  const [data, _setData] = useState(() => [...defaultData])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <table className="table-auto w-2/3 border-collapse">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className="bg-gray-200">
            {headerGroup.headers.map(header => (
              <th key={header.id} className="border px-4 py-2 text-left">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className="odd:bg-white even:bg-gray-100">
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="border px-4 py-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

  )
}

