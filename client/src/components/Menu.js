import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Target, Popper } from 'react-popper';
import AccountCircle from "@material-ui/icons/AccountCircle";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Portal from '@material-ui/core/Portal';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import Link from 'react-router-dom/Link';


const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  popperClose: {
    pointerEvents: 'none',
  },
});

class AccountMenu extends React.Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.target.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Manager>
          <Target>
            <div
              ref={node => {
                this.target = node;
              }}
            >
              <IconButton
                aria-owns={open ? 'menu-list-collapse' : null}
                aria-haspopup="true"
                onClick={this.handleToggle}
                style={{ color: "white", marginLeft: "auto" }}
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Target>
          <Portal>
            <Popper
              placement="bottom"
              eventsEnabled={open}
              className={classNames({ [classes.popperClose]: !open })}
            >
              <ClickAwayListener onClickAway={this.handleClose}>
                <Collapse in={open} id="menu-list-collapse" style={{ transformOrigin: '0 0 0' }}>
                  <Paper style={{ margin: 3 }}>
                    <MenuList role="menu" style={{paddingTop: '0', paddingBottom: '0'}}>
                      <MenuItem onClick={this.handleClose}>My account</MenuItem>
                      <Link to='/logout' style={{ textDecoration: "none", color: "blue"}}><MenuItem onClick={this.handleClose}>Logout</MenuItem></Link>
                    </MenuList>
                  </Paper>
                </Collapse>
              </ClickAwayListener>
            </Popper>
          </Portal>
        </Manager>
      </div>
    );
  }
}

AccountMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountMenu);
