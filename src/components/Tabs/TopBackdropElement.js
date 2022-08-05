import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { useSwipeUpDown } from 'Hooks/useSwipeUpDown'
import { mobile } from 'utils'

export default function TopBackdropElement({ setIsOpen }) {
    const {} = useSwipeUpDown({ setIsOpen })

    return (
        <Wrap
            onClick={() => {
                setIsOpen(false)
            }}
        ></Wrap>
    )
}

const Wrap = styled.div`
    height: 200px;
    background-color: rgba(0, 0, 0, 0.5);

    ${mobile`
        display: none
    `}
`
