/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { color, fontWeight } from 'utils'
import { useIsMobile } from '../../Hooks/useIsMobile'
import { getFlippedSizeObject } from 'LibGlobal/getFlippedSizeObject'
import { setProductAction } from 'redux/order/actions'
import { useProductSelector } from 'redux/order/reducer'
import HeadingText from './atoms/HeadingText'
import StepContainer from './atoms/StepContainer'
import { TAB_STEPS } from '@constants'
import { useTranslation } from 'Hooks/useTranslation'

export default function StepOrientation({ index }) {
    const { isMobile } = useIsMobile()
    const t = useTranslation()
    const dispatch = useDispatch()
    const productRedux = useProductSelector()

    const isProductWide = product => {
        if (product.sizeObject.ratio < 1) {
            return true
        }
        return false
    }

    const switchOrientation = () => {
        dispatch(
            setProductAction({
                sizeObject: getFlippedSizeObject(productRedux)
            })
        )
    }

    return (
        <StepContainer isMobile={isMobile}>
            <HeadingText isMobile={isMobile}>
                {index}. {t(TAB_STEPS[index].full)}
            </HeadingText>

            <OrientationWrap>
                <SingleOrientationItem onClick={switchOrientation} active={!isProductWide(productRedux)}>
                    <IconWrap>
                        <HighMock active={!isProductWide(productRedux)} />
                    </IconWrap>

                    <StyledDescriptionP
                        active={!isProductWide(productRedux)}
                        onClick={isProductWide(productRedux) ? switchOrientation : undefined}
                    >
                        {t('steps.portrait')}
                    </StyledDescriptionP>
                </SingleOrientationItem>
                <SingleOrientationItem onClick={switchOrientation} active={isProductWide(productRedux)}>
                    <IconWrap>
                        <WideMock active={isProductWide(productRedux)} />
                    </IconWrap>

                    <StyledDescriptionP
                        onClick={!isProductWide(productRedux) ? switchOrientation : undefined}
                        active={isProductWide(productRedux)}
                    >
                        {t('steps.landscape')}
                    </StyledDescriptionP>
                </SingleOrientationItem>
            </OrientationWrap>
        </StepContainer>
    )
}

const OrientationWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;

    margin-bottom: 10px;
`

const SingleOrientationItem = styled.div`
    flex-basis: 30%;
    margin: 2%;
    display: flex;
    flex-direction: column;
    border-radius: 3px;
`

const IconWrap = styled.div`
    flex-basis: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${({ active }) => !active && 'pointer'};
`

const WideMock = styled.div`
    height: 40px;
    width: 70px;
    color: ${({ active }) => active && color('cta_color')};
    background-color: lightGrey;
    border: 3px solid rgba(0, 0, 0, 0);
    border-radius: 3px;
    border-color: ${({ active }) => active && color('cta_color')};
`

const HighMock = styled.div`
    height: 70px;
    width: 40px;
    color: blue;
    pointer-events: ${({ active }) => active && 'none'};
    background-color: lightGrey;
    border: 3px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    border-color: ${({ active }) => active && color('cta_color')};
`
// box-shadow: ${({ active }) =>
//   active ? "0px 0px 0px 8px" : "0px 0px 0px 1px"};

const StyledDescriptionP = styled.p`
    text-align: center;
    // color: ${({ active }) => !active && color('muted')};
    font-weight: ${({ active }) => active && fontWeight('bold')};
    margin: 3px 0;
`
