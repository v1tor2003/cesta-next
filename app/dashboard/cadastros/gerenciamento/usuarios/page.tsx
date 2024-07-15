import BreadCrumb from "@/app/components/BreadCrumb"
import { getUsers } from "./actions"
import UserCard from "@/app/components/UserCard"

export default async function Users() {
  const users = await getUsers()
  return (
    <section className="flex flex-col space-y-2">
      <BreadCrumb />
      <h1 className="ml-4 font-semibold text-2xl text-accb-green">Usuários:</h1>
      {/*<UsersTable containerStyle="ml-4" users={users}/>*/}
      <div className="p-4 space-y-2 w-full lg:w-2/3 xl:w-2/4 ">
        {users && users.map(user => <UserCard userInfo={user}/>)}
      </div>
    </section>
  )
}
