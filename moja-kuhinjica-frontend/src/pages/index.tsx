import Image from 'next/image'
import { ColDiv, GridDiv, RowDiv } from '../styles/global'
import logo from '../../public/static/assets/images/logo-moja-klopica.svg'

import {
    Wrapper,
    SearchContainer,
    Title,
    Content,
    BottomWrapper,
    ButtonWrapper,
    Button,
    MenuWrapper,
    TitleLabel,
    DayButton,
    DayButtonWrapper,
} from '@/styles/style'
import Header from '@/components/header/Header'
import { MenuItem } from '@/components/menu/MenuItem'
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
                    <ButtonWrapper>
                        <Button>Registrujte se</Button>
                        <Button>Ulogujte se</Button>
                    </ButtonWrapper>
                </SearchContainer>
            </Wrapper>
            <MenuWrapper>
                <ColDiv alignItems="center">
                    <TitleLabel>Dnevni meni - 20/1/2023</TitleLabel>
                    <RowDiv
                        height="100px"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <DayButton disabled={true}>Ponedeljak</DayButton>
                        <DayButton disabled={false}>Utorak</DayButton>
                        <DayButton disabled={true}>Sreda</DayButton>
                        <DayButton disabled={true}>Cetvrtak</DayButton>
                        <DayButton disabled={true}>Petak</DayButton>
                        <DayButton disabled={true}>Subota</DayButton>
                    </RowDiv>
                    <GridDiv>
                        <MenuItem />
                        <MenuItem />
                        <MenuItem />
                        <MenuItem />
                        <MenuItem />
                        <MenuItem />
                        <MenuItem />
                    </GridDiv>
                </ColDiv>
            </MenuWrapper>
            <BottomWrapper>
                <ColDiv alignItems="center" justifyContent="center" width="90%">
                    <RowDiv height="30%" justifyContent="start">
                        <Image src={logo} alt="" style={{ height: '100%' }} />
                    </RowDiv>
                    <RowDiv>
                        <svg
                            width="1308"
                            height="1"
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
