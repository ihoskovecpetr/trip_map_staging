import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import NextApp from 'next/app'
import axios from 'axios'
import { IntlProvider } from 'react-intl'

import styled, { ThemeProvider } from 'styled-components'
import { useCookies } from 'react-cookie'

// import { initGA, logPageView } from "analytics";
// Load DM Sans typeface
import 'typeface-dm-sans'
import { ThemeProvider as ThemeProviderMaterialUI } from '@material-ui/styles'
import { wrapper } from '../redux/store'

// Load other package css file
import 'react-multi-carousel/lib/styles.css'
import 'rc-drawer/assets/index.css'
import './style.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-image-lightbox/style.css'
import theme from '../theme/theme.js'
import themeMaterialUI from '../theme/themeMaterialUI.js'
import { GlobalStyle } from '../theme/global'
import { useTranslation } from 'Hooks/useTranslation'

import { useFullStoreSelector } from 'redux/order/reducer'

import { REDUX_COOKIE_NAME, IS_CLIENT } from 'constants/constants'
import Cookies from 'components/Cookies'
import * as locales from '../languages'

const MyApp = ({ Component, pageProps, err, ...props }) => {
    const router = useRouter()
    const { locale, defaultLocale, pathname } = router
    const localeCopy = locales[locale]
    const messages = localeCopy[pathname]
    const [cookie, _] = useCookies([REDUX_COOKIE_NAME])
    // const t = useTranslation()

    const fullReduxStore = useFullStoreSelector()

    useEffect(() => {
        const storedCookie = cookie[REDUX_COOKIE_NAME]

        const saveReduxStore = async store => {
            const response = await axios.post('api/save-redux-store', {
                reduxStore: {
                    ...store,
                    defaultLocale: router.defaultLocale,
                    locale: router.locale
                },
                storeId: storedCookie
            })

            if (response.status === 203) {
                const URLWithoutQuery = window.location.origin + window.location.pathname

                window.location.href = URLWithoutQuery
            }
        }

        saveReduxStore(fullReduxStore)
    }, [fullReduxStore])

    useEffect(() => {
        if (router.pathname === '/studio') {
            const storedCookie = cookie[REDUX_COOKIE_NAME]

            const NonCookieOwner = storedCookie != router?.query?.id
            const isMissingQueryID = !router?.query?.id

            if (NonCookieOwner || isMissingQueryID) {
                router.query.id = storedCookie
                router.push(router)
            }
        }
    }, [router.pathname])

    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <ThemeProviderMaterialUI theme={themeMaterialUI}>
                    <IntlProvider
                        locale={locale}
                        defaultLocale={defaultLocale}
                        messages={messages} //{pageProps.intlMessages}
                    >
                        <Cookies /> <Component {...pageProps} />
                    </IntlProvider>
                </ThemeProviderMaterialUI>
            </ThemeProvider>
        </>
    )
}

MyApp.getInitialProps = wrapper.getInitialPageProps(store => async appContext => {
    const { ctx } = appContext

    const { pathname, req, res, router } = ctx

    if (IS_CLIENT) {
        return
    }

    const { meta } = req

    if (meta?.storeId && res.cookie[REDUX_COOKIE_NAME] != meta.storeId) {
        res.cookie(REDUX_COOKIE_NAME, meta.storeId, {
            maxAge: 900000,
            httpOnly: false
        })
    }

    const appProps = await NextApp.getInitialProps(appContext)

    return { ...appProps, storeId: meta?.storeId }
})

export default wrapper.withRedux(MyApp) //appWithTranslation(MyApp)
