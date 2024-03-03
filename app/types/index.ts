export type NavBarOptionProps = 
{
  label: string,
  url: string
  children?: NavBarOptionProps[]
}

export type NavBarProps = 
{
  options: NavBarOptionProps[]
}

export type NavLinkProps =
{
  label: string,
  url: string,
  isRoot: boolean,
  showChildren: () => void
}