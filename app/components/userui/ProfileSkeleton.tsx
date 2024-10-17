export default function ProfileSkeleton() {
 return (
    <div className="flex py-2 sm:py-4 justify-center space-x-2 w-full">  
      <span className="flex rounded-full w-12 h-12 justify-center items-center bg-slate-400 animate-pulse">
      </span>
      <div className="flex flex-col justify-center space-y-2">
        <span className="h-3 w-16 bg-slate-400 animate-pulse"></span>
        <span className="h-2 w-32 bg-slate-400 animate-pulse"></span>
      </div>
      <span className="mt-2 h-6 w-6 bg-slate-400 animate-pulse"></span>
    </div>
  )
}
