import styled from 'styled-components'
import { ColDiv } from '../styles/global'
import Image from 'next/image'
import bg from '../../public/static/assets/images/background.jpg'

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
    font-size: 70px;
    font-weight: 400;
    color: ${(props) => props.theme.colors.primaryRed};
    text-shadow: -0.5px 0px 0px black, 0.5px 0px 0px black, 0px -0.5px 0px black,
        0px 0.5px 0px black;
    letter-spacing: 0.05em;
    text-transform: uppercase;
`

export const Content = styled('label')`
    font-family: Nunito;
    font-size: 35px;
    font-weight: 800;
    color: #ffff;
    width: 477px;
    height: 66px;
    line-height: 35px;
`
export const InputWrapper = styled('div')`
    display: flex;
    align-items: center;
    width: 400px;
    height: 55px;
    position: relative;
    margin-top: 50px;
`
export const Input = styled('input')`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 40px;
    border: none;
    border-left: 2px solid ${(props) => props.theme.colors.primaryRed};
    padding: 0px 0px 0px 60px;
    font-family: Open Sans;
    font-weight: 300;
    font-size: 20px;
    margin-left: 2%;

    ::placeholder {
        font-family: Open Sans;
        font-weight: 300;
        font-size: 20px;
        color: ${(props) => props.theme.colors.placeholder};
    }

    &:focus {
        outline: none;
        border: 2px solid #c63a2f;
    }
`
export const SearchIcon = styled(Image)`
    position: absolute;
    height: 100%;
`
export const ArrowIcon = styled(Image)`
    position: absolute;
    height: 35%;
    cursor: pointer;
`
export const SearchButtonDiv = styled('div')`
    position: absolute;
    height: 100%;
    margin-left: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const SearchButton = styled('button')`
    position: absolute;
    width: 45px;
    height: 45px;
    border: none;
    background: ${(props) => props.theme.colors.primaryRed};
    border-radius: 50%;
    cursor: pointer;

    &:hover {
        background: ${(props) => props.theme.colors.secondaryRed};
    }
`

export const SearchButtonWrapper = styled('div')`
    position: relative;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const RestaurantListWrapper = styled('div')`
    width: 80%;
    background-color: #f3f1f0;
`
