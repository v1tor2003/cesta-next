'use client'
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import LoadingBar from "react-top-loading-bar"

export default function TopLoadingBar() {
  const [progess, setProgress] = useState<number>(20)  
  const url = usePathname()

  useEffect(() => setProgress(100), [url])

  return (
    <div>
      <LoadingBar 
        color="#0663c6"
        progress={progess}
        waitingTime={300}
        onLoaderFinished={() => setProgress(0)}
      />
    </div>  
  )
}

