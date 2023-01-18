import RestaurantSlider from '@/components/slider/RestaurantSlider'
import { ColDiv } from '../styles/global'
import {
    Wrapper,
    SearchContainer,
    Title,
    Content,
    InputWrapper,
    Input,
    SearchIcon,
    SearchButtonDiv,
    SearchButton,
} from '@/styles/style'
import Header from '@/components/header/Header'
import { RestaurantListWrapper } from '@/styles/style'
import searchRectangle from '../../public/static/assets/images/search-location.png'

const Home = () => {
    return (
        <ColDiv>
            <Wrapper height="840px">
                <Header />
                <SearchContainer justifyContent="center" width="50%">
                    <Title>moja klopica</Title>
                    <Content>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing.
                    </Content>
                    <InputWrapper>
                        <Input
                            placeholder="Unesi adresu na kojoj se nalaziš"
                            type="text"
                        />
                        <SearchIcon src={searchRectangle} alt="" />
                        <SearchButtonDiv>
                            <SearchButton />
                        </SearchButtonDiv>
                    </InputWrapper>
                </SearchContainer>
            </Wrapper>
            <RestaurantListWrapper>
                <RestaurantSlider />
            </RestaurantListWrapper>
        </ColDiv>
    )
}

export default Home
