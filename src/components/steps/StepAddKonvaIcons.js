/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { color, fontWeight } from "utils";
import { useIsMobile } from "Hooks/useIsMobile";
import pin_real from "assets/icons/pin_real.png";
import pin_cartoon_2_sm from "assets/icons/pin_cartoon_2_sm.png";
import location_black_sm from "assets/icons/location_black_sm.png";
import red_flag_sm from "assets/icons/red_flag_sm.png";
import text_icon from "assets/icons/text_icon.png";
import background_corners from "assets/border_corners.png";

import {
  useKonvaIconsSelector,
  useIsKonvaEnabledSelector,
} from "redux/order/reducer";

import {
  setAddKonvaIcon,
  setRemoveKonvaIcon,
  setUpdateKonvaIcon,
  setIsKonvaEnabled,
  setIsKonvaRendered,
} from "redux/order/actions";

import { MAP_ICONS } from "constants/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    borderColor: "red",
    margin: "5px",
    width: "100%",
    color: "green",
    "& > div": {
      borderColor: "red",
    },
  },

  // textField: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  //   width: 200,
  // },

  // cssLabel: {
  //   color: "black",
  // },

  // cssOutlinedInput: {
  //   "&$cssFocused $notchedOutline": {
  //     borderColor: `${theme.palette.primary.main} !important`,
  //   },
  // },

  // cssFocused: {
  //   color: `black !important`,
  // },

  // notchedOutline: {
  //   borderWidth: "1px",
  //   borderColor: `${theme.palette.primary.main} !important`,
  // },
}));

const AVAILABLE_ICONS = [
  MAP_ICONS.PIN_REAL,
  MAP_ICONS.PIN_CARTOON_2,
  MAP_ICONS.LOCATION_BLACK,
  MAP_ICONS.RED_FLAG,
];

export default function StepAddKonvaIcons({ map }) {
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch();
  const iconsRedux = useKonvaIconsSelector();
  const isKonvaEnabled = useIsKonvaEnabledSelector();
  const classes = useStyles();

  const addIcon = (iconType) => () => {
    dispatch(
      setAddKonvaIcon({
        id: Math.random().toFixed(3).toString(),
        x: 0.5, //Math.random()
        y: 0.5,

        rotation: Math.random() * 180,
        isDragging: false,
        iconType: iconType,
        textValue: "Default Value Queensland",
        timeAdded: new Date(),
      })
    );
  };

  const removeIcon = (iconId) => () => {
    dispatch(setRemoveKonvaIcon(iconId));
  };

  const getThumbnailIcon = (iconType) => {
    switch (iconType) {
      case MAP_ICONS.PIN_REAL:
        return pin_real;
      case MAP_ICONS.PIN_CARTOON_2:
        return pin_cartoon_2_sm;
      case MAP_ICONS.LOCATION_BLACK:
        return location_black_sm;
      case MAP_ICONS.RED_FLAG:
        return red_flag_sm;
      case MAP_ICONS.TEXT:
        return text_icon;
    }
  };

  const updateTextValue = (icon) => (e) => {
    dispatch(setUpdateKonvaIcon({ ...icon, textValue: e.target.value }));
  };

  const getIconDescBodyElement = (icon) => {
    switch (icon.iconType) {
      case MAP_ICONS.PIN_REAL:
      case MAP_ICONS.PIN_CARTOON_2:
      case MAP_ICONS.LOCATION_BLACK:
      case MAP_ICONS.RED_FLAG:
        return <StyledBodyP>{icon.iconType}</StyledBodyP>;
      case MAP_ICONS.TEXT:
        return (
          <TextField
            classes={{
              root: classes.root,
            }}
            // InputProps={{
            //   classes: {
            //     root: classes.cssOutlinedInput,
            //     focused: classes.cssFocused,
            //     notchedOutline: classes.notchedOutline,
            //   },
            //   inputMode: "numeric",
            // }}
            // InputLabelProps={{
            //   classes: {
            //     root: classes.cssLabel,
            //     focused: classes.cssFocused,
            //   },
            // }}
            id="outlined-basic"
            // label="Hlavní nadpis"
            // variant="outlined"
            name="text"
            value={icon.textValue}
            // value={mapTitles.heading.text}
            onChange={updateTextValue(icon)}
          />
        );
      default:
        "Nic";
    }
  };

  const handleChange = (event) => {
    dispatch(setIsKonvaEnabled(event.target.checked));
    dispatch(setIsKonvaRendered(event.target.checked));
  };

  return (
    <>
      <div sx={styles.container}>
        {!isMobile && <HeadingText>9. Pridejte ikony</HeadingText>}
        {isMobile && (
          <CheckboxContainer>
            <FormControlLabel
              control={
                <Checkbox checked={isKonvaEnabled} onChange={handleChange} />
              }
              label="Add icons"
            />
          </CheckboxContainer>
        )}
      </div>
      {isKonvaEnabled && (
        <>
          <AddIconContainer>
            {AVAILABLE_ICONS.map((icon) => (
              <AddIconItem onClick={addIcon(icon)}>
                <StyledButtonImg src={getThumbnailIcon(icon)} />
                <StyledIconDescription>
                  {MAP_ICONS.PIN_REAL}
                </StyledIconDescription>
              </AddIconItem>
            ))}
          </AddIconContainer>
          <CurrentIconContainer>
            {iconsRedux?.map((icon) => (
              <CurrentIconItem>
                <StyledImg src={getThumbnailIcon(icon.iconType)} />
                {getIconDescBodyElement(icon)}
                <StyledCloseIcon onClick={removeIcon(icon.id)} />
              </CurrentIconItem>
            ))}
          </CurrentIconContainer>
        </>
      )}
    </>
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

const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const StyledButtonImg = styled.img`
  width: 50px;
  height: 50px;
`;

const AddIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  border-bottom: 2px solid ${color("primary")};
  margin-bottom: 15px;
`;

const StyledBodyP = styled.p`
  margin: 0;
`;

const AddIconItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 15px;
  margin-bottom: 5px;
`;

const StyledIconDescription = styled.p`
  margin: 0;
  margin-top: 5px;
  text-transform: uppercase;
  // color: ${color("muted")};
`;

const CurrentIconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const CurrentIconItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 5px;
  border: 1px solid ${color("cta_color")};
  border-radius: 3px;
  margin-bottom: 3px;
`;

const StyledImg = styled.img`
  width: 40px;
  height: 40px;
  margin: 5px;
`;

const StyledCloseIcon = styled(CloseIcon)`
  padding: 0.1rem;
  color: ${color("primary")};
  background-color: ${color("whitish_paper_blue")};
  border-radius: 5px;
  cursor: pointer;
`;
