'use client'
import { FaPen, FaTrash } from "react-icons/fa6";
import { User } from "../../lib/types";
import Modal from "../layout/Modal";
import { useEffect, useState } from "react";
import EditUserForm from "../forms/EditUserForm";

interface UserCardProps {
  userInfo: User
}

export default function UserCard({userInfo}: UserCardProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    if (isVisible) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
    
    return () => document.body.classList.remove('no-scroll');
  }, [isVisible]);

  return (
    <>
      <Modal title="Editar Usuário" isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <EditUserForm defaultData={userInfo}/>
      </Modal>
      <div className="flex p-2 justify-between shadow-md rounded-md hover:bg-slate-300 bg-slate-200 w-full">
        <div className="flex justify-start space-x-2">
          <span className="flex rounded-full w-16 h-16 text-center text-2xl justify-center items-center bg-accb-green text-white capitalize">
          {userInfo.usuario_nome.charAt(0)}
          </span>
          <div className="flex flex-col justify-center">
            <span className="capitalize text-accb-green font-semibold"> {userInfo.usuario_nome} </span>
            <span className="lowercase text-accb-green font-medium"> {userInfo.usuario_email} </span>
          </div>
        </div>
        <div className="flex cursor-pointer items-center space-x-2">
          <div onClick={() => setIsVisible(true)} className="text-accb-green hover:text-cyan-600 transition-all"><FaPen /></div>
          <div className="text-accb-green hover:text-red-600 transition-all"><FaTrash /></div>
        </div>
      </div>
    </>
  )
}
