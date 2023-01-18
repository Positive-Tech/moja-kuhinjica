import React from 'react'
import Image from 'next/image'
import { Wrapper, LogoWrapper, TitleLabel, TitleSpan, Button } from './styles'
import logo from '../../../public/static/assets/images/logo-moja-klopica.svg'

const Header = () => {
  return (
    <Wrapper>
        <LogoWrapper>
            <Image src={logo} alt=""/>
        </LogoWrapper>
        <TitleLabel>Saznaj gde je najbliža
            <TitleSpan> tvoja klopica</TitleSpan>
        </TitleLabel>
        <Button>Ulogujte se</Button>
    </Wrapper>
  )
}

export default Header
