import BreadCrumb from "@/app/components/BreadCrumb"
import { getUsers } from "./actions"
import UsersTable from "@/app/components/UsersTable"

export default async function Users() {
  const data = await getUsers()
  return (
    <section className="flex flex-col space-y-2">
      <BreadCrumb />
      <h1 className="ml-4 font-semibold text-2xl text-accb-green">Tabela de Usuários</h1>
      <UsersTable containerStyle="ml-4" data={data}/>
    </section>
  )
}
