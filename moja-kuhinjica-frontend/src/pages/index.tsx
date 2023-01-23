import Image from 'next/image'
import RestaurantSlider from '@/components/slider/RestaurantSlider'
import { ColDiv, RowDiv } from '../styles/global'
import logo from '../../public/static/assets/images/logo-moja-klopica.svg'

import {
    Wrapper,
    SearchContainer,
    Title,
    Content,
    InputWrapper,
    Input,
    SearchIcon,
    SearchButton,
    BottomWrapper,
} from '@/styles/style'
import Header from '@/components/header/Header'
import { RestaurantListWrapper } from '@/styles/style'
import searchRectangle from '../../public/static/assets/images/search-location.png'
import '../styles/global'

const Home = () => {
    return (
        <ColDiv>
            <Wrapper height="100vh">
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
                        <SearchButton>
                            <svg
                                width="19"
                                height="19"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M6.29289 2.29289C6.68342 1.90237 7.31658 1.90237 7.70711 2.29289L14.0404 8.62623C14.431 9.01675 14.431 9.64992 14.0404 10.0404L7.70711 16.3738C7.31658 16.7643 6.68342 16.7643 6.29289 16.3738C5.90237 15.9832 5.90237 15.3501 6.29289 14.9596L11.9191 9.33333L6.29289 3.70711C5.90237 3.31658 5.90237 2.68342 6.29289 2.29289Z" />
                            </svg>
                        </SearchButton>
                    </InputWrapper>
                </SearchContainer>
            </Wrapper>
            <RestaurantListWrapper>
                <RestaurantSlider />
            </RestaurantListWrapper>
            <BottomWrapper>
                <ColDiv alignItems="center" justifyContent="center" width="90%">
                    <RowDiv height="30%" justifyContent="start">
                        <Image src={logo} alt="" style={{ height: '100%' }} />
                    </RowDiv>
                    <RowDiv>
                        <svg
                            width="1308"
                            height="1"
                            viewBox="0 0 1308 1"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="0.0465088"
                                width="1307.91"
                                height="1"
                                fill="#D9D9D9"
                            />
                        </svg>
                    </RowDiv>
                    <RowDiv></RowDiv>
                </ColDiv>
            </BottomWrapper>
        </ColDiv>
    )
}

export default Home
