import React from 'react'
import Slider from 'react-slick'
import uuid from 'react-uuid'
import RestaurantCard from '../restaurant/restaurant_card/RestaurantCard'
import { ButtonWrapper, Wrapper, PrevButton, NextButton } from './style'
import { sliderSettings } from '@/constants/constants'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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
        <>
            <Wrapper>
                <Slider ref={sliderRef} {...sliderSettings}>
                    {restaurantCards.map((restaurant) => {
                        return (
                            <RestaurantCard
                                restaurant={restaurant}
                                key={uuid()}
                            />
                        )
                    })}
                </Slider>
            </Wrapper>
            <ButtonWrapper>
                <PrevButton
                    width="50px"
                    height="50px"
                    onClick={() => sliderRef.current?.slickPrev()}
                >
                    <svg
                        width="19"
                        height="19"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M6.29289 2.29289C6.68342 1.90237 7.31658 1.90237 7.70711 2.29289L14.0404 8.62623C14.431 9.01675 14.431 9.64992 14.0404 10.0404L7.70711 16.3738C7.31658 16.7643 6.68342 16.7643 6.29289 16.3738C5.90237 15.9832 5.90237 15.3501 6.29289 14.9596L11.9191 9.33333L6.29289 3.70711C5.90237 3.31658 5.90237 2.68342 6.29289 2.29289Z" />
                    </svg>
                </PrevButton>
                <NextButton
                    width="50px"
                    height="50px"
                    onClick={() => sliderRef.current?.slickNext()}
                >
                    <svg
                        width="19"
                        height="19"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M6.29289 2.29289C6.68342 1.90237 7.31658 1.90237 7.70711 2.29289L14.0404 8.62623C14.431 9.01675 14.431 9.64992 14.0404 10.0404L7.70711 16.3738C7.31658 16.7643 6.68342 16.7643 6.29289 16.3738C5.90237 15.9832 5.90237 15.3501 6.29289 14.9596L11.9191 9.33333L6.29289 3.70711C5.90237 3.31658 5.90237 2.68342 6.29289 2.29289Z" />
                    </svg>
                </NextButton>
            </ButtonWrapper>
        </>
    )
}

export default RestaurantSlider
