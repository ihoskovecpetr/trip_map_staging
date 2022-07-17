import React from 'react'
import CookieConsent from 'react-cookie-consent'
import styled from 'styled-components'

import { color } from 'utils'
import { useTranslation } from 'Hooks/useTranslation'

export default function Cookies() {
    const t = useTranslation()

    return (
        <CookieConsent
            location="bottom"
            buttonText={t('cookies.consent')}
            cookieName="myAwesomeCookieName2"
            style={{ background: '#2B373B' }}
            buttonStyle={{
                background: '#f6aa1c',
                color: '#4e503b',
                fontSize: '13px'
            }}
            expires={150}
        >
            {t('cookies.text')}{' '}
            <span style={{ fontSize: '10px' }}>
                {t('cookies.readMore')} <StyledA href="/business-info">{t('cookies.here')}</StyledA>
            </span>
        </CookieConsent>
    )
}

const StyledA = styled.a`
    color: ${color('cta_color')};
`
