import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import BackdropFromScratch from 'components/BackdropFromScratch'
import { mobile, color, fontSize } from 'utils'
import closeIcon from 'assets/close.png'
import { updateLocation } from 'redux/order/actions'
import { MODE_OF_TRANSPORT } from 'constants/constants'

export default function DirectionsNotFoundPopup({ currentPoint, previousPoint }) {
    const router = useRouter()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false)
    }

    const handleConfirmSelection = () => {
        dispatch(
            updateLocation({
                ...currentPoint,
                modeOfTransport: MODE_OF_TRANSPORT.flying
            })
        )
        setOpen(false)
    }

    return (
        <>
            {open && (
                <BackdropFromScratch open={open} onClick={() => setOpen(!open)}>
                    <BoxWrap>
                        <h1>Notification</h1>
                        <CloseIconWrap>
                            <StyledCloseIcon onClick={() => setOpen(!open)} src={closeIcon} />
                        </CloseIconWrap>
                        <h3>
                            Roud path between <b>{currentPoint.title}</b> and <b>{previousPoint.title}</b> was not
                            found, switching mode of transport to air flight
                        </h3>

                        <ButtonsBox>
                            <StyledButtonConfirm onClick={handleConfirmSelection}>OK</StyledButtonConfirm>
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
