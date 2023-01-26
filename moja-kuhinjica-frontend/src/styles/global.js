import styled from 'styled-components'

export const theme = {
    colors: {
        header: 'rgba(30, 30, 30, 0.3)',
        primaryRed: '#C10016',
        secondaryRed: '#C63A2F',
        placeholder: 'rgba(30, 30, 30, .4)',
        background: '#F3F1F0',
        grey: '#333333',
        disabledGrey: '#28272033',
        footer: '#171717',
    },
    fonts: {
        button: 'Nunito',
    },
}

export const breakpoints = {
    ultrawide: 4096,
    breakpoint1440p: 2560,
    breakpoint1080p: 1920,
    breakpoint900p: 1440,
    breakpoint720p: 1280,
    large: 1024,
    medium: 768,
    small: 600,
    smallest: 350,
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
    row-gap: 15px;
    column-gap: 70px;
    padding-top: 5%;
    padding-bottom: 5%;
    justify-items: center;
`
