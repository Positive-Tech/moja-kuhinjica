import React from 'react'
import Image from 'next/image'
import { Wrapper, LogoWrapper, TitleLabel, TitleSpan, Button } from './styles'
import logo from '../../../public/static/assets/images/logo-moja-klopica.svg'
import { RowDiv } from '@/styles/global'

const Header = () => {
    return (
        <Wrapper>
            <RowDiv alignItems="center" justifyContent="center">
                <TitleLabel>
                    Saznaj gde je najbliža
                    <TitleSpan> tvoja klopica</TitleSpan>
                </TitleLabel>
            </RowDiv>
            <LogoWrapper>
                <Image
                    src={logo}
                    alt=""
                    style={{ height: '100%', width: '100%' }}
                />
            </LogoWrapper>
        </Wrapper>
    )
}

export default Header
