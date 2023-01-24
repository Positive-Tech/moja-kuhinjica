import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { Wrapper, LogoWrapper, TitleLabel, TitleSpan, Button } from './styles'
import logo from '../../../public/static/assets/images/logo-moja-klopica.svg'
import { RowDiv } from '@/styles/global'

const Header = () => {
    const [selectedButton, setSelectedButton] = useState(true)

    return (
        <Wrapper>
            <LogoWrapper>
                <Image
                    src={logo}
                    alt=""
                    style={{ height: '100%', width: '100%' }}
                />
            </LogoWrapper>
            <RowDiv alignItems="center" justifyContent="center" width="50%">
                <Button selected={true}>Početna</Button>
                <Button selected={false}>Meni</Button>
                <Button selected={false}>Profil</Button>
            </RowDiv>
        </Wrapper>
    )
}

export default Header
