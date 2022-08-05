/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { jsx } from 'theme-ui'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import styled from 'styled-components'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import { VARIANTS_PRINTFUL } from 'constants/constants'
import { createUploadRequest } from 'LibGlobal/createUploadRequest'
import CheckoutPopupBody from './CheckoutPopupBody'
import CheckoutDrawer from './CheckoutDrawer'
import NextTabBtn from '../NextTabBtn/NextTabBtn'
import { useGetDataPrintful } from 'Hooks/useGetDataPrintful'
import { useQualityImageCreator } from 'Hooks/useQualityImageCreator'
import { useTitlesSelector } from 'redux/order/reducer'
import { useProductSelector } from 'redux/order/reducer'
import { useTranslation } from 'Hooks/useTranslation'
import { CheckoutDrawerProvider } from 'contexts/checkoutDrawer/checkout.provider'

import { useActiveLayoutSelector, useActiveMapStyleSelector } from 'redux/order/reducer'

import { setUploadPercentage } from 'redux/order/actions'

import { getLazyUploader, forceResetPendingPromise } from 'LibGlobal/getLazyUploader'

const CancelToken = axios.CancelToken

export default function CheckoutCta({ map, snapMapInstance, isCustomUI, children }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const t = useTranslation()

    const mapTitles = useTitlesSelector()
    const productRedux = useProductSelector()
    const activeLayoutNameRedux = useActiveLayoutSelector()
    const activeMapStyleName = useActiveMapStyleSelector()

    const [backdropOpen, setBackdropOpen] = useState(false)
    const [isUploadPending, setIsUploadPending] = useState(false)
    const [imageBase64Created, setImageBase64Created] = useState('')
    const [imageSavedResponse, setImageSavedResponse] = useState(null)
    const [fileSizeMB, setFileSizeMB] = useState(0)
    const [axiosCancelTokenSource, setAxiosCancelTokenSource] = useState(CancelToken.source())
    const qualityImageCreator = useQualityImageCreator()

    const { dataPrintful } = useGetDataPrintful(VARIANTS_PRINTFUL.map(variant => variant.id))

    const center = map?.getCenter().toString()

    useEffect(() => {
        setImageSavedResponse(null)
        setImageBase64Created(null)
        forceResetPendingPromise()
        dispatch(setUploadPercentage(0))
    }, [map, center, mapTitles, activeLayoutNameRedux, productRedux, activeMapStyleName])

    const progressCallbackFce = progressEvent => {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)

        dispatch(setUploadPercentage(percentCompleted))
    }

    const uploadImage = async () => {
        try {
            setBackdropOpen(true)
            setIsUploadPending(true)

            const finalImgSrc = await qualityImageCreator({
                map,
                snapMapInstance,
                activeLayoutName: activeLayoutNameRedux,
                product: productRedux,
                activeMapStyleName,
                options: {
                    isPreview: false
                }
            })

            const buffer = Buffer.from(finalImgSrc.substring(finalImgSrc.indexOf(',') + 1))
            setFileSizeMB(Number(buffer.length / 1e6).toPrecision(2))

            setImageBase64Created(finalImgSrc)

            const response = await createUploadRequest(finalImgSrc, progressCallbackFce, axios, axiosCancelTokenSource)

            if (response.data.secure_url) {
                console.log('✅ successful_upload!')
                toast(' ✔️ uloženo, můžete pokračovat', {
                    type: 'success',
                    position: 'top-left'
                })

                setIsUploadPending(false)
                setImageSavedResponse(response.data)

                return response.data
            }
        } catch (e) {
            console.error(e)
            axios.post('api/send-notification-admin', {
                message: 'Failed upl' + e.message
            })
        }
    }

    const lazyUploadImage = () => {
        return getLazyUploader(
            () => imageSavedResponse,
            () => uploadImage()
        )()
    }

    const backdropClose = () => {
        setBackdropOpen(false)
        forceResetPendingPromise()
        axiosCancelTokenSource?.cancel(' User ❌ checkout')
        setAxiosCancelTokenSource(CancelToken.source())
    }

    const priceWithDelivery = dataPrintful?.[productRedux.variantId]?.priceWithDeliveryAndProfit.netPrice ?? 0

    return (
        <CheckoutWrap>
            {isCustomUI && (
                <CustomUI
                    onClick={() => {
                        setBackdropOpen(true)
                        lazyUploadImage()
                    }}
                >
                    {children}
                </CustomUI>
            )}
            {!isCustomUI && (
                <DefaultUI>
                    <NextTabBtn
                        onClick={() => {
                            setBackdropOpen(true)
                            lazyUploadImage()
                        }}
                        price={priceWithDelivery}
                    >
                        {t('cta.sumUp')}
                    </NextTabBtn>
                </DefaultUI>
            )}

            <img id="img_screen_shot" sx={styles.resultImage} />
            {backdropOpen && (
                // <Backdrop
                //     className={classes.backdrop}
                //     classes={{
                //         root: classes.rootBackdrop // class name, e.g. `classes-nesting-root-x`
                //     }}
                //     open={backdropOpen}
                //     onClick={backdropClose}
                // >
                //     <CheckoutPopupBody
                //         isUploadPending={isUploadPending}
                //         imageSavedResponse={imageSavedResponse}
                //         imageBase64Created={imageBase64Created}
                //         backdropClose={backdropClose}
                //         activeMapStyleName={activeMapStyleName}
                //         fileSizeMB={fileSizeMB}
                //     />
                // </Backdrop>
                <CheckoutDrawerProvider>
                    <CheckoutDrawer
                        isUploadPending={isUploadPending}
                        imageSavedResponse={imageSavedResponse}
                        imageBase64Created={imageBase64Created}
                        backdropClose={backdropClose}
                        activeMapStyleName={activeMapStyleName}
                        fileSizeMB={fileSizeMB}
                    ></CheckoutDrawer>
                </CheckoutDrawerProvider>
            )}
        </CheckoutWrap>
    )
}

const styles = {
    resultImage: {
        width: '100%',
        backgroundColor: 'green',
        zIndex: 10,
        display: 'none'
    }
}

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: '10 !important',
        color: '#fff',
        display: 'flex'
    },
    rootBackdrop: {
        zIndex: '12 !important'
    }
}))

const CheckoutWrap = styled.div`
    width: 100%;

    & p {
        margin: 0;
    }
`

const CustomUI = styled.div`
    width: 100%;
`

const DefaultUI = styled.div`
    width: 100%;
`
