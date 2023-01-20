import React from 'react'
import Image from 'next/image'
import { RowDiv } from '../../../styles/global'
import { ContentWrapper, RestaurantRating, Wrapper } from './style'
import TitleLabel from '../../labels/TitleLabel'
import pic from '../../../../public/static/assets/images/restaurant.png'
import star from '../../../../public/static/assets/images/star.svg'
import transparentStar from '../../../../public/static/assets/images/transparentStar.svg'

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
        <Wrapper height="330px" width="570px" bg={pic} alignItems="end">
            <ContentWrapper justifyContent="end">
                <TitleLabel size="18px" content={restaurant.name} />
                <RowDiv alignItems="center" height="5%">
                    <RestaurantRating>{restaurant.rating}</RestaurantRating>
                    <RowDiv alignItems="center">
                        <Image src={star} alt="" />
                        <Image src={star} alt="" />
                        <Image src={star} alt="" />
                        <Image src={star} alt="" />
                        <Image src={transparentStar} alt="" />
                    </RowDiv>
                </RowDiv>
            </ContentWrapper>
        </Wrapper>
    )
}

export default RestaurantCard
