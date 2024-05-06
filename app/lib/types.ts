export type NavBarOptionProps = 
{
  icon: React.ReactNode
  label: string
  url: string
  children?: NavBarOptionProps[]
}

export type NavBarProps = 
{
  options: NavBarOptionProps[]
  isNavOpen: boolean
}

export interface HeaderProps 
{
  isNavOpen: boolean
  toggleNav: () => void
}

export interface FormButtonProps 
{
  pending: boolean
  buttonLabel: string
  className: string | undefined
}