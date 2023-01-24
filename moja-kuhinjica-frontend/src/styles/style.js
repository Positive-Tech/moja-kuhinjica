import styled from 'styled-components'
import { ColDiv, RowDiv } from '../styles/global'
import Image from 'next/image'
import bg from '../../public/static/assets/images/background.png'
import { WhiteButton } from '@/components/buttons/style'
import { breakpoints } from '../styles/global'

export const Wrapper = styled(ColDiv)`
    background-image: url(${bg.src});
    background-size: cover;
    background-repeat: no-repeat;
`

export const SearchContainer = styled(ColDiv)`
    margin-left: 5%;
`

export const Title = styled('label')`
    font-family: Londrina Solid;
    font-weight: 400;
    color: ${(props) => props.theme.colors.primaryRed};
    text-shadow: -0.5px 0px 0px black, 0.5px 0px 0px black, 0px -0.5px 0px black,
        0px 0.5px 0px black;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-size: 70px;
    @media only screen and (max-width: ${breakpoints.breakpoint1440p}px) {
        font-size: 140px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint1080p}px) {
        font-size: 120px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint900p}px) {
        font-size: 70px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint720p}px) {
        font-size: 65px;
    }
    @media only screen and (max-width: ${breakpoints.large}px) {
        font-size: 50px;
    }
`

export const Content = styled('label')`
    font-family: Nunito;
    font-weight: 500;
    color: #ffff;
    line-height: 50px;
    letter-spacing: 0.03em;
    height: 10%;
    width: 90%;
    font-size: 35px;
    @media only screen and (max-width: ${breakpoints.breakpoint1440p}px) {
        font-size: 50px;
        width: 70%;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint1080p}px) {
        font-size: 40px;
        width: 80%;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint900p}px) {
        font-size: 35px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint720p}px) {
        font-size: 30px;
    }
    @media only screen and (max-width: ${breakpoints.large}px) {
        font-size: 22px;
        line-height: 40px;
    }
`
export const ButtonWrapper = styled(RowDiv)`
    height: 20%;
    width: 60%;
    margin-top: 10%;
    display: flex;
    justify-content: space-between;
`
export const Button = styled('button')`
    width: 195px;
    height: 67px;

    color: white;
    font-weight: 800;
    font-family: ${(props) => props.theme.fonts.button};
    background: transparent;
    cursor: pointer;

    &:hover {
        background: ${(props) => props.theme.colors.primaryRed};
    }

    border-radius: 40px;
    border: 4px solid ${(props) => props.theme.colors.primaryRed};
    font-size: 22px;
`
export const MenuWrapper = styled('div')`
    width: 100%;
    height: 50%;
    background-color: white;
`
export const TitleLabel = styled('label')`
    font-family: Nunito;
    font-weight: 600;
    color: ${(props) => props.theme.colors.grey};
    margin-top: 3%;
    margin-bottom: 3%;
    font-size: 26px;
`
export const DayButton = styled('button')`
    width: 220px;
    height: 60px;
    font-weight: 500;
    font-family: ${(props) => props.theme.fonts.button};
    cursor: pointer;
    border-radius: 40px;
    border: 0;
    font-size: 28px;
    margin: 15px;

    color: ${(props) =>
        props.disabled ? props.theme.colors.disabledGrey : 'white'};
    background: ${(props) =>
        props.disabled ? 'transparent' : props.theme.colors.primaryRed};

    &:disabled {
        border: 2px solid ${(props) => props.theme.colors.disabledGrey};
    }
`
export const ScrollLabelWrapper = styled(RowDiv)`
    width: 20%;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 5%;
`
export const ScrollLabel = styled('label')`
    font-family: Nunito;
    color: white;
    font-size: 25px;
    margin-right: 5%;
    cursor: pointer;

    :hover {
        border-bottom: 2px solid #ffff;
    }
`
//useful styles for later
export const InputWrapper = styled('div')`
    display: flex;
    align-items: center;
    position: relative;

    width: 530px;
    height: 65px;
    margin-top: 10%;

    @media only screen and (max-width: ${breakpoints.breakpoint1440p}px) {
        width: 70%;
        height: 75px;
        margin-top: 2%;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint1080p}px) {
        width: 70%;
        height: 70px;
        margin-top: 5%;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint900p}px) {
        width: 80%;
        height: 65px;
        margin-top: 10%;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint720p}px) {
        width: 80%;
        height: 60px;
        margin-top: 10%;
    }
    @media only screen and (max-width: ${breakpoints.large}px) {
        width: 90%;
        height: 55px;
        margin-top: 10%;
    }
`
export const Input = styled('input')`
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 100%;
    box-sizing: border-box;
    border-radius: 40px;
    padding: 0px 0px 0px 70px;
    font-family: Open Sans;
    font-weight: 300;
    border: 2px solid ${(props) => props.theme.colors.primaryRed};

    ::placeholder {
        font-family: Open Sans;
        font-weight: 300;
        color: ${(props) => props.theme.colors.placeholder};
    }

    &:focus {
        outline: none;
    }

    font-size: 20px;
    padding-right: 15%;

    @media only screen and (max-width: ${breakpoints.breakpoint1440p}px) {
        font-size: 30px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint1080p}px) {
        font-size: 24px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint900p}px) {
        font-size: 20px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint720p}px) {
        font-size: 18px;
    }
    @media only screen and (max-width: ${breakpoints.large}px) {
        font-size: 14px;
    }
`
export const SearchIcon = styled(Image)`
    position: absolute;
    height: 100%;
`

export const SearchButton = styled(WhiteButton)`
    position: absolute;
    right: 10px;
    height: 50px;
    width: 50px;

    @media only screen and (max-width: ${breakpoints.breakpoint1440p}px) {
        right: 10px;
        height: 60px;
        width: 60px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint1080p}px) {
        right: 10px;
        height: 55px;
        width: 55px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint900p}px) {
        right: 10px;
        height: 50px;
        width: 50px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint720p}px) {
        right: 10px;
        height: 40px;
        width: 40px;
    }
    @media only screen and (max-width: ${breakpoints.large}px) {
        right: 10px;
        height: 35px;
        width: 35px;
    }
`

export const RestaurantListWrapper = styled('div')`
    position: relative;
    display: flex;
    justify-content: right;
    align-items: center;
    width: 100%;
    background-color: #f3f1f0;
    height: 500px;

    @media only screen and (max-width: ${breakpoints.breakpoint1440p}px) {
        height: 700px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint1080p}px) {
        height: 600px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint900p}px) {
        height: 500px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint720p}px) {
        height: 400px;
    }
    @media only screen and (max-width: ${breakpoints.large}px) {
        height: 400px;
    }
`
export const BottomWrapper = styled('div')`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 252px;
    background-color: ${(props) => props.theme.colors.grey};
`
