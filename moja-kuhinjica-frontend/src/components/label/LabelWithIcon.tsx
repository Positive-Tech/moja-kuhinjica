import React from 'react'
import Image from 'next/image'

interface ILabelWithIconProps {
    src: string
    content: string
    style?: string
}
export const LabelWithIcon = ({
    src,
    content,
    style,
}: ILabelWithIconProps): JSX.Element => {
    return (
        <div className="labelWithIconContainer">
            <Image src={src} alt="" />
            <label className={`labelWithIconContainer__content ${style}`}>
                {content}
            </label>
        </div>
    )
}
