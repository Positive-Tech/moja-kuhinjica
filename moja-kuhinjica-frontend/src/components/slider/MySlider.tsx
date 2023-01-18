import React, { Component } from 'react'
import Slider from 'react-slick'
import RestaurantCard from '../restaurant/restaurant_card/RestaurantCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const MySlider = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        initialSlide: 0.5,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    return (
        <Slider {...settings}>
            {restaurantCards.map((restaurant) => {
                return <RestaurantCard restaurant={restaurant} />
            })}
        </Slider>
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
        name: 'Restoran TOP FOOD 021',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
    {
        name: 'Restoran TOP FOOD 021',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
    {
        name: 'Restoran TOP FOOD 021',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
    {
        name: 'Restoran TOP FOOD 021',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
    {
        name: 'Restoran TOP FOOD 021',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
    {
        name: 'Restoran TOP FOOD 021',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
    {
        name: 'Restoran TOP FOOD 021',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
    {
        name: 'Restoran TOP FOOD 021',
        type: 'RESTORANI',
        foodType: 'Domaća kuhinja',
        distance: 0.5,
        time: 15,
        rating: 4.2,
    },
]

export default MySlider
