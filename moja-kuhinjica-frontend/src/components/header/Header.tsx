import React, { useState } from 'react'
import { Wrapper, LogoWrapper, Button, LogoImage } from './styles'
import logo from '../../../public/static/assets/images/logo-moja-klopica.svg'
import { RowDiv } from '@/styles/global'

const Header = () => {
    const [active, setActive] = useState(1)

    return (
        <Wrapper>
            <LogoWrapper>
                <LogoImage src={logo} alt="" />
            </LogoWrapper>
            <RowDiv alignItems="center" justifyContent="center" width="50%">
                <Button selected={active === 1} onClick={() => setActive(1)}>
                    Početna
                </Button>
                <Button selected={active === 2} onClick={() => setActive(2)}>
                    Meni
                </Button>
                <Button selected={active === 3} onClick={() => setActive(3)}>
                    O nama
                </Button>
            </RowDiv>
        </Wrapper>
    )
}

export default Header
