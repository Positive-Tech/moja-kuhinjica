import styled from 'styled-components'

export const theme = {
    colors: {
        header: 'rgba(114, 95, 82, .2)',
        primaryRed: '#C63A2F',
        secondaryRed: '#9D2218',
        placeholder: 'rgba(30, 30, 30, .4)',
    },
    fonts: {
        button: 'Nunito',
    },
}

export const ColDiv = styled('div')`
    display: flex;
    flex-direction: column;
    position: relative;
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : '100%')};
    ${({ justifyContent }) =>
        justifyContent && `justify-content: ${justifyContent};`}
    ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
`
