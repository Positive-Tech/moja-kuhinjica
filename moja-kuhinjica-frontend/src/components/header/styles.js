import styled from 'styled-components'

export const Wrapper = styled('header')`
    width: 100%;
    height: 185px;
    background: ${(props) => props.theme.colors.header};
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const LogoWrapper = styled('div')`
    margin-left: 5%;
`

export const Button = styled('button')`
    width: 194px;
    height: 67px;
    margin-right: 5%;
    border-radius: 10px;
    border: none;
    color: white;
    font-size: 25px;
    font-weight: 800;
    font-family: ${(props) => props.theme.fonts.button};
    background: ${(props) => props.theme.colors.primaryRed};
    cursor: pointer;

    &:hover {
        background: ${(props) => props.theme.colors.secondaryRed};
    }
`

export const TitleLabel = styled('label')`
    font-family: 'Nunito';
    font-weight: 800;
    font-size: 30px;
    color: #ffffff;
    text-shadow: -0.5px 0px 0px black, 0.5px 0px 0px black, 0px -0.5px 0px black,
        0px 0.5px 0px black;
`

export const TitleSpan = styled('span')`
    font-family: 'Londrina Solid';
    font-weight: 400;
    font-size: 30px;
    color: ${(props) => props.theme.colors.primaryRed};
    letter-spacing: 0.05em;
    text-transform: uppercase;
`
