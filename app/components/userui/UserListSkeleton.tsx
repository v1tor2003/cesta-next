import UserCardSkeleton from "./UserCardSkeleton"

interface UserListSkeletonProps {
  size?: number
}

export default function UserListSkeleton({ size = 4 } : UserListSkeletonProps) {
  //const list: number [] = Array(size)
  const list: Readonly<React.ReactNode[]> = Array(size).fill(<UserCardSkeleton/>)
  
  return (
    <div className="p-4 w-full lg:w-2/3 xl:w-2/4 ">
      <ul className="space-y-2">
        {list.map((card, index) => <li key={index}>{card}</li>)}
      </ul>
    </div>
  )
}
