import React from 'react'
import { TitleLabelStyled } from './style'

interface ITitleLabelProps {
    size: string
    content: string
}

const TitleLabel = ({ size, content }: ITitleLabelProps) => {
    return <TitleLabelStyled size={size}>{content}</TitleLabelStyled>
}

export default TitleLabel
