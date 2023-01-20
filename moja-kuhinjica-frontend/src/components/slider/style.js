import styled from 'styled-components'
import { RedButton, RedBackButton, RedNextButton } from '../buttons/style'

export const Wrapper = styled('div')`
    position: absolute;
    width: 95%;
`
export const ButtonWrapper = styled('div')`
    width: 100%;
    height: 100%;
    position: absolute;
    /* top: 0; */
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const PrevButton = styled(RedBackButton)`
    margin-left: 3.5%;
    /* margin-left: 5% - ${(props) => +props.width.split('px')[0]}; */
`

export const NextButton = styled(RedNextButton)`
    margin-right: 3.5%;
`
