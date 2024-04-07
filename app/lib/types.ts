export type NavBarOptionProps = 
{
  icon: React.ReactNode
  label: string
  url: string
  children?: NavBarOptionProps[]
}

export type NavBarProps = 
{
  className?: string
  options: NavBarOptionProps[]
}
