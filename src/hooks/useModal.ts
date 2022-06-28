import { useAtom } from 'jotai'
import React from 'react'
import { modalAtom } from '../atoms'

export default function useModal() {
 const [modalState, setModalState] = useAtom(modalAtom)

 const handleOpenModal = (contents: React.ReactNode) => {
  setModalState({ isOpen: true, contents })
 }

 const handleCloseModal = () => {
  setModalState({ isOpen: false, contents: null })
 }

 return {
  modalState,
  handleOpenModal,
  handleCloseModal,
 }
}
