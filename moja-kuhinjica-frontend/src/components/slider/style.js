import styled from 'styled-components'
import { RedBackButton, RedNextButton } from '../buttons/style'

export const Wrapper = styled('div')`
    position: absolute;
    width: 95%;
`
export const ButtonWrapper = styled('div')`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const PrevButton = styled(RedBackButton)`
    margin-left: 3.5%;
`

export const NextButton = styled(RedNextButton)`
    margin-right: 3.5%;
`
