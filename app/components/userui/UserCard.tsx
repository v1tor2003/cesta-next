'use client'
import { FaPen, FaTrash, FaXmark } from "react-icons/fa6";
import { User } from "../../lib/types";
import Modal from "../layout/Modal";
import { useState } from "react";

interface UserCardProps {
  userInfo: User
}

export default function UserCard({userInfo}: UserCardProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const openModal = () => setIsVisible(true)
  const closeModal = () => setIsVisible(false)

  return (
    <>
      <Modal title="Editar Usuário" isVisible={isVisible} onClose={closeModal}>
        <p className="mb-4">user id is: {userInfo.usuario_id}</p>
      </Modal>
      <div className="flex p-2 justify-between shadow-md rounded-md bg-slate-200 w-full">
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
          <div onClick={openModal} className="text-accb-green hover:text-cyan-600 transition-all"><FaPen /></div>
          <div className="text-accb-green hover:text-red-600 transition-all"><FaTrash /></div>
        </div>
      </div>
    </>
  )
}
