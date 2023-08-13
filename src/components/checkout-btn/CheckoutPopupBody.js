/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { jsx } from 'theme-ui'
import { loadStripe } from '@stripe/stripe-js'
import styled from 'styled-components'
import axios from 'axios'
import { toast } from 'react-toastify'

import CloseIcon from '@material-ui/icons/Close'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import CircularProgress from '@material-ui/core/CircularProgress'

import { color, mobile, desktop } from 'utils'
import { getIsProduction } from 'LibGlobal/utils'
import { useGetDataPrintful } from 'Hooks/useGetDataPrintful'
import { useGetCurrency } from 'Hooks/useGetCurrency'
import { useTranslation } from 'Hooks/useTranslation'
import { getPriceAlgorithm } from 'LibGlobal/priceAlgorithm/getPriceAlgorithm'
import CheckoutItems from './CheckoutItems'
import NextTabBtn from '../NextTabBtn/NextTabBtn'
import ImageUploadSteps from './ImageUploadSteps'
import { useRouter } from 'next/router'

import { useProductSelector, useDiscountSelector, useTitlesSelector, useStoreIdSelector } from 'redux/order/reducer'

const STRIPE_PUBLIC_KEY_LIVE =
    'pk_live_51JMXyHCVDm94CHWQ8qbje7TzCuvsKKEeqB8S0zwg8jQ8hWhU97jrGLCS5f0fP3Gn5OSu1SoVatJW3vd9mfHMtsek00RAujkQSI'
const STRIPE_PUBLIC_KEY_TEST =
    'pk_test_51JMXyHCVDm94CHWQtr4H5GJ4sdJA2II0YeMO6izSpDOKUpfXncH4Fo0kdSHK9tF2ul0xBfANUsAdxBtYlsgWPB9G004bXHb5YW'

let Stripe

const priceAlgorithm = getPriceAlgorithm()

export default function CheckoutPopupBody({
    isUploadPending,
    imageSavedResponse,
    imageBase64Created,
    backdropClose,
    activeMapStyleName,
    fileSizeMB
}) {
    const product = useProductSelector()
    const discount = useDiscountSelector()
    const mapTitles = useTitlesSelector()
    const storeId = useStoreIdSelector()
    const t = useTranslation()
    const currency = useGetCurrency()
    const { locale, defaultLocale } = useRouter()

    const [lightbox, setLightbox] = useState({
        open: false,
        activeSrc: null
    })

    const { dataPrintful } = useGetDataPrintful([product.variantId])

    const IS_PRODUCTION = getIsProduction()
    const STRIPE_API_KEY = IS_PRODUCTION ? STRIPE_PUBLIC_KEY_LIVE : STRIPE_PUBLIC_KEY_TEST

    useEffect(() => {
        const asyncStripeInit = async () => {
            Stripe = await StripePromise
        }
        const StripePromise = loadStripe(STRIPE_API_KEY)
        asyncStripeInit()
    }, [])

    const priceWithDeliveryAndDiscount = priceAlgorithm.getDiscountedPrice(
        dataPrintful?.[product.variantId]?.priceWithDeliveryAndProfit.netPrice ?? 0,
        discount.code
    )

    async function redirectToCheckout() {
        try {
            const response = await axios.post('api/stripe-checkout', {
                product,
                imageObj: imageSavedResponse,
                checkoutShownPrices: {
                    netPriceWithDelivery: priceWithDeliveryAndDiscount.netPrice
                },
                discountCode: discount.code,
                mapTitles: mapTitles,
                storeId,
                currency: currency,
                locale: locale,
                defaultLocale: defaultLocale
            })

            console.log('Get_Error_resp', { response })

            if (response?.data?.id) {
                Stripe.redirectToCheckout({
                    sessionId: response.data.id
                })
            } else {
                toast('Info: Něco se pokazilo, kontaktujte prosím technickou podporu', {
                    position: 'top-left'
                })
            }
        } catch (e) {
            if (e.response?.data?.error) {
                console.log({ responseError: e.response })
                alert(e.response?.data?.error)
            } else {
                alert(t('error.contactingStripe'))
                //TODO: log here message to admin that redirect is broken
            }
        }
    }

    const ImageUploadTeaser = () => (
        <TeaserContainer>
            {!imageBase64Created ? (
                <CustomLoaderWrap>
                    <StyledCircularProgress />
                </CustomLoaderWrap>
            ) : (
                <TeaserImageWrap>
                    <IconContainer>
                        <StyledOpenInNewIcon />
                    </IconContainer>
                    <StyledImg
                        id="img_screen_shot"
                        src={imageBase64Created}
                        onClick={e => {
                            setLightbox({
                                open: true,
                                activeSrc: imageBase64Created
                            })
                            e.stopPropagation()
                        }}
                    />
                </TeaserImageWrap>
            )}
        </TeaserContainer>
    )

    return (
        <Card onClick={e => e.stopPropagation()}>
            <HeadingContainer isUploadPending={isUploadPending}>
                <StyledCloseIcon onClick={() => backdropClose()} />
                <ImageStepsContainer>
                    <ImageUploadSteps
                        isUploadPending={isUploadPending}
                        imageBase64Created={imageBase64Created}
                        fileSizeMB={fileSizeMB}
                        lightbox={lightbox}
                        setLightbox={setLightbox}
                    />
                    <ImageUploadTeaser />
                </ImageStepsContainer>
            </HeadingContainer>
            <CheckoutItems dataPrintful={dataPrintful} activeMapStyleName={activeMapStyleName} />

            <NextTabContainer>
                <NextTabBtn
                    width="100%"
                    onClick={() => redirectToCheckout()}
                    isLoadingOnClick
                    isDisabled={isUploadPending}
                >
                    {t('cta.addressAndDetails')}
                </NextTabBtn>
            </NextTabContainer>
        </Card>
    )
}

const Card = styled.div`
    /* background: ${color('heading_secondary')}; */
    background: white;
    color: black;
    width: 400px;
    max-height: 100vh;
    overflow: auto;
    text-transform: unset;
    border-radius: 5px;
    cursor: default;
`

const HeadingContainer = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${({ isUploadPending }) => (isUploadPending ? 'transparent' : 'rgba(230,230,230)')};
    border: 1px solid lightGrey;
    box-shadow: 0 0 5px lightgrey;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`

const StyledCloseIcon = styled(CloseIcon)`
    padding: 0.1rem;
    color: ${color('primary')};
    border-radius: 5px;
    border: 1px solid;
    pointer-events: auto;
    cursor: pointer;
    margin-top: 15px;
    margin-left: 15px;
    z-index: 100;
`

const ImageStepsContainer = styled.div`
    position: sticky;
    top: 0;
    color: white;
    z-index: 10;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 10px;
    margin-bottom: 10px;

    ${mobile`
    flex-direction: row;
  `}
`

const TeaserContainer = styled.div`
    flex-basis: 40%;
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    height: 100%;

    ${mobile`
    justify-content: center;
  `}
`

const TeaserImageWrap = styled.div`
    color: ${color('whitish_paper_blue')};
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    cursor: pointer !important;
    pointer-events: auto;
`

const IconContainer = styled.span`
    height: 0;
    width: 0;
    display: block;
    position: relative;
    top: 3px;
    left: -2em;
    z-index: 100;
`

const StyledOpenInNewIcon = styled(OpenInNewIcon)`
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.2) !important;
    border-radius: 3px;
`

const StyledImg = styled.img`
    z-index: 10;
    cursor: pointer;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.56);
    display: block;
    max-width: 100%;
    max-height: 120px;
    width: auto;
    height: auto;
    border-radius: 5px;

    ${mobile`
    max-height: 150px;
  `}
`

const NextTabContainer = styled.div`
    position: sticky;
    bottom: 0px;
    width: 100%;
    padding: 15px 15px;
    color: black;
`

const CustomLoaderWrap = styled.div`
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledCircularProgress = styled(CircularProgress)`
    height: 40px !important;
    width: 40px !important;
    color: ${color('primary')} !important;
`
