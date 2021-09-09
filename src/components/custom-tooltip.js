import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

import { color, fontWeight, mobile } from "utils";

const useStyles = makeStyles((theme) => ({
  customTooltip: {
    backgroundColor: "rgba(220, 0, 78, 0.99)",
    userSelect: "none",
    width: "200px",
    maxWidth: "50vw",
  },
  customArrow: {
    color: "rgba(220, 0, 78, 0.99)",
  },
}));

export default function TooltipWrap({ children, body, defaultState, onClose }) {
  const classes = useStyles();
  const [isTooltipOpen, setIsTooltipOpen] = useState(defaultState);

  const closeTooltip = (e) => {
    setIsTooltipOpen(false);
    onClose(e);
  };

  return (
    <StyledTooltip
      interactive
      classes={{
        tooltip: classes.customTooltip,
        arrow: classes.customArrow,
      }}
      title={
        <TooltipBody>
          <Content>{body}</Content>
          <ButtonWrap>
            <Button onClick={closeTooltip} variant="contained" color="primary">
              OK
            </Button>
          </ButtonWrap>
        </TooltipBody>
      }
      placement="bottom-center"
      arrow
      open={isTooltipOpen}
      // onClose={(e) => {
      //   e.preventDefault();
      //   e.stopPropagation();
      // }}
    >
      {children}
    </StyledTooltip>
  );
}

const StyledTooltip = styled(Tooltip)`
  .MuiTooltip-popper {
    background-color: ${color("cta_color")} !important;
    border: 1px solid green;
  }
`;

const TooltipBody = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div``;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`;

const StyledCloseIcon = styled(CloseIcon)`
  padding: 0.1rem;
  color: ${color("background_almost_white")};
  border-radius: 5px;
  border: 2px solid;
  pointer-events: auto;
  cursor: pointer;
  margin-top: 0px;
  z-index: 100;
  position: absolute;
`;
