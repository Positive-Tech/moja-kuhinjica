import React from 'react'
import Image from 'next/image'
import { ColDiv, RowDiv } from '../../../styles/global'
import { RestaurantPic, RestaurantRating, Wrapper } from './style'
import TitleLabel from '../../labels/TitleLabel'
import RegularLabel from '../../labels/RegularLabel'
import { LabelSeparator } from '../../labels/style'
import pic from '../../../../public/static/assets/images/restaurant.png'
import star from '../../../../public/static/assets/images/star.svg'

interface IRestaurantProps {
    restaurant: {
        name: string
        type: string
        foodType: string
        distance: number
        time: number
        rating: number
    }
}

const RestaurantCard = ({ restaurant }: IRestaurantProps) => {
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
                        <TitleLabel size="20px" content={restaurant.name} />
                        <RowDiv>
                            <RowDiv width="60%" alignItems="center">
                                <RegularLabel
                                    size="13px"
                                    content={restaurant.type}
                                />
                                <LabelSeparator>&bull;</LabelSeparator>
                                <RegularLabel
                                    size="13px"
                                    content={restaurant.foodType}
                                />
                            </RowDiv>
                            <RowDiv
                                justifyContent="right"
                                width="40%"
                                alignItems="center"
                            >
                                <RegularLabel
                                    size="13px"
                                    content={restaurant.distance + ' km'}
                                />
                                <LabelSeparator>&bull;</LabelSeparator>
                                <RegularLabel
                                    size="13px"
                                    content={restaurant.time + ' min'}
                                />
                            </RowDiv>
                        </RowDiv>
                        <RowDiv>
                            <RowDiv alignItems="center">
                                <RestaurantRating>
                                    {restaurant.rating}
                                </RestaurantRating>
                                <RowDiv alignItems="center">
                                    <Image src={star} alt="" />
                                    <Image src={star} alt="" />
                                    <Image src={star} alt="" />
                                    <Image src={star} alt="" />
                                    <Image src={star} alt="" />
                                </RowDiv>
                            </RowDiv>
                            <RowDiv
                                justifyContent="right"
                                width="50%"
                                alignItems="center"
                            >
                                <RegularLabel
                                    size="13px"
                                    content="Besplatna dostava"
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
