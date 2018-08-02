import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Manager, Target, Popper } from 'react-popper';
import AccountCircle from "@material-ui/icons/AccountCircle";
import Collapse from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Portal from '@material-ui/core/Portal';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import Link from 'react-router-dom/Link';


const styles = theme => ({
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  popperClose: {
    pointerEvents: 'none',
  },
});

class AccountMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

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
    document.getElementById('root').onclick = this.handleClose;

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
              <Collapse in={open} id="menu-list-collapse" >
                <Paper style={{ margin: 3 }}>
                  <MenuList role="menu" style={{ paddingTop: '0', paddingBottom: '0' }}>
                    {this.props.loggedIn && <MenuItem onClick={this.handleClose}>My account</MenuItem>}
                    <Link to={this.props.loggedIn ? '/logout' : '/login'} style={{ textDecoration: "none", color: "blue" }}><MenuItem onClick={this.handleClose}>{this.props.loggedIn ? 'Logout' : 'Login'}</MenuItem></Link>
                  </MenuList>
                </Paper>
              </Collapse>
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
