import BreadCrumb from "@/app/components/layout/BreadCrumb"
import UserList from "@/app/components/userui/UserList"
import { Suspense } from "react"
import UserListSkeleton from "@/app/components/userui/UserListSkeleton"

export default async function Users({
  searchParams,
}: {
  searchParams?: {
    query?: string,
    page?: string,
  },
}) {
  const usersPerPage = 5

  return (
    <section className="flex flex-col space-y-2">
      <BreadCrumb />
      <h1 className="ml-4 font-semibold text-2xl text-accb-green">Usuários:</h1>
      <Suspense fallback={<UserListSkeleton size={usersPerPage}/>}>
        <UserList searchParams={searchParams} usersPerPage={usersPerPage}/>
      </Suspense>
    </section>
  )
}
