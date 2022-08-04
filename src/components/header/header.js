/** @jsx jsx */
import { jsx, Container, Flex, Button } from 'theme-ui'
import { keyframes } from '@emotion/core'
import styled from 'styled-components'

import Logo from 'components/logo'
import LogoBlack from 'assets/logo_black.png'
import LogoWhite from 'assets/logo_while.png'
import { DrawerProvider } from '../../contexts/drawer/drawer.provider'
import NavItems from './nav-items'
import { useIsMobile } from 'Hooks/useIsMobile'
import { useRouter } from 'next/router'
import { PATHS } from '@constants'
import DiscountBanner from 'components/DiscountBanner'

export default function Header({ isRelative }) {
    const { pathname } = useRouter()
    const { isMobile } = useIsMobile()
    const isIndex = pathname === PATHS.index

    return (
        <DrawerProvider>
            <HeaderContainer isMobile={isMobile} isRelative={isRelative} id="header">
                <DiscountBanner />
                <StyledContainer>
                    <Logo src={isIndex ? LogoWhite : LogoBlack} />
                    <Flex1 />
                    <NavItems isBlackLogo={!isIndex} />
                </StyledContainer>
            </HeaderContainer>
        </DrawerProvider>
    )
}

const HeaderContainer = styled.div`
    font-weight: normal;
    padding: 0;
    width: 100%;
    min-height: 60px;
    z-index: 5;
    color: black;
    background-color: transparent;
    position: ${({ isRelative }) => (isRelative ? 'relative' : 'absolute')};
`

const StyledContainer = styled(Container)`
    display: flex;
    align-items: center;
`

const Flex1 = styled.span`
    flex: 1;
`
