import Pagination from "../layout/Pagination"
import UserCard from "./UserCard"
import { getUsers } from "@/app/dashboard/cadastros/gerenciamento/usuarios/actions"

interface UserListProps {
  usersPerPage: number
  searchParams?: {
    query?: string,
    page?: string,
  }
}

export default async function UserList({usersPerPage, searchParams}: UserListProps) {
  let currPage = parseInt(searchParams?.page as string, 10)
  currPage = !currPage || currPage < 1 ? 1 : currPage
  
  const { users, totalUsers } = await getUsers(usersPerPage, currPage)
  const totalPages = Math.ceil(totalUsers / usersPerPage)

  if(!users) return <div> Sem usuarios </div>
  
  return (
    <div className="p-4 w-full lg:w-2/3 xl:w-2/4 ">
      <ul className="space-y-2">
        {users.map(user => <li key={user.usuario_id}><UserCard key={user.usuario_id} userInfo={user}/></li> )}
      </ul>
      <Pagination 
        currPage={currPage} 
        totalPages={totalPages}
      />
    </div>
  )
}
