import { tabela_usuarios } from "@prisma/client"

export type NavBarOptionProps = 
{
  icon?: React.ReactNode 
  label: string
  url: string
  children?: NavBarOptionProps[]
}

export type NavBarProps = 
{
  options: NavBarOptionProps[]
  isNavOpen: boolean
  isMobile: boolean
}

export interface HeaderProps 
{
  isNavOpen: boolean
  showToggle: boolean
  toggleNav: () => void
}

export interface FormButtonProps 
{
  pending: boolean
  buttonLabel: string
  className: string | undefined
}

export type User = Omit<tabela_usuarios, "usuario_senha">

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
}