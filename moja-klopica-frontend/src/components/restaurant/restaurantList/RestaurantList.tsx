import React from 'react'
import { GridDiv, RowDiv } from '../../../styles/Global'
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
