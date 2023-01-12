import styled from 'styled-components'
import { ColDiv } from '../../styles/Global'
import backgroundImg from '../../assets/images/home-page-background-image.jpg'

export const Wrapper = styled(ColDiv)`
    background-image: url(${backgroundImg});
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
    width: 480px;
    height: 55px;
    position: relative;
    margin-top: 50px;
`
export const Input = styled('input')`
    position: absoulte;
    width: 480px;
    height: 100%;
    border-radius: 40px;
    border: none;
    margin-left: 1%;
    padding: 0px 0px 0px 60px;

    ::placeholder {
        font-family: Open Sans;
        font-weight: 300;
        font-size: 20px;
        color: ${(props) => props.theme.colors.placeholder};
    }
`
export const SearchIcon = styled('img')`
    position: absolute;
    height: 100%;
`
export const SearchButton = styled('img')`
    position: absolute;
    height: 80%;
    right: 10px;
`
