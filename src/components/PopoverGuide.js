import React, { useEffect } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
    marginLeft: "10px",
  },
  paper: {
    padding: theme.spacing(1),
    background: "black",
    color: "white",
  },
}));

export default function PopoverGuide({ children, relatedId, legend }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const handlePopoverOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  useEffect(() => {
    setTimeout(() => {
      setAnchorEl(document.getElementById(relatedId));
    }, 1000);
    window.addEventListener("mousedown", () => handlePopoverClose());

    return () => {
      window.removeEventListener("mousedown", () => handlePopoverClose());
    };
  }, []);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const ariaResult = open ? "mouse-over-popover" : undefined;

  return (
    <div>
      {React.cloneElement(children, {
        "aria-owns": ariaResult,
        "aria-haspopup": true,
        // onMouseEnter: handlePopoverOpen,
        // onMouseLeave: handlePopoverClose,
      })}

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{legend}</Typography>
      </Popover>
    </div>
  );
}
