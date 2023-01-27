import React from 'react'
import Modal from 'react-modal'
import { bgModal } from '../../constants/constants'

export const LoginModal = (props: any) => {
    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal(false)}
            style={bgModal}
        ></Modal>
    )
}
