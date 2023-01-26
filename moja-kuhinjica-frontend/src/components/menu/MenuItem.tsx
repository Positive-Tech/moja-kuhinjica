import React, { useState } from 'react'
import Image from 'next/image'
import { ColDiv, RowDiv } from '@/styles/global'
import pic from '../../../public/static/assets/images/meal1.png'
import {
    TitleWrapper,
    TitleLabel,
    PriceWrapper,
    ContentLabel,
    PriceLabel,
    DescriptionLabel,
} from './style'
import { SVGMenuArrow } from '../svg/SVGMenuArrow'

export const MenuItem = () => {
    const [openDescription, setOpenDescription] = useState(false)

    return (
        <ColDiv width="420px" height="700px" alignItems="center">
            <Image src={pic} alt="" />
            <TitleWrapper height="20%" rotation={openDescription ? -90 : 90}>
                <TitleLabel>Piletina u sosu od šampinjona</TitleLabel>
                <SVGMenuArrow
                    onClick={() => setOpenDescription(!openDescription)}
                />
            </TitleWrapper>
            {openDescription && (
                <RowDiv justifyContent="center" height="20%">
                    <DescriptionLabel>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Donec odio. Quisque volutpat mattis eros
                    </DescriptionLabel>
                </RowDiv>
            )}
            <PriceWrapper>
                <ContentLabel>meni 1 -</ContentLabel>
                <PriceLabel>560 din</PriceLabel>
            </PriceWrapper>
        </ColDiv>
    )
}
