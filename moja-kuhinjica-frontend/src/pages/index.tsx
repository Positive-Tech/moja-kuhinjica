import {ColDiv} from '../styles/global'
import { Wrapper, SearchContainer, Title, Content, InputWrapper, Input, SearchIcon, SearchButtonDiv, SearchButtonWrapper, SearchButton, ArrowIcon } from '@/styles/style'
import Header from '@/components/header/Header'
import RestaurantList from '@/components/restaurant/restaurant_list/RestaurantList'
import { RestaurantListWrapper } from '@/styles/style'
import searchRectangle from '../../public/static/assets/images/search-location.png'
import searchButton from '../../public/static/assets/images/search-button.png'
import arrowIcon from '../../public/static/assets/images/arrow.svg'
import MySlider from '@/components/slider/MySlider'


const Home = () => {
    return (
      <ColDiv>
          <Wrapper height="887px" >
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
          <MySlider/>
          {/* <RestaurantListWrapper>
              <RestaurantList />
          </RestaurantListWrapper> */}
      </ColDiv>
  )
}

export default Home
