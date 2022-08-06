import React from 'react'
import styled from 'styled-components'
import { node, bool, string, func } from 'prop-types'

import { color, font, fontSize, fontWeight } from 'utils'

const StyledButton = styled.button`
    position: relative;
    border: solid 2px ${({ withBorder }) => (withBorder ? color('background_almost_white') : 'transparent')};
    border-radius: 2px;
    color: ${({ inverted, primaryColor }) => (inverted ? color('background_almost_white') : primaryColor)};
    cursor: pointer;
    font-size: ${({ textSize }) => fontSize(textSize ?? 'default')};
    padding: 1.25rem 2rem;
    min-height: 4rem;
    transition: background-color 0.2s ease-in-out;
    font-weight: ${fontWeight('bold')};

    &:disabled {
        border-color: ${color('background_almost_white')};
        color: ${color('background_almost_white')};
        cursor: default;
    }

    &:enabled:hover {
        border-color: ${({ withBorder, primaryColor }) =>
            withBorder ? primaryColor : color('background_almost_white')};
        background: ${({ inverted, theme, primaryColor }) => (inverted ? theme.colors.white : primaryColor)};
        color: ${({ inverted, theme, primaryColor }) => (inverted ? primaryColor : theme.colors.white)};
    }
`

const Button = ({ children, disabled, customColor, inverted, isLoading = false, ...props }) => {
    return (
        <StyledButton disabled={disabled || isLoading} inverted={inverted} {...props}>
            {children}
        </StyledButton>
    )
}

Button.propTypes = {
    children: node.isRequired,
    customColor: string,
    disabled: bool,
    inverted: bool,
    withBorder: bool,
    isLoading: bool,
    onClick: func
}

export default Button
