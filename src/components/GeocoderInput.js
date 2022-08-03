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
    const dropdownRef = useRef(null)

    const [hoveringIndex, setHoveringIndex] = useState(0)
    const hoveringIndexRef = useRef(hoveringIndex)

    React.useEffect(() => {
        hoveringIndexRef.current = hoveringIndex
    }, [hoveringIndex])

    // const handleArrows = e => {
    //     if (e.keyCode === 40) {
    //         setHoveringIndex(prev => prev + 1)
    //     } else if (e.keyCode === 38) {
    //         setHoveringIndex(prev => prev - 1)
    //     } else if (e.keyCode === 13) {
    //         console.log({
    //             Choosen_option: address.suggestions[hoveringIndexRef.current],
    //             suggestions: address.suggestions
    //         })

    //         console.log({ enter_Key: e.keyCode, hoveringIndex, refCUr: hoveringIndexRef.current })

    //         clickOnSuggestion(address.suggestions[hoveringIndexRef.current])
    //     }
    // }

    // useEffect(() => {
    //     document.addEventListener('keydown', handleArrows)
    //     return () => {
    //         document.removeEventListener('keydown', handleArrows)
    //     }
    // }, [address])

    // useEffect(() => {
    //     const onClickAway = event => {
    //         if (dropdownRef.current?.contains(event.target) || event.target === dropdownRef.current) {
    //             return
    //         }

    //         address.setSuggestions([])
    //     }

    //     document.addEventListener('click', onClickAway, true)

    //     return () => {
    //         document.removeEventListener('click', onClickAway, true)
    //     }
    // }, [])

    // const clickOnSuggestion = suggestion => {
    //     setResult(suggestion)
    //     address.setValue(clearOnFocus ? placeholder : suggestion.place_name.split(',')[0])
    //     address.setSuggestions([])
    // }

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
                    {/* <SuggestionWrapper ref={dropdownRef}>
                        {address.suggestions.map((suggestion, index) => {
                            return (
                                <Suggestion
                                    key={index}
                                    isHovering={hoveringIndex === index}
                                    onClick={() => {
                                        clickOnSuggestion(suggestion)
                                    }}
                                >
                                    <HalfName>{suggestion.place_name.split(',')[0]}</HalfName>
                                    <FullName>{suggestion.place_name}</FullName>
                                </Suggestion>
                            )
                        })}
                    </SuggestionWrapper> */}
                    <SuggestionsWrapper address={address} setResult={setResult} placeholder={placeholder} />
                </WrapperWrapSug>
            )}
        </Wrapper>
    )
}

GeocoderInput.propTypes = {
    // children: node.isRequired,
    map: node.isRequired
    // id,
    // value,
    // setResult,
    // placeholder,
    // clearAfterResult = true,
    // style,
    // inputStyle,
    // onClick,
    // clearOnFocus = false,
    // onBlur = () => {}
    // customColor: string,
    // disabled: bool,
    // inverted: bool,
    // withBorder: bool,
    // isLoading: bool,
    // onClick: func
}

export default GeocoderInput

const Wrapper = styled.div`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
    margin: 0 auto;
    background: white;
    position: relative;
    /* display: flex;
    align-items: center; */
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

const SuggestionWrapper = styled.div`
    width: 100%;
    z-index: 22;
    background: white;
    position: relative;
    border-radius: 0px 0px 10px 10px;
    box-shadow: 0px 10px 20px grey;
    margin-bottom: 150px;
`

const Suggestion = styled.p`
    cursor: pointer;
    max-width: 400px;
    margin: 5px 0;
    padding: 0 10px;
    font-size: 14px;
    background: ${({ isHovering }) => (isHovering ? 'lightGrey' : 'transparent')};

    & :hover {
        background: lightGrey;
    }
`

const HalfName = styled.p`
    font-weight: 600;
    padding: 0;
    margin: 0;
    margin-bottom: -10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const FullName = styled.p`
    font-weight: 300;
    padding: 0;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
