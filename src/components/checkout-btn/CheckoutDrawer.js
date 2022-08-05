import React, { useContext, useState, useEffect } from 'react'
import { Box, Flex } from 'theme-ui'
import { Scrollbars } from 'react-custom-scrollbars'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { IoMdClose, IoMdMenu } from 'react-icons/io'

import Drawer from 'components/drawer'
import { useTranslation } from 'Hooks/useTranslation'
import CheckoutPopupBody from './CheckoutPopupBody'
import { CheckoutDrawerProvider } from '../../contexts/checkoutDrawer/checkout.provider'
import { CheckoutDrawerContext } from '../../contexts/checkoutDrawer/checkout.context'
import { fontWeight, color } from 'utils'

const CheckoutDrawer = ({
    isUploadPending,
    imageSavedResponse,
    imageBase64Created,
    backdropClose,
    activeMapStyleName,
    fileSizeMB
}) => {
    const { state, dispatch } = useContext(CheckoutDrawerContext)
    console.log({ state })
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
                placement={'right'}
                toggleHandler={toggleHandler}
                closeButton={<IoMdClose size="24px" />}
                drawerStyle={styles.drawer}
                closeBtnStyle={styles.close}
            >
                <Scrollbars autoHide>
                    <CheckoutPopupBody
                        isUploadPending={isUploadPending}
                        imageSavedResponse={imageSavedResponse}
                        imageBase64Created={imageBase64Created}
                        backdropClose={backdropClose}
                        activeMapStyleName={activeMapStyleName}
                        fileSizeMB={fileSizeMB}
                    />
                </Scrollbars>
            </Drawer>
        </>
    )
}

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
            'fontSize': 20,
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
        },
        a: {
            'color': 'white',
            '&:hover': {
                color: '#f6aa1c'
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
            '&:hover': {
                color: '#f6aa1c'
                // backgroundColor: "red",
            }
        }
    }
}

export default CheckoutDrawer
