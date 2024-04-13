import { FaHome } from "react-icons/fa";
import { FaBoxOpen, FaDatabase, FaFileLines, FaGear } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";

const levelOneIconStyle: string = 'w-6 h-auto'

export const navbarOptions = [
  {
    icon: <FaHome className={levelOneIconStyle}/>,
    label: 'Home',
    url: '/dashboard/home',
  },
  {
    icon: <IoCreate className={levelOneIconStyle}/>,
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
    icon: <FaBoxOpen className={levelOneIconStyle} />,
    label: 'Coletas',
    url: '#',
    children: [
      {
        label: 'Pesquisas',
        url: '#',
        children: []
      },
      {
        label: 'Pesquisas Antigas',
        url: '#',
        children: []
      }
    ]
  },
  {
    icon: <FaFileLines className={levelOneIconStyle} />,
    label: 'Boletim',
    url: '#',
    children: [
      {
        label: 'Gerar',
        url: '#',
        children: []
      },
      {
        label: 'Arquivar',
        url: '#',
        children: []
      },
      
    ]
  },
  {
    icon: <FaDatabase className={levelOneIconStyle}/>,
    label: 'Consultas',
    url: '#',
    children: [
      {
        label: 'Tabelas',
        url: '#',
        children: [
          {
            label: 'Por Cidade',
            url: '#',
            children: []
          },
          {
            label: 'Por Produto',
            url: '#',
            children: []
          },
          {
            label: 'Por Data de Referência',
            url: '#',
            children: []
          },
        ]
      },
      {
        label: 'Gráficos',
        url: '#',
        children: [
          {
            label: 'Por Cidade',
            url: '#',
            children: []
          },
          {
            label: 'Por Produto',
            url: '#',
            children: []
          }
        ]      
      },
      {
        label: 'Coletas',
        url: '#',
        children: [
          {
            label: 'Semanal',
            url: '#',
            children: []
          }
        ]
      }
    ]
  }
]