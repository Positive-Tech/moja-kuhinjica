import React, { useState } from 'react'
import { ColDiv, RowDiv } from '../../styles/global'
import Image from 'next/image'
import {
    BottomWrapper,
    Button,
    FooterButton,
    FooterImage,
    FooterLabel,
    ImageWrapper,
} from './style'
import logo from '../../../public/static/assets/images/logo-moja-klopica.svg'
import appleStoreButton from '../../../public/static/assets/images/appStore.svg'
import playStoreButton from '../../../public/static/assets/images/playStore.svg'
import circle from '../../../public/static/assets/images/c-circle.svg'
import location from '../../../public/static/assets/images/locationFooter.svg'
import earth from '../../../public/static/assets/images/earth.svg'

export const Footer = () => {
    return (
        <BottomWrapper>
            <ColDiv alignItems="center" justifyContent="center" width="95%">
                <RowDiv
                    height="70%"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <ImageWrapper>
                        <Image src={logo} alt="" />
                    </ImageWrapper>
                    <RowDiv
                        width="70%"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button>Početna</Button>
                        <Button>Meni</Button>
                        <Button>O nama</Button>
                    </RowDiv>
                    <ColDiv
                        width="15%"
                        justifyContent="center"
                        alignItems="end"
                    >
                        <FooterButton src={appleStoreButton} alt="" />
                        <FooterButton src={playStoreButton} alt="" />
                    </ColDiv>
                </RowDiv>
                <RowDiv height="5%" alignItems="center">
                    <svg
                        width="1402"
                        height="2"
                        viewBox="0 0 1402 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="1402" height="2" fill="#C40016" />
                    </svg>
                </RowDiv>
                <RowDiv height="15%" alignItems="center">
                    <RowDiv>
                        <FooterImage src={location} alt="" />

                        <FooterLabel>Srbija</FooterLabel>
                        <FooterImage src={earth} alt="" />
                        <FooterLabel>Srpski</FooterLabel>
                    </RowDiv>
                    <RowDiv justifyContent="end">
                        <FooterLabel>Uslovi korišćenja</FooterLabel>
                        <FooterLabel>Politika privatnosti</FooterLabel>
                        <FooterLabel>FAQ</FooterLabel>
                        <FooterImage src={circle} alt="" />
                        <FooterLabel>Moja klopica 2022</FooterLabel>
                    </RowDiv>
                </RowDiv>
            </ColDiv>
        </BottomWrapper>
    )
}
