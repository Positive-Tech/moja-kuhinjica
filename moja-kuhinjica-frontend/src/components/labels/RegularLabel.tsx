import React from 'react'
import { RegularLabelStyled } from './style'

const RegularLabel = (props: any) => {
    return (
        <RegularLabelStyled size={props.size}>
            {props.content}
        </RegularLabelStyled>
    )
}

export default RegularLabel
