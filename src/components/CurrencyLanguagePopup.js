import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import BackdropFromScratch from 'components/BackdropFromScratch'
import { mobile, color, fontSize } from 'utils'
import closeIcon from 'assets/close.png'
import { setCurrencyRegion } from 'redux/order/actions'
import { useGetCurrency } from 'Hooks/useGetCurrency'
import { useGetDeliveryRegion } from 'Hooks/useGetDeliveryReg'

import { LOCALE_TO_LANGUAGE_SHORTCUT, AVAILABLE_CURRENCIES, AVAILABLE_DESTINATIONS } from '@constants'

export default function CurrencyLanguagePopup() {
    const router = useRouter()
    const { locale, pathname, asPath } = router
    const currency = useGetCurrency()
    const deliveryRegion = useGetDeliveryRegion()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const [values, setValues] = useState({
        currency: currency,
        locale: locale,
        region: deliveryRegion
    })

    useEffect(() => {
        setValues(prev => ({ ...prev, locale: locale }))
    }, [locale])

    const onCLickBox = e => {
        e.stopPropagation()
    }

    const handleConfirmSelection = e => {
        router.push(pathname, asPath, { locale: values.locale })
        setOpen(false)

        dispatch(
            setCurrencyRegion({
                currency: values.currency,
                deliveryRegion: values.region
            })
        )
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <LabelContainer
                onClick={() => setOpen(!open)}
            >{`${LOCALE_TO_LANGUAGE_SHORTCUT[locale]} (${currency})`}</LabelContainer>
            {open && (
                <BackdropFromScratch open={open} onClick={() => setOpen(!open)}>
                    <BoxWrap onClick={onCLickBox}>
                        <h1>Confirm your settings</h1>
                        <CloseIconWrap>
                            <StyledCloseIcon onClick={() => setOpen(!open)} src={closeIcon} />
                        </CloseIconWrap>
                        <h3>Choose your language and currency</h3>
                        <SelectBox>
                            <SelectColumn>
                                <StyledLabel for="region">Delivery region:</StyledLabel>
                                {console.log({ value_region: values.region })}
                                <StyledSelect
                                    name="region"
                                    id="region"
                                    value={
                                        AVAILABLE_DESTINATIONS.filter(
                                            destination => destination.region === values.region
                                        )[0].country
                                    }
                                    onChange={e => {
                                        const newCountry = e.target.value
                                        const newDestination = AVAILABLE_DESTINATIONS.filter(
                                            destination => destination.country === newCountry
                                        )[0]
                                        console.log({
                                            newCountry,
                                            newDestination
                                        })
                                        setValues(prev => ({
                                            ...prev,
                                            region: newDestination.region,
                                            country: newDestination.country
                                        }))
                                    }}
                                >
                                    {AVAILABLE_DESTINATIONS.map(destination => (
                                        <option>{destination.country}</option>
                                    ))}
                                </StyledSelect>
                            </SelectColumn>
                        </SelectBox>
                        <SelectBox>
                            <SelectColumn>
                                <StyledLabel for="language">Language:</StyledLabel>

                                <StyledSelect
                                    name="language"
                                    id="language"
                                    value={values.locale}
                                    onChange={e => {
                                        const newLocale = e.target.value
                                        setValues(prev => ({ ...prev, locale: newLocale }))
                                    }}
                                >
                                    {router.locales.map(localeName => (
                                        <option>{localeName}</option>
                                    ))}
                                </StyledSelect>
                            </SelectColumn>
                            <SelectColumn>
                                <StyledLabel for="currency">Currency:</StyledLabel>
                                <StyledSelect
                                    name="currency"
                                    id="currency"
                                    value={values.currency}
                                    onChange={e => {
                                        const newCurrency = e.target.value
                                        setValues(prev => ({ ...prev, currency: newCurrency }))
                                    }}
                                >
                                    {AVAILABLE_CURRENCIES.map(currencyName => (
                                        <option>{currencyName}</option>
                                    ))}
                                </StyledSelect>
                            </SelectColumn>
                        </SelectBox>
                        <ButtonsBox>
                            <StyledButtonConfirm onClick={handleConfirmSelection}>Confirm</StyledButtonConfirm>
                            <StyledButton onClick={handleClose}>Close</StyledButton>
                        </ButtonsBox>
                    </BoxWrap>
                </BackdropFromScratch>
            )}
        </>
    )
}

const LabelContainer = styled.div`
    cursor: pointer;
`

const BoxWrap = styled.div`
    transform: translateX(0);
    background-color: white;
    color: black;
    max-width: 400px;
    width: 100%;
    margin: 5px 10px;
    padding: 20px 20px;
    border-radius: 5px;

    ${mobile`
    width: 300px;
    `};

    h1 {
        font-size: ${fontSize('sm')};
        width: 70%;
        margin: 0;
        margin-bottom: 5px;
    }

    h3 {
        color: grey;
        font-size: ${fontSize('xs')};
        font-weight: 400;
        margin: 0;
        margin-bottom: 10px;
    }
`

const SelectBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 10px;
`

const SelectColumn = styled.div`
    flex: 1 1 0px;
`

const StyledSelect = styled.select`
    width: 100%;
    position: relative;
    font-family: Arial;
    border: none;
    border-bottom: 2px solid lightGrey;
    cursor: pointer;
`

const StyledLabel = styled.label`
    font-weight: 400;
    font-size: ${fontSize('xs')};
`

const CloseIconWrap = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px;
    margin-top: 16px;
    margin-right: 16px;
    border-radius: 14px;

    & :hover {
        background: rgba(0, 0, 0, 0.1);
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    }
`

const StyledCloseIcon = styled.div`
    /* background-image: ${({ src }) => src ?? null}; */
    background: ${({ src }) => `url(${src})`};
    background-position: contain;
    background-size: contain;
    padding: 0.1rem;
    color: ${color('primary')};
    margin: 4px;
    height: 12px;
    width: 12px;
    pointer-events: auto;
    cursor: pointer;
    z-index: 100;
`

const ButtonsBox = styled.div`
    width: 100%;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const StyledButtonConfirm = styled.button`
    background-color: ${color('primary')};
    color: white;
    width: 100%;
    padding: 10px 20px;
    min-height: unset;
    font-weight: 300;
    border: none;
    cursor: pointer;
`

const StyledButton = styled.button`
    background-color: lightGrey;
    width: 100%;
    padding: 10px 20px;
    min-height: unset;
    font-weight: 300;
    border: none;
    cursor: pointer;
`
