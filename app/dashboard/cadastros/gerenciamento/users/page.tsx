export default async function Users() {
  // debugging propurses, should be removed
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  return (
    <div className="pt-10">users</div>
  )
}
