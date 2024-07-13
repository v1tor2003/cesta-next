'use client'
import { tabela_usuarios } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "./Table";

export interface User extends tabela_usuarios{}

interface UsersTableProps{
  data: User[]
  containerStyle?: string
}

export default function UsersTableProps({data,containerStyle}: UsersTableProps) {
  const columnHelper = createColumnHelper<User>()
  const columns = [
    columnHelper.accessor(row => 
      row.usuario_id.toString()
    ,{
      id: 'user_id',
      header: 'Id'
    }),
    columnHelper.accessor('usuario_nome', {
      header: 'Nome'
    }),
    columnHelper.accessor('usuario_email', {
      header: 'Email'
    })
  ]

  return (
    <div className={containerStyle}>
      <Table 
        defaultData={data}
        columns={columns} 
      />
    </div>
  )
}
