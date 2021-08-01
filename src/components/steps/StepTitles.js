/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { color, fontWeight } from "utils";
import { useIsMobile } from "../../Hooks/useIsMobile";
import { orientationSwitcher } from "../../LibGlobal/getOrientationSwitcher";

const useStyles = makeStyles((theme) => ({
  root: {
    borderColor: "red",
    color: "green",
    "& > div": {
      borderColor: "blue",
    },
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "green !important",
  },
}));

export default function StepTitles({
  product,
  setProduct,
  mapTitles,
  setMapTitles,
}) {
  const { isMobile } = useIsMobile();
  const classes = useStyles();
  console.log({ mapTitles });
  return (
    <div sx={styles.container}>
      {!isMobile && <HeadingText>3. Popisky</HeadingText>}

      <TextField
        classes={{
          root: classes.root,
        }}
        InputProps={{
          classes: {
            // root: classes.cssOutlinedInput,
            // focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          },
          inputMode: "numeric",
        }}
        id="outlined-basic"
        label="Hlavní"
        variant="outlined"
        value={mapTitles.heading.text}
      />
      <TextField
        value={mapTitles.subtitle.text}
        id="outlined-basic"
        label="Vedlejší"
        variant="outlined"
      />
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    position: "relative",
    paddingTop: "15px",
  },
};

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;

const StyledTextField = styled(TextField)`
  border-color: red !important;
`;

const SingleOrientationItem = styled.div`
  flex-basis: 30%;
  margin: 2%;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-color: ${({ active }) => active && color("cta_color")};
`;

const IconWrap = styled.div`
  flex-basis: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ active }) => !active && "pointer"};

  & > div {
    color: rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 0 3px;
  }
`;

const WideMock = styled.div`
  height: 30px;
  width: 50px;
  color: ${({ active }) => active && color("cta_color")};
`;

const HighMock = styled.div`
  height: 50px;
  width: 30px;
  color: ${({ active }) => active && color("cta_color")};
  pointer-events: ${({ active }) => active && "none"};
`;

const StyledDescriptionP = styled.p`
  text-align: center;
  color: ${({ active }) => active && color("cta_color")};
  font-weight: ${fontWeight("regular")};
  margin: 3px 0;
`;

const TipParagraph = styled.p`
  margin: "20px 0px";
  font-weight: ${fontWeight("light")};
`;

const StyledBold = styled.span`
  font-weight: 600;
  color: black;
`;
