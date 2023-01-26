import styled from 'styled-components'
import Image from 'next/image'

export const BottomWrapper = styled('div')`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 252px;
    background-color: ${(props) => props.theme.colors.footer};
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
export const FooterButton = styled(Image)`
    margin-bottom: 5%;
`
export const FooterLabel = styled('label')`
    display: flex;
    align-items: center;
    color: white;
    font-family: Poppins;
    font-size: 16px;
    margin-right: 5%;
    vertical-align: middle;
`
export const FooterImage = styled(Image)`
    height: 100%;
    margin-right: 1%;
`
export const ImageWrapper = styled('div')`
    width: 15%;
    display: flex;
    justify-content: start;
`
