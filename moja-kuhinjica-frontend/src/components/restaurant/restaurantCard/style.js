import styled from 'styled-components'
import { ColDiv } from '../../../styles/global'
import Image from 'next/image'

export const Wrapper = styled(ColDiv)`
    background-color: #ffffff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 10px;
`
export const RestaurantPic = styled(Image)`
    height: 200px;
    margin-top: 2%;
    margin-bottom: 2%;
`
export const RestaurantRating = styled('label')`
    font-family: Open Sans;
    font-weight: 600;
    font-size: 15px;
    color: ${(props) => props.theme.colors.primaryRed};
    margin-right: 2%;
`
