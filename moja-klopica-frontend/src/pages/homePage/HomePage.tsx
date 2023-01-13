import React from 'react'
import Header from '../../components/header/Header'
import {
    SearchContainer,
    Wrapper,
    Title,
    Content,
    Input,
    InputWrapper,
    SearchIcon,
    SearchButton,
    SearchButtonWrapper,
    ArrowIcon,
    SearchButtonDiv,
    RestaurantListWrapper,
} from './styles'
import searchRectangle from '../../assets/images/search-location.png'
import searchButton from '../../assets/images/search-button.png'
import arrowIcon from '../../assets/images/arrow.svg'
import { ColDiv } from '../../styles/Global'
import RestaurantCard from '../../components/restaurant/restaurantCard/RestaurantCard'
import RestaurantList from '../../components/restaurant/restaurantList/RestaurantList'

const HomePage = () => {
    return (
        <ColDiv>
            <Wrapper height="887px">
                <Header />
                <SearchContainer justifyContent="center" width="50%">
                    <Title>moja klopica</Title>
                    <Content>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Content>
                    <InputWrapper
                        height="55px"
                        width="480px"
                        alignItems="center"
                    >
                        <Input
                            placeholder="Unesi adresu na kojoj se nalaziš"
                            type="text"
                        />
                        <SearchIcon src={searchRectangle} alt="" />
                        <SearchButtonDiv>
                            <SearchButtonWrapper>
                                <SearchButton src={searchButton} alt="" />
                                <ArrowIcon src={arrowIcon} alt="" />
                            </SearchButtonWrapper>
                        </SearchButtonDiv>
                    </InputWrapper>
                </SearchContainer>
            </Wrapper>
            <RestaurantListWrapper>
                <RestaurantList />
            </RestaurantListWrapper>
        </ColDiv>
    )
}

export default HomePage
