import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import blue from "@material-ui/core/colors/orange";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

function Loader(props) {
  const { size, thickness, classes } = props;
  return (
    <div className="centered">
      <CircularProgress
        className={classes.progress}
        style={{ color: blue[500] }}
        thickness={thickness || 5}
        size={size || 120}
      />
    </div>
  );
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loader);