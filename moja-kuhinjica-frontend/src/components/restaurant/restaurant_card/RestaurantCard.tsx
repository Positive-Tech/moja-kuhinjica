import React from 'react'
import { ColDiv, RowDiv } from '../../../styles/global'
import { RestaurantPic, RestaurantRating, Wrapper } from './style'
import pic from '../../../../public/static/assets/images/restaurant.png'
import TitleLabel from '../../labels/TitleLabel'
import RegularLabel from '../../labels/RegularLabel'
import { LabelSeparator } from '../../labels/style'
import star from '../../../../public/static/assets/images/star.svg'
import Image from 'next/image'

const RestaurantCard = () => {
    return (
        <Wrapper
            height="330px"
            width="430px"
            justifyContent="center"
            alignItems="center"
        >
            <ColDiv width="90%">
                <RestaurantPic src={pic} alt="" />
                <RowDiv>
                    <ColDiv justifyContent="center">
                        <TitleLabel
                            size={'20px'}
                            content={'Restoran Top FOOD 021'}
                        />
                        <RowDiv>
                            <RowDiv width="60%" alignItems="center">
                                <RegularLabel
                                    size={'13px'}
                                    content={'RESTORANI'}
                                />
                                <LabelSeparator>&bull;</LabelSeparator>
                                <RegularLabel
                                    size={'13px'}
                                    content={'Domaća kuhinja'}
                                />
                            </RowDiv>
                            <RowDiv
                                justifyContent="right"
                                width="40%"
                                alignItems="center"
                            >
                                <RegularLabel
                                    size={'13px'}
                                    content={'0.5 km'}
                                />
                                <LabelSeparator>&bull;</LabelSeparator>
                                <RegularLabel
                                    size={'13px'}
                                    content={'15 min'}
                                />
                            </RowDiv>
                        </RowDiv>
                        <RowDiv>
                            <RowDiv alignItems="center">
                                <RestaurantRating>4.2</RestaurantRating>
                                <RowDiv alignItems="center">
                                    <Image src={star} alt=""></Image>
                                    <Image src={star} alt=""></Image>
                                    <Image src={star} alt=""></Image>
                                    <Image src={star} alt=""></Image>
                                    <Image src={star} alt=""></Image>
                                </RowDiv>
                            </RowDiv>
                            <RowDiv
                                justifyContent="right"
                                width="50%"
                                alignItems="center"
                            >
                                <RegularLabel
                                    size={'13px'}
                                    content={'Besplatna dostava'}
                                />
                            </RowDiv>
                        </RowDiv>
                    </ColDiv>
                </RowDiv>
            </ColDiv>
        </Wrapper>
    )
}

export default RestaurantCard
