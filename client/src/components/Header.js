import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "./Menu";
import icon from "./logo.png";
import { Link } from "react-router-dom";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Header extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="static" className="header">
          <Toolbar>
            <Link to="/" style={{ color: "white", textDecoration: 'none'}}>
              <div className="inline-flex">
                <img alt="Sign in with Google" src={icon} height="55" width="150"/>
              </div>
            </Link>
            <div style={{ marginLeft: "auto" }}>
              <Menu />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
