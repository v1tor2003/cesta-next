import { IoIosCreate } from "react-icons/io";

export const navbarOptions = [
  {
    icon: <IoIosCreate />,
    label: 'Cadastros',
    url: '#',
    children: [
      {
        icon: null,
        label: 'Gerenciamento',
        url: '#',
        children: [
          {
            icon: null,
            label: 'Usuário',
            url: '#',
            children: []
          },
          {
            icon: null,
            label: 'Membros da Equipe',
            url: '#',
            children: []
          },
          {
            icon: null,
            label: 'Salários',
            url: '#',
            children: []
          },
          {
            icon: null,
            label: 'Cesta Básica Oficial',
            url: '#',
            children: []
          }
        ]
      },
      {
        icon: null,
        label: 'Estabelecimentos',
        url: '#',
        children: [
          {
            icon: null,
            label: 'Cidade',
            url: '#',
            children: []
          },
          {
            icon: null,
            label: 'Bairro',
            url: '#',
            children: []
          },
          {
            icon: null,
            label: 'Cadastrar',
            url: '#',
            children: []
          }
        ]
      },
      {
        icon: null,
        label: 'Produtos',
        url: '#',
        children: [
          {
            icon: null,
            label: 'Unidade de Medida',
            url: '#',
            children: []
          },
          {
            icon: null,
            label: 'Tipo',
            url: '#',
            children: []
          },
          {
            icon: null,
            label: 'Cadastrar',
            url: '#',
            children: []
          },
          {
            icon: null,
            label: 'Outros',
            url: '#',
            children: []
          }
        ]
      },
    ]
  },
  {
    icon: <IoIosCreate />,
    label: 'Opcao',
    url: '#',
    children: []
  }
]