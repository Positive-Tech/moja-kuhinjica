import Image from 'next/image'
import { useRef } from 'react'
import { ColDiv, GridDiv, RowDiv } from '../styles/global'
import {
    Wrapper,
    SearchContainer,
    Title,
    Content,
    ButtonWrapper,
    Button,
    MenuWrapper,
    TitleLabel,
    DayButton,
    ScrollLabel,
    ScrollLabelWrapper,
} from '@/styles/style'
import Header from '@/components/header/Header'
import { MenuItem } from '@/components/menu/MenuItem'
import '../styles/global'
import scrollArrow from '../../public/static/assets/images/scrollArrow.svg'
import { Footer } from '@/components/footer/Footer'

const Home = () => {
    const ref = useRef<HTMLDivElement>(null)
    const handleClick = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <ColDiv>
            <Wrapper height="100vh">
                <Header />
                <SearchContainer
                    justifyContent="center"
                    width="50%"
                    height="80%"
                >
                    <Title>moja klopica</Title>
                    <Content>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing.
                    </Content>
                    <ButtonWrapper>
                        <Button>Registrujte se</Button>
                        <Button>Ulogujte se</Button>
                    </ButtonWrapper>
                </SearchContainer>
                <RowDiv height="10%" justifyContent="end">
                    <ScrollLabelWrapper>
                        <ScrollLabel onClick={handleClick}>
                            Dnevni meni
                        </ScrollLabel>
                        <Image
                            src={scrollArrow}
                            alt=""
                            onClick={handleClick}
                            style={{ cursor: 'pointer' }}
                        />
                    </ScrollLabelWrapper>
                </RowDiv>
            </Wrapper>
            <MenuWrapper ref={ref}>
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
            <Footer />
        </ColDiv>
    )
}

export default Home
