import React, { useContext, useState, useEffect } from 'react'
import { Box, Flex } from 'theme-ui'
import { Scrollbars } from 'react-custom-scrollbars'
import Drawer from 'components/drawer'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'
import { IoMdClose, IoMdMenu } from 'react-icons/io'
import { useTranslation } from 'Hooks/useTranslation'

import { DrawerContext } from '../../contexts/drawer/drawer.context'
import { fontWeight, color } from 'utils'
import UnderlineLoader from 'components/UnderlineLoader'

const social = [
    {
        path: 'https://www.instagram.com/tripmap_org/',
        icon: <FaInstagram />
    }
]

const menuItems = [
    {
        path: '/',
        label: 'navigation.home'
    },
    {
        path: '/studio',
        label: 'navigation.studio'
    }
]
const NavItems = () => {
    const { state, dispatch } = useContext(DrawerContext)
    const router = useRouter()
    const { locale } = router
    const t = useTranslation()

    const [loadingIndex, setLoadingIndex] = useState(null)

    useEffect(() => {
        setLoadingIndex(null)
    }, [router])

    const toggleHandler = React.useCallback(() => {
        dispatch({
            type: 'TOGGLE'
        })
    }, [dispatch])

    return (
        <>
            <Drawer
                width="320px"
                drawerHandler={
                    <Box sx={styles.handler}>
                        <IoMdMenu size="26px" color={'black'} />
                    </Box>
                }
                open={state.isOpen}
                toggleHandler={toggleHandler}
                closeButton={<IoMdClose size="24px" />}
                drawerStyle={styles.drawer}
                closeBtnStyle={styles.close}
            >
                <Scrollbars autoHide>
                    <Box sx={styles.content}>
                        {/* Mobile */}
                        <Box sx={styles.menu}>
                            {menuItems.map(({ path, label }, i) => {
                                return (
                                    <Link activeClass="active" href={path} locale={locale} key={i}>
                                        <LinkMobileStyled>
                                            <ListItemP onClick={path === router.pathname && toggleHandler}>
                                                {t(label)}
                                            </ListItemP>
                                        </LinkMobileStyled>
                                    </Link>
                                )
                            })}
                        </Box>
                        {/* Social */}
                        <Box sx={styles.menuFooter}>
                            <Box sx={styles.social}>
                                {social.map(({ path, icon }, i) => (
                                    <Box as="span" key={i} sx={styles.social.icon}>
                                        <Link href={path} locale={locale}>
                                            <a target="_blank"> {icon}</a>
                                        </Link>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Scrollbars>
            </Drawer>
            <Box sx={styles.nav}>
                {menuItems.map(({ path, label }, index) => (
                    <Link href={path} key={index}>
                        <StyledContainer
                            onClick={() => {
                                setLoadingIndex(index)
                            }}
                        >
                            <StyledAncor>{t(label)}</StyledAncor>
                            {index === loadingIndex && <UnderlineLoader />}
                        </StyledContainer>
                    </Link>
                ))}
            </Box>
        </>
    )
}

const Wrap = styled.span`
    flex: 0;
`

const StyledAncor = styled.a`
    font-weight: ${fontWeight('regular')} !important;
    color: black !important;
    position: relative;
`

const StyledContainer = styled.div`
    position: relative;
    margin: 0 15px;
    cursor: pointer;
`

const ListItemP = styled.p`
    letter-spacing: 0.3rem;
    margin: 0;
`

const LinkMobileStyled = styled.div`
    font-size: 16px;
    font-weight: 300;
    text-decoration: none;
    text-transform: uppercase;
    color: ${color('whitish_paper_blue')};
    padding: 15px 30px;
    cursor: pointer;
    border-bottom: 1px solid #e8e5e5;
    transition: all 0.25s;
    // &:hover: {
    //   color: secondary;
    // };
    // &.active: {
    //   color: secondary;
    // };
`

const styles = {
    handler: {
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'center',
        'flexShrink': '0',
        'width': '26px',
        'cursor': 'pointer',
        'color': 'whitish_paper_blue',

        '@media screen and (min-width: 624px)': {
            display: 'none'
        }
    },

    drawer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'primary'
    },

    close: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '25px',
        right: '30px',
        zIndex: '1',
        cursor: 'pointer',
        color: 'whitish_paper_blue'
    },

    content: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        pt: '100px',
        pb: '40px'
    },

    menu: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },

    menuFooter: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 'auto'
    },

    social: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        icon: {
            'display': 'flex',
            'alignItems': 'center',
            'justifyContent': 'center',
            'color': 'whitish_paper_blue',
            'fontSize': 14,
            'mr': '15px',
            'transition': 'all 0.25s',
            'cursor': 'pointer',
            ':last-child': {
                mr: '0'
            },
            '&:hover': {
                color: 'secondary'
                // backgroundColor: "red",
            }
        }
    },

    button: {
        color: 'whitish_paper_blue',
        fontSize: '14px',
        fw: '700',
        height: '45px',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: '0'
    },
    nav: {
        // mx: "auto",
        'color': 'black',
        'display': 'none',
        'textTransform': 'uppercase',
        'letterSpacing': '4px',
        '@media screen and (min-width: 624px)': {
            display: 'flex'
        },
        'a': {
            // mx: "5px",
            // fontSize: "16px",
            // fontWeight: "200",
            // px: 25,
            // cursor: "pointer",
            // textDecoration: "none",
            // color: ["whitish_paper_blue", null, null, "black"],
            // lineHeight: "1.2",
            // "&.active": {
            //   color: "secondary",
            // },
        }
    }
}

export default NavItems
