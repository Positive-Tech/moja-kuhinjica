import styled from 'styled-components'

export const Wrapper = styled('header')`
    width: 100%;
    height: 140px;
    background: ${(props) => props.theme.colors.header};
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const LogoWrapper = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5%;
`

export const Button = styled('button')`
    width: 194px;
    height: 67px;
    margin-right: 5%;
    border-radius: 40px;
    border: 4px solid ${(props) => props.theme.colors.primaryRed};
    color: white;
    font-size: 22px;
    font-weight: 800;
    font-family: ${(props) => props.theme.fonts.button};
    background: transparent;
    cursor: pointer;

    &:hover {
        background: ${(props) => props.theme.colors.primaryRed};
    }
`

export const TitleLabel = styled('label')`
    font-family: 'Nunito';
    font-weight: 700;
    font-size: 32px;
    color: #ffffff;
    text-shadow: -0.5px 0px 0px black, 0.5px 0px 0px black, 0px -0.5px 0px black,
        0px 0.5px 0px black;
`

export const TitleSpan = styled('span')`
    font-family: 'Londrina Solid';
    font-weight: 900;
    font-size: 32px;
    color: ${(props) => props.theme.colors.primaryRed};
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-shadow: 0 0 0.5px ${(props) => props.theme.colors.primaryRed};
`
