import React from 'react'
import { GridDiv } from '../../../styles/global'
import RestaurantCard from '../restaurantCard/RestaurantCard'

const RestaurantList = () => {
    return (
        <GridDiv>
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
        </GridDiv>
    )
}

export default RestaurantList
