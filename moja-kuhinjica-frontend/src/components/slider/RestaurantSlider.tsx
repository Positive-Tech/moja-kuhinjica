import React from 'react'
import Slider from 'react-slick'
import uuid from 'react-uuid'
import RestaurantCard from '../restaurant/restaurant_card/RestaurantCard'
import { sliderSettings } from '@/constants/constants'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ButtonWrapper, Wrapper } from './style'
import { RedButton } from '../buttons/style'

const sliderRef = React.createRef<Slider>()

const restaurantCards = [
    {
        name: 'Restoran TOP FOOD 021',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
    {
        name: 'Gondola',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
    {
        name: 'Lanterna',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
    {
        name: 'Veliki',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
    {
        name: 'Petrus',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
    {
        name: 'Dva stapica',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
    {
        name: 'Kibic korner',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
    {
        name: 'La Brasa',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
    {
        name: 'Vidikovac',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
]

const RestaurantSlider = () => {
    return (
        <Wrapper>
            <Slider ref={sliderRef} {...sliderSettings}>
                {restaurantCards.map((restaurant) => {
                    return (
                        <RestaurantCard restaurant={restaurant} key={uuid()} />
                    )
                })}
            </Slider>
            <ButtonWrapper>
                <RedButton onClick={() => sliderRef.current?.slickPrev()} />
                <RedButton onClick={() => sliderRef.current?.slickNext()} />
            </ButtonWrapper>
        </Wrapper>
    )
}

export default RestaurantSlider
