import styled from 'styled-components'
import { ColDiv, RowDiv } from '../../../styles/global'

export const Wrapper = styled(RowDiv)`
    position: relative;
    height: 330px;
    width: 570px;
    background-color: #ffffff;
    background-image: linear-gradient(
            to bottom,
            #d9d9d912,
            #4e4e4e89,
            #000000cc
        ),
        url(${(props) => props.bg.src});
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 10px;
`
export const ContentWrapper = styled(ColDiv)`
    padding: 0px 35px 35px 35px;
`
export const RestaurantRating = styled('label')`
    font-family: Open Sans;
    font-weight: 600;
    font-size: 15px;
    color: ${(props) => props.theme.colors.secondaryRed};
    margin-right: 2%;
`
