import styled from 'styled-components'
import { ColDiv, RowDiv } from '../../../styles/global'
import { breakpoints } from '../../../styles/global'

export const Wrapper = styled(RowDiv)`
    position: relative;
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
    height: 330px;
    width: 570px;

    @media only screen and (max-width: ${breakpoints.breakpoint1440p}px) {
        border-radius: 10px;
        height: 430px;
        width: 800px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint1080p}px) {
        border-radius: 10px;
        height: 380px;
        width: 620px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint900p}px) {
        border-radius: 10px;
        height: 330px;
        width: 570px;
    }
    @media only screen and (max-width: ${breakpoints.breakpoint720p}px) {
        border-radius: 10px;
        height: 280px;
        width: 520px;
    }
    @media only screen and (max-width: ${breakpoints.large}px) {
        border-radius: 10px;
        height: 230px;
        width: 430px;
    }
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
