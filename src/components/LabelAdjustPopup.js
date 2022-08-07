import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'

import BackdropFromScratch from 'components/BackdropFromScratch'
import { mobile, color, fontSize } from 'utils'
import closeIcon from 'assets/close.png'
import { ADJUST_LABEL_COOKIE_NAME } from 'constants/constants'
import { useTranslation } from 'Hooks/useTranslation'

export default function LabelAdjustPopup() {
    const t = useTranslation()

    const [open, setOpen] = useState(true)

    const onCLickBox = e => {
        e.stopPropagation()
    }

    const handleOK = _ => {
        setOpen(false)
        Cookies.set(ADJUST_LABEL_COOKIE_NAME, 'true')
    }

    useEffect(() => {
        document.getElementById('vid')?.play()
    }, [])

    const isSeenPopup = Cookies.get(ADJUST_LABEL_COOKIE_NAME)

    return (
        <>
            {open && !isSeenPopup && (
                <BackdropFromScratch open={open} onClick={() => setOpen(!open)}>
                    <BoxWrap onClick={onCLickBox}>
                        <h1>{t('step.location.popupTitle')}</h1>
                        <CloseIconWrap>
                            <StyledCloseIcon onClick={() => setOpen(!open)} src={closeIcon} />
                        </CloseIconWrap>
                        <h3>{t('step.location.popupSubtitle')}</h3>

                        <StyledVideo
                            muted
                            id="vid"
                            width="100%"
                            height="100%"
                            autoplay
                            Autoplay="autoplay"
                            playsinline
                            // controls="true"
                            loop
                            // poster={displayPNG ? '/video_fallback.png' : '/video_fallback.webp'}
                        >
                            <source src="/move_label_video.mov" type="video/mp4" media="all and (max-width: 480px)" />
                            Your browser does not support the video tag.
                        </StyledVideo>
                        <ButtonsBox>
                            <StyledButtonConfirm onClick={handleOK}>OK</StyledButtonConfirm>
                        </ButtonsBox>
                    </BoxWrap>
                </BackdropFromScratch>
            )}
        </>
    )
}

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

const StyledVideo = styled.video`
    /* width: 100%; */
    min-height: 230px;
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
