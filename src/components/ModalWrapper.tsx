import React from 'react'
import ReactModal from 'react-modal'
import useModal from '../hooks/useModal'

function ModalWrapper() {
 const {
  modalState: { isOpen, contents },
  handleCloseModal,
 } = useModal()
 return (
  <ReactModal isOpen={isOpen} onRequestClose={handleCloseModal}>
   {contents}
  </ReactModal>
 )
}

export default ModalWrapper
