import React from 'react'
import { TitleLabelStyled } from './style'

const TitleLabel = (props: any) => {
    return (
        <TitleLabelStyled size={props.size}>{props.content}</TitleLabelStyled>
    )
}

export default TitleLabel
