import styled from 'styled-components'

export const theme = {
    colors: {
        header: 'rgba(114, 95, 82, .2)',
        primaryRed: '#C63A2F',
        secondaryRed: '#9D2218',
        placeholder: 'rgba(30, 30, 30, .4)',
        background: '#F3F1F0',
    },
    fonts: {
        button: 'Nunito',
    },
}

export const ColDiv = styled('div')`
    display: flex;
    flex-direction: column;
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || '100%'};
    ${({ justifyContent }) =>
        justifyContent && `justify-content: ${justifyContent};`}
    ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
`
export const RowDiv = styled('div')`
    display: flex;
    flex-direction: row;
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || '100%'};
    ${({ justifyContent }) =>
        justifyContent && `justify-content: ${justifyContent};`}
    ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
`
export const GridDiv = styled('div')`
    display: grid;
    grid-template-columns: repeat(3, 1fr [col-start]);
    row-gap: 20px;
    padding-top: 5%;
    padding-bottom: 5%;
    justify-items: center;
`
