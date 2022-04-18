/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { color, fontWeight } from "utils";
import { useIsMobile } from "Hooks/useIsMobile";
import { useDebounce } from "Hooks/useDebounce";
import { setNewTitle, setNewSubtitle } from "redux/order/actions";
import { useTitlesSelector } from "redux/order/reducer";
import HeadingText from "./atoms/HeadingText";
import StepContainer from "./atoms/StepContainer";
import { TAB_STEPS, TITLE_NAMES } from "@constants";
import { useTranslation } from "Hooks/useTranslation";

const useStyles = makeStyles((theme) => ({
  root: {
    borderColor: "red",
    backgroundColor: "white",
    margin: "5px",
    color: "green",
    "& > div": {
      borderColor: "red",
    },
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

  cssLabel: {
    color: "black",
  },

  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${theme.palette.cta_color.main} !important`,
    },
  },

  cssFocused: {
    color: `black !important`,
  },

  notchedOutline: {
    borderWidth: "1px",
    borderColor: `${theme.palette.cta_color.main} !important`,
  },
}));

export default function StepTitles({ index }) {
  const { isMobile } = useIsMobile();
  const classes = useStyles();
  const dispatch = useDispatch();
  const mapTitles = useTitlesSelector();
  const debounce = useDebounce({ delayInMS: 1000 });
  const t = useTranslation();

  const [defaultVal, setDefault] = useState({
    title: mapTitles.heading.text,
    subtitle: mapTitles.subtitle.text,
  });

  const dispatchNewTitle = (value) => {
    dispatch(setNewTitle(value ?? ""));
  };

  const dispatchNewSubTitle = (value) => {
    dispatch(setNewSubtitle(value ?? ""));
  };

  const handleTitleChange = (e) => {
    const targetValue = e.target.value;
    const targetName = e.target.name;

    switch (targetName) {
      case TITLE_NAMES.TITLE:
        // dispatch(setNewTitle(targetValue ?? ""));
        debounce(dispatchNewTitle, targetValue);
        return;
      case TITLE_NAMES.SUBTITLE:
        // dispatch(setNewSubtitle(targetValue ?? ""));
        debounce(dispatchNewSubTitle, targetValue);

        return;
      default:
        alert("Wrong input name");
    }
  };
  return (
    <StepContainer isMobile={isMobile}>
      <HeadingText isMobile={isMobile}>
        {index}. {t(TAB_STEPS[index].full)}
      </HeadingText>
      <TextFieldsConteiner>
        <TextField
          classes={{
            root: classes.root,
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
            inputMode: "numeric",
          }}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          id="outlined-basic"
          label={t("steps.titles.title")}
          variant="outlined"
          color="cta_color"
          name="heading"
          defaultValue={defaultVal.title}
          onChange={handleTitleChange}
        />
        <TextField
          classes={{
            root: classes.root,
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          id="outlined-basic"
          label={t("steps.titles.subtitle")}
          variant="outlined"
          name="subtitle"
          defaultValue={defaultVal.subtitle}
          onChange={handleTitleChange}
        />
      </TextFieldsConteiner>
      {/* {!isMobile && (
        <TipParagraph>
          <StyledBold>Tip!</StyledBold> Hlavní a vedlejší nadpis můžete upravit
          také přímo na mapě.
        </TipParagraph>
      )} */}
    </StepContainer>
  );
}

const TextFieldsConteiner = styled.div`
  display: flex;
  flex-direction: column;
`;

const TipParagraph = styled.p`
  margin: "20px 0px";
  font-weight: ${fontWeight("light")};
`;

const StyledBold = styled.span`
  font-weight: 600;
  color: black;
`;
