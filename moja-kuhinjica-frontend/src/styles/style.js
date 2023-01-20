import styled from 'styled-components'
import { ColDiv } from '../styles/global'
import Image from 'next/image'
import bg from '../../public/static/assets/images/background.png'
import { WhiteButton } from '@/components/buttons/style'

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
    font-weight: 500;
    color: #ffff;
    width: 525px;
    height: 105px;
    line-height: 50px;
    letter-spacing: 0.03em;
`
export const InputWrapper = styled('div')`
    display: flex;
    align-items: center;
    width: 530px;
    height: 65px;
    position: relative;
    margin-top: 35px;
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
    font-size: 20px;
    border: 2px solid ${(props) => props.theme.colors.primaryRed};
    padding-right: 15%;

    ::placeholder {
        font-family: Open Sans;
        font-weight: 300;
        font-size: 20px;
        color: ${(props) => props.theme.colors.placeholder};
    }

    &:focus {
        outline: none;
    }
`
export const SearchIcon = styled(Image)`
    position: absolute;
    height: 100%;
`
export const SearchButtonDiv = styled('div')`
    position: absolute;
    height: 100%;
    margin-left: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
`

export const SearchButton = styled(WhiteButton)`
    position: absolute;
    right: 10px;
    width: 50px;
    height: 50px;
`
export const RestaurantListWrapper = styled('div')`
    position: relative;
    display: flex;
    justify-content: right;
    align-items: center;
    width: 100%;
    height: 500px;
    background-color: #f3f1f0;
`
