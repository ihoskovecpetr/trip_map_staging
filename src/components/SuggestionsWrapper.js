import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const SuggestionsWrapper = ({ setResult, address, clearOnFocus = false, placeholder }) => {
    const dropdownRef = useRef(null)

    const [hoveringIndex, setHoveringIndex] = useState(0)
    const hoveringIndexRef = useRef(hoveringIndex)

    React.useEffect(() => {
        hoveringIndexRef.current = hoveringIndex
    }, [hoveringIndex])

    const handleArrows = e => {
        if (e.keyCode === 40) {
            setHoveringIndex(prev => prev + 1)
        } else if (e.keyCode === 38) {
            setHoveringIndex(prev => prev - 1)
        } else if (e.keyCode === 13) {
            clickOnSuggestion(address.suggestions[hoveringIndexRef.current])
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleArrows)
        return () => {
            document.removeEventListener('keydown', handleArrows)
        }
    }, [address])

    useEffect(() => {
        const onClickAway = event => {
            if (dropdownRef.current?.contains(event.target) || event.target === dropdownRef.current) {
                return
            }

            address.setSuggestions([])
        }

        document.addEventListener('click', onClickAway, true)

        return () => {
            document.removeEventListener('click', onClickAway, true)
        }
    }, [])

    const clickOnSuggestion = suggestion => {
        setResult(suggestion)
        address.setValue(clearOnFocus ? placeholder : suggestion.place_name.split(',')[0])
        address.setSuggestions([])
    }

    return (
        <SuggestionWrapper ref={dropdownRef}>
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
        </SuggestionWrapper>
    )
}

SuggestionsWrapper.propTypes = {
    // address:
}

export default SuggestionsWrapper

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
