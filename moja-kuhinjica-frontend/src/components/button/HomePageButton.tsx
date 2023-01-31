import React from 'react'
import styles from './HomePageButton.module.scss'

interface IHeaderButtonProps {
    content: string
    setShowModal: (param: boolean) => void
}
export const HomePageButton = ({
    content,
    setShowModal,
}: IHeaderButtonProps) => {
    return (
        <button className={styles.button} onClick={() => setShowModal(true)}>
            {content}
        </button>
    )
}
