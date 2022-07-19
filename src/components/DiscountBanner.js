import React from 'react'
import styled from 'styled-components'
import { color, fontSize } from 'utils'
import Big from 'big.js'
import { VALID_DISCOUNT_CODES } from '@constants'
import { useTranslation } from 'Hooks/useTranslation'
import { useIsMobile } from 'Hooks/useIsMobile'
import { Container } from 'theme-ui'
import CurrencyLanguagePopup from './CurrencyLanguagePopup'

export default function DiscountBanner() {
    const t = useTranslation()
    const discKoef = new Big(VALID_DISCOUNT_CODES[0].discountKoef)
    const discountPercentage = discKoef.sub(1).times(-100).toString()
    const { isMobile } = useIsMobile()

    return (
        <BannerContainer id="discountBanner">
            <InnerContainer>
                <StyledParagraph>
                    {t(isMobile ? 'saleLineMobile' : 'saleLine', {
                        discountPercentage,
                        code: <b>{VALID_DISCOUNT_CODES[0].code}</b>
                    })}
                </StyledParagraph>

                <CurrencyLanguagePopup />
            </InnerContainer>
        </BannerContainer>
    )
}

const BannerContainer = styled.div`
    width: 100%;
    background-color: ${color('primary')};
    color: ${color('background_almost_white')};
`

const InnerContainer = styled(Container)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    height: 40px;
    overflow: hidden;
`

const StyledParagraph = styled.p`
    margin: 0;
    vertical-align: baseline;
    padding-top: 2px;
    text-align: left;
    font-size: ${fontSize('sm')};
`
