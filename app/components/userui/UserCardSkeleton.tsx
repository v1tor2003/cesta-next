export default function UserCardSkeleton() {
  return (
    <div className="flex p-2 justify-between shadow-md rounded-md hover:bg-slate-300 bg-slate-200 w-full">
      <div className="flex justify-start space-x-2">
        <span className="flex rounded-full w-16 h-16 text-center text-2xl justify-center items-center bg-slate-400 animate-pulse">
        </span>
        <div className="flex flex-col justify-center space-y-2">
          <span className="h-3 w-16 bg-slate-400 animate-pulse"></span>
          <span className="h-2 w-32 bg-slate-400 animate-pulse"></span>
        </div>
      </div>
    </div>
  )
}
