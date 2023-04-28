import React from 'react'

interface ITextProps {
    content: string | undefined
    style: string
    handleClick?: () => void
}
export const Text = ({
    content,
    style,
    handleClick,
}: ITextProps): JSX.Element => {
    return (
        <label className={`$textLabel ${style}`} onClick={handleClick}>
            {content}
        </label>
    )
}
