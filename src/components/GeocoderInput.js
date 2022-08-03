import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useGeocodeInput from 'Hooks/useGeocodeInput'
import { node } from 'prop-types'
import SuggestionsWrapper from './SuggestionsWrapper'

const GeocoderInput = props => {
    const {
        map,
        id,
        initValue,
        setResult,
        placeholder,
        clearAfterResult = true,
        style,
        inputStyle,
        onClick,
        clearOnFocus = false,
        onBlur = () => {}
    } = props
    const address = useGeocodeInput(initValue, map)

    const [hoveringIndex, setHoveringIndex] = useState(0)
    const hoveringIndexRef = useRef(hoveringIndex)

    React.useEffect(() => {
        hoveringIndexRef.current = hoveringIndex
    }, [hoveringIndex])

    return (
        <Wrapper key={id} style={style}>
            <Input
                placeholder={placeholder}
                {...address}
                isTyping={address.value !== ''}
                onClick={onClick}
                onFocus={e => {
                    clearOnFocus && address.setValue('')
                }}
                style={inputStyle}
                onBlur={onBlur}
            />
            {address.suggestions?.length > 0 && (
                <WrapperWrapSug>
                    <SuggestionsWrapper
                        address={address}
                        setResult={setResult}
                        placeholder={placeholder}
                        clearAfterResult={clearAfterResult}
                    />
                </WrapperWrapSug>
            )}
        </Wrapper>
    )
}

GeocoderInput.propTypes = {
    map: node.isRequired
}

export default GeocoderInput

const Wrapper = styled.div`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
    margin: 0 auto;
    background: white;
    position: relative;
`

const Input = styled.input`
    border: none;
    padding: 5px 10px;
    font: inherit;
    position: relative;
    display: grid;
    justify-self: center;
    &:focus {
        outline: none;
    }
`

const WrapperWrapSug = styled.div`
    max-width: 250px;
    position: relative;
    height: 0px;
`
