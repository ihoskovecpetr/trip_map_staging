/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { color, fontWeight } from "utils";
import { useIsMobile } from "Hooks/useIsMobile";

import { setNewTitle, setNewSubtitle } from "redux/order/actions";
import { useTitlesSelector } from "redux/order/reducer";
import { TITLE_NAMES } from "constants/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    borderColor: "red",
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
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },

  cssFocused: {
    color: `black !important`,
  },

  notchedOutline: {
    borderWidth: "1px",
    borderColor: `${theme.palette.primary.main} !important`,
  },
}));

export default function StepTitles() {
  const { isMobile } = useIsMobile();
  const classes = useStyles();
  const dispatch = useDispatch();
  const mapTitles = useTitlesSelector();

  const handleTitleChange = (e) => {
    const targetValue = e.target.value;
    const targetName = e.target.name;

    switch (targetName) {
      case TITLE_NAMES.TITLE:
        dispatch(setNewTitle(targetValue ?? ""));
        return;
      case TITLE_NAMES.SUBTITLE:
        dispatch(setNewSubtitle(targetValue ?? ""));
        return;
      default:
        alert("Wrong input name");
    }
  };
  return (
    <div sx={styles.container}>
      {!isMobile && <HeadingText>3. Popisky</HeadingText>}
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
          label="Hlavní nadpis"
          variant="outlined"
          name="heading"
          value={mapTitles.heading.text}
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
          label="Vedlejší nadpis"
          variant="outlined"
          name="subtitle"
          value={mapTitles.subtitle.text}
          onChange={handleTitleChange}
        />
      </TextFieldsConteiner>
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

const TextFieldsConteiner = styled.div`
  display: flex;
  flex-direction: column;
`;
