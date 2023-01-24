import styled from 'styled-components'
import { RowDiv } from '@/styles/global'
import { RegularLabelStyled } from '../labels/style'

export const TitleWrapper = styled(RowDiv)`
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    svg {
        transform: rotate(${(props) => props.rotation}deg);
        fill: ${(props) => props.theme.colors.primaryRed};
        cursor: pointer;
    }
`
export const TitleLabel = styled(RegularLabelStyled)`
    font-size: 28px;
    text-align: center;
    width: 80%;
`
export const PriceWrapper = styled(RowDiv)`
    height: 10%;
    justify-content: center;
    align-items: center;
`

export const ContentLabel = styled('label')`
    font-family: Poppins;
    text-transform: uppercase;
    font-size: 24px;
    color: ${(props) => props.theme.colors.grey};
`
export const PriceLabel = styled(ContentLabel)`
    color: ${(props) => props.theme.colors.primaryRed};
`
export const DescriptionLabel = styled('label')`
    font-family: Poppins;
    font-weight: lighter;
    font-size: 20px;
    width: 70%;
    color: ${(props) => props.theme.colors.grey};
`
