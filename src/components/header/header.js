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
import Link from 'next/link'
import DiscountBanner from 'components/DiscountBanner'

export default function Header() {
    const { locale, pathname } = useRouter()
    const { isMobile } = useIsMobile()
    const isStudio = pathname === PATHS.studio

    return (
        <DrawerProvider>
            <HeaderContainer isStudio={isStudio} isMobile={isMobile} id="header">
                <DiscountBanner />
                <StyledContainer>
                    {/* <LogoWrap> */}
                    <Logo src={LogoBlack} />
                    {/* </LogoWrap> */}
                    <Flex1 />
                    <NavItems />
                    <LanguageLinksWrap>
                        <Link href={pathname} locale="en">
                            <StyledLanguageLink isActive={locale == 'en'}>
                                {isMobile ? 'en' : 'english'}
                            </StyledLanguageLink>
                        </Link>

                        <Link href={pathname} locale="cs">
                            <StyledLanguageLink isActive={locale == 'cs'}>
                                {isMobile ? 'cz' : 'czech'}
                            </StyledLanguageLink>
                        </Link>
                    </LanguageLinksWrap>
                </StyledContainer>
            </HeaderContainer>
        </DrawerProvider>
    )
}

const positionAnim = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
    transition: all 0.4s ease;
  }
`

const HeaderContainer = styled.div`
    font-weight: normal;
    padding: 0;
    width: 100%;
    min-height: 60px;
    z-index: 5;
    color: black;
    background-color: transparent;
`

// background-color: ${({ isStudio, isMobile }) =>
// isStudio ? (isMobile ? "transparent" : "#7B8188") : "transparent"};

const StyledContainer = styled(Container)`
    display: flex;
    align-items: center;
    // justify-content: space-between;
`

const StyledLanguageLink = styled.a`
    // text-decoration: none !important;
    font-size: ${({ isActive }) => (isActive ? '1rem' : '0.7rem')};
    margin-left: 0.3rem;
    // color: ${({ isActive }) => (isActive ? 'black' : 'grey')};
    color: black;
    cursor: ${({ isActive }) => (isActive ? '' : 'pointer')};
    text-decoration: ${({ isActive }) => (isActive ? 'none !important' : 'underline')};
    pointer-events: ${({ isActive }) => (isActive ? 'none' : 'auto')};
`

const Flex1 = styled.span`
    flex: 1;
`

const LanguageLinksWrap = styled.span`
    flex: 0;
`
