import React, { useEffect } from "react";
import styled from "styled-components";
import useInput from "hooks/useGeocodeInput";

const GeocoderInput = ({
  id,
  value,
  setResult,
  placeholder,
  clearAfterResult = true,
  style,
  focusCallback,
  onClick,
}) => {
  const address = useInput(value);

  useEffect(() => {
    console.log({ address });
  }, [address.value]);

  return (
    <Wrapper key={id} style={style}>
      <Input
        placeholder={value}
        {...address}
        isTyping={address.value !== ""}
        onClick={onClick}
      />
      {address.suggestions?.length > 0 && (
        <WrapperWrapSug>
          <SuggestionWrapper>
            {address.suggestions.map((suggestion, index) => {
              return (
                <>
                  {console.log({ sug: suggestion })}
                  <Suggestion
                    key={index}
                    onClick={() => {
                      console.log({ suggestion });
                      setResult(suggestion);
                      address.setValue(suggestion.place_name);
                      address.setSuggestions([]);
                    }}
                  >
                    <HalfName>{suggestion.place_name.split(",")[0]}</HalfName>
                    <FullName>{suggestion.place_name}</FullName>
                  </Suggestion>
                </>
              );
            })}
          </SuggestionWrapper>
        </WrapperWrapSug>
      )}
    </Wrapper>
  );
};

export default GeocoderInput;

const Wrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0 auto;
`;

const WrapperWrapSug = styled.div`
  transform: translateX(0);
`;

const Input = styled.input`
  width: 200px;
  background: white;
  border: none;
  padding: 10px 20px;
  // border-radius: 30px;
  position: relative;
  display: grid;
  justify-self: center;
  &:focus {
    outline: none;
    // border-radius: ${(props) => props.isTyping && "10px 10px 0px 0px"};
  }
`;

const SuggestionWrapper = styled.div`
  width: 200px;
  background: white;
  position: absolute;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0px 10px 20px grey;
`;

const Suggestion = styled.p`
  cursor: pointer;
  max-width: 400px;
  margin: 5px 0;
  padding: 0 10px;
  font-size: 14px;

  & :hover {
    background: lightGrey;
  }
`;

const HalfName = styled.p`
  font-weight: 600;
  padding: 0;
  margin: 0;
  margin-bottom: -10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FullName = styled.p`
  font-weight: 300;
  padding: 0;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
