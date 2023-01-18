import React from 'react'
import Slider from 'react-slick'
import uuid from 'react-uuid'
import { sliderSettings } from '@/constants/constants'
import RestaurantCard from '../restaurant/restaurant_card/RestaurantCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const RestaurantSlider = () => {
    return (
        <div style={{ width: '80%' }}>
            <Slider {...sliderSettings}>
                {restaurantCards.map((restaurant) => {
                    return (
                        <RestaurantCard restaurant={restaurant} key={uuid()} />
                    )
                })}
            </Slider>
        </div>
    )
}

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

export default RestaurantSlider
