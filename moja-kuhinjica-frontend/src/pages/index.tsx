import {ColDiv} from '../styles/global'
import Image from 'next/image'
import { Wrapper, SearchContainer, Title, Content, InputWrapper, Input, SearchIcon, SearchButtonDiv, SearchButtonWrapper, SearchButton, ArrowIcon } from '@/styles/style'
import Header from '@/components/header/Header'
import RestaurantList from '@/components/restaurant/restaurantList/RestaurantList'
import { RestaurantListWrapper } from '@/styles/style'
import searchRectangle from '../../public/static/assets/images/search-location.png'
import searchButton from '../../public/static/assets/images/search-button.png'
import arrowIcon from '../../public/static/assets/images/arrow.svg'
import background from '../../public/static/assets/images/background.jpg'


const Home = () => {
    return (
      <ColDiv>
          <Wrapper height="887px" >
            {/* <Image src={background} alt="Caoo"/> */}
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

export default Home
