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
} from './styles'
import searchRectangle from '../../assets/images/search-location.png'
import searchButton from '../../assets/images/search-button.png'

const HomePage = () => {
    return (
        <Wrapper height="887px">
            <SearchContainer justifyContent="center">
                <Title>moja klopica</Title>
                <Content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Content>
                <InputWrapper height="55px" width="480px" alignItems="center">
                    <Input
                        placeholder="Unesi adresu na kojoj se nalaziš"
                        type="text"
                    />
                    <SearchIcon src={searchRectangle} alt=""></SearchIcon>
                    <SearchButton src={searchButton} alt=""></SearchButton>
                </InputWrapper>
            </SearchContainer>
            <Header />
        </Wrapper>
    )
}

export default HomePage
