import styled from 'styled-components'
import '../../styles/global'
import { breakpoints } from '../../styles/global'

export const Wrapper = styled('header')`
    position: relative;
    width: 100%;
    height: 15%;
    background: ${(props) => props.theme.colors.header};
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const LogoWrapper = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    height: 100%;
    margin-left: 5%;
`

export const TitleLabel = styled('label')`
    font-family: 'Nunito';
    font-weight: 700;
    font-size: 32px;
    color: #ffffff;
    text-shadow: -0.5px 0px 0px black, 0.5px 0px 0px black, 0px -0.5px 0px black,
        0px 0.5px 0px black;

    @media only screen and (max-width: ${breakpoints.breakpoint1440p}px) {
        font-size: 50px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint1080p}px) {
        font-size: 40px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint900p}px) {
        font-size: 32px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint720p}px) {
        font-size: 25px;
    }
    @media only screen and (max-width: ${breakpoints.large}px) {
        font-size: 22px;
    }
`

export const TitleSpan = styled('span')`
    font-family: 'Londrina Solid';
    font-weight: 900;
    font-size: 32px;
    color: ${(props) => props.theme.colors.primaryRed};
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-shadow: 0 0 0.5px ${(props) => props.theme.colors.primaryRed};

    @media only screen and (max-width: ${breakpoints.breakpoint1440p}px) {
        font-size: 50px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint1080p}px) {
        font-size: 40px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint900p}px) {
        font-size: 32px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint720p}px) {
        font-size: 30px;
    }
    @media only screen and (max-width: ${breakpoints.large}px) {
        font-size: 22px;
    }
`
export const Button = styled('button')`
    width: 25%;
    height: 40%;
    margin-right: 5%;
    color: white;
    font-weight: 300;
    font-family: ${(props) => props.theme.fonts.button};
    font-size: 25px;
    background: transparent;
    cursor: pointer;
    border-radius: 20px;
    border: ${(props) => (props.selected ? 2 : 0)}px solid
        ${(props) => props.theme.colors.primaryRed};
`
