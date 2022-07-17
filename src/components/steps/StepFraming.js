/** @jsx jsx */
import { useState } from 'react'
import { jsx, Text } from 'theme-ui'
import Lightbox from 'react-image-lightbox'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { color, fontWeight, fontSize } from 'utils'
import CustomLoader from '../CustomLoader'

import { useGetDataPrintful } from 'Hooks/useGetDataPrintful'
import { getVariantObject } from 'LibGlobal/getVariantObject'
import { getFormattedPrice } from 'LibGlobal/getFormattedPrice'
import { useIsMobile } from 'Hooks/useIsMobile'
import { setProductAction } from 'redux/order/actions'
import { useProductSelector } from 'redux/order/reducer'
import HeadingText from './atoms/HeadingText'
import StepContainer from './atoms/StepContainer'
import { useTranslation } from 'Hooks/useTranslation'
import { useRouter } from 'next/router'
import { useGetCurrency } from 'Hooks/useGetCurrency'
import { useGetDeliveryRegion } from 'Hooks/useGetDeliveryReg'

import { TAB_STEPS, LANGUAGE_CURRENCY_TABLE } from '@constants'

import { getPriceAlgorithm, getBasePriceAlgorithm } from 'LibGlobal/priceAlgorithm/getPriceAlgorithm'

import { VARIANTS_PRINTFUL, FRAME_OPTION_NAMES } from 'constants/constants'

const priceAlgorithm = getPriceAlgorithm()

export default function StepFraming({ index }) {
    const t = useTranslation()
    const { isMobile } = useIsMobile()
    const dispatch = useDispatch()
    const productRedux = useProductSelector()
    const router = useRouter()
    const { locale } = router
    const currency = useGetCurrency()
    const deliveryRegion = useGetDeliveryRegion()

    const [lightbox, setLightbox] = useState({
        open: false,
        activeSrc: null
    })

    const { dataPrintful } = useGetDataPrintful(VARIANTS_PRINTFUL.map(variant => variant.id))
    const basePriceAlgorithm = getBasePriceAlgorithm()

    const setNewFrame = (variantId, shippingCode) => {
        const priceWithDelivery = dataPrintful?.[variantId]?.priceWithDeliveryAndProfit.netPrice ?? 0

        dispatch(
            setProductAction({
                variantId: variantId,
                // price: dataPrintful[variantId]?.price,
                priceWithDelivery: priceWithDelivery,
                shippingCode
            })
        )

        //TODO there has to be price, otherwise return?
    }

    const variantsPrintfulForSize = VARIANTS_PRINTFUL.filter(variant => {
        const availableRegions = dataPrintful && dataPrintful[variant.id]?.availableRegions

        const isAvailableRegionsArray = Array.isArray(availableRegions)

        const isVariantForOffer =
            productRedux.sizeObject.acceptableSizes.includes(variant.sizeName) &&
            availableRegions &&
            isAvailableRegionsArray &&
            availableRegions?.includes(deliveryRegion)

        return isVariantForOffer
    })

    const variantObjectNoFrame = variantsPrintfulForSize.find(
        variant => variant.frameName === FRAME_OPTION_NAMES.NO_FRAME
    )

    // const priceWithDeliveryNoFrame =
    //   dataPrintful?.[variantObjectNoFrame.id]?.priceWithDeliveryAndProfit
    //     .netPrice;

    return (
        <StepContainer isMobile={isMobile}>
            <HeadingText isMobile={isMobile}>
                {index}. {t(TAB_STEPS[index].full)}
            </HeadingText>
            {variantsPrintfulForSize.length === 0 && (
                <div sx={styles.loaderWrap}>
                    <CustomLoader />
                </div>
            )}
            {variantsPrintfulForSize.length > 0 && (
                <ContainerVariants>
                    {variantsPrintfulForSize.map(({ id: variantId, shipping }, varIndex) => (
                        <ItemWrap
                            key={varIndex}
                            onClick={() => setNewFrame(variantId, shipping[LANGUAGE_CURRENCY_TABLE[locale]].codeCZ)}
                        >
                            <div sx={styles.textsWrap}>
                                <VariantDesc active={productRedux.variantId === variantId}>
                                    {t(getVariantObject(variantId)?.frameName)}
                                </VariantDesc>
                            </div>
                            <ItemVariant active={productRedux.variantId === variantId}>
                                <div sx={styles.imageWrap}>
                                    <img sx={styles.variantImage} src={dataPrintful[variantId]?.url} />
                                </div>
                            </ItemVariant>
                            <div sx={styles.textsWrap}>
                                <StyledPriceP active={productRedux.variantId === variantId}>
                                    {`+ 
                  ${getFormattedPrice({
                      amount: basePriceAlgorithm.subtract([
                          dataPrintful?.[variantId]?.priceWithDeliveryAndProfit.netPrice ?? 0,
                          dataPrintful?.[variantObjectNoFrame.id]?.priceWithDeliveryAndProfit.netPrice ?? 0
                      ]),
                      currency
                  })}`}
                                </StyledPriceP>

                                <StyledDeliveryPriceP active={productRedux.variantId === variantId}>
                                    {t('steps.transportPrice', {
                                        price: priceAlgorithm.getPriceOfDelivery(variantId, dataPrintful).netPrice
                                    })}
                                </StyledDeliveryPriceP>
                            </div>
                        </ItemWrap>
                    ))}
                </ContainerVariants>
            )}

            {lightbox.open && (
                <Lightbox mainSrc={lightbox.activeSrc} onCloseRequest={() => setLightbox({ open: false })} />
            )}
        </StepContainer>
    )
}

const styles = {
    loaderWrap: {
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
        minHeight: '20vh',
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageWrap: {
        position: 'relative',
        // height: "80%",
        display: 'flex',
        justifyContent: 'center'
    },
    variantImage: {
        position: 'relative',
        height: '170px'
    },
    textsWrap: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left'
    }
}

const StyledPriceP = styled.p`
    margin: 0;
    font-size: ${fontSize('sm')};
    font-weight: ${({ active }) => active && fontWeight('bold')};
    // color: ${({ active }) => active && color('cta_color')};
    cursor: pointer;
    text-align: center;
    margin-top: 5px;
`

const StyledDeliveryPriceP = styled.p`
    margin: 0;
    font-size: ${fontSize('xxs')};
    cursor: pointer;
    // color: ${({ active }) => (active ? color('cta_color') : color('muted'))};
    font-weight: ${({ active }) => active && fontWeight('bold')};
    text-align: center;
`

const VariantDesc = styled.p`
    color: ${color('primary')};
    line-height: 1.2;
    font-size: 0.8rem;
    font-weight: ${({ active }) => active && fontWeight('bold')};
    padding-bottom: 5px;
    margin: 0;
`

const ItemWrap = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 30%;
    display: block;
    width: 4rem;
`

const ContainerVariants = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding: 1px;
    cursor: pointer;
`

const ItemVariant = styled.div`
    color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    box-shadow: 0px 0px 0px ${({ active }) => (active ? '3px' : '1px')};
    color: ${({ active }) => active && color('cta_color')};
    overflow: hidden;

    & > p {
        color: black;
    }
`
