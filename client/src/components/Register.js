import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import google from "../icons/google.png";
import facebookIcon from "../icons/facebook.png";
import CustomDivider from "./CustomDivider";
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = () => ({
  formText: {
    fontSize: 13
  },
  login: {
    marginTop: 20,
    marginBottom: 20
  },
  card: {
    padding: 15
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    const obj = {
      val: null,
      helper: null,
      err: false
    };

    this.state = {
      checked: false,
      email: obj,
      password1: obj,
      password2: obj,
      name: obj,
      redirectTo: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleCheckbox = () => {
    this.setState({ checked: !this.state.checked });
  };

  handleInputChange = event => {
    const input_name = event.target.name;
    const input_value = event.target.value;

    this.setState({
      [input_name]: {
        val: input_value,
        helper: '',
        err: false,
      }
    });
  };

  handleInputBlur = event => {
    let error, err_msg;
    const input_name = event.target.name;
    const input_value = event.target.value;

    /* RegEx test based on input-type.
    ** returns Boolean */
    const testRegEx = (type, value) => {
      const regEx = {
        name: /^\s*[0-9a-zA-Z][0-9a-zA-Z '-]{2,35}$/,
        email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      };

      return regEx[type].test(value);
    };

    switch (input_name) {
      case 'name':
        err_msg = !input_value ? 'Name must not be empty !' : (!testRegEx('name', input_value) ? 'Please enter a valid name !' : null);
        break;
      case 'email':
        err_msg = !input_value ? 'Email address must not be empty !' : (!testRegEx('email', input_value) ? 'Please enter a valid email !' : null);
        break;
      case 'password1':
        err_msg = !input_value ? 'Please enter a password !' : (!testRegEx('password', input_value) ? 'Password must be alphanumeric and minimum six characters long.' : null);
        break;
      case 'password2':
        err_msg = !input_value ? 'Please enter password again !' : ((input_value !== this.state.password1.val) ? 'Passwords dont match !' : null);
        break;
      default:
        break;
    }

    error = (!input_value || err_msg) ? true : false;

    const state_val = {
      val: input_value,
      helper: err_msg,
      err: error
    };

    this.setState({ [input_name]: state_val });
  };

  handleSubmit = () => {
    const data = {
      username: this.state.email.val,
      password: this.state.password1.val
    };
    //request to server to add a new username/password
    fetch('/user/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        if (response._id) {
          this.props.openToast({
            open: true,
            msg: 'Successfully signed up!',
            variant: 'success'
          })
          //redirect to login page
          this.setState({
            redirectTo: '/login'
          });
        } else {
          this.props.openToast({
            open: true,
            msg: response.error,
            variant: 'error'
          })
        }
      }).catch(error => {
        console.log(error);
        this.props.openToast({
          open: true,
          msg: 'Something went wrong.',
          variant: 'error'
        })
      });
  }

  handleRegisterClick = (e) => {
    e.preventDefault();
    const { name, email, password1, password2, checked } = this.state;
    if (!name.val || !email.val || !password1.val || !password2.val) {
      this.props.openToast({
        open: true,
        msg: 'Please fill up all the fields first !',
        variant: 'warning'
      })
      return;
    } else if (!checked) {
      this.props.openToast({
        open: true,
        msg: 'You must agree to the terms & conditions !',
        variant: 'warning'
      })
      return;
    }
    this.handleSubmit();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.login}>
        <Card className={classes.card}>
          <div className="card-content">
            <div className="centeredFlex">
              <Button variant="raised" className="social-button">
                <img alt="Sign in with Google" src={google} height="20" />
                &nbsp; Sign Up with Google &nbsp; &nbsp;
              </Button>
            </div>
            <div className="centeredFlex" style={{ marginTop: 8 }}>
              <Button variant="raised" className="social-button" color="inherit">
                <img alt="Sign in with Google" src={facebookIcon} height="20" />
                &nbsp; Sign Up with Facebook
              </Button>
            </div>
            <br />
            <CustomDivider />
            <div style={{ marginTop: 5 }}>
              <FormHelperText id="name-helper">{this.state.name.helper}</FormHelperText>
              <Input
                placeholder="Enter your name"
                className="input"
                name="name"
                error={this.state.name.err}
                onBlur={this.handleInputBlur}
                onChange={this.handleInputChange}
                fullWidth
              />
            </div>
            <div>
              <FormHelperText id="email-helper">{this.state.email.helper}</FormHelperText>
              <Input
                placeholder="Enter your email address"
                className="input"
                name="email"
                error={this.state.email.err}
                onBlur={this.handleInputBlur}
                onChange={this.handleInputChange}
                fullWidth
              />
            </div>
            <div>
              <FormHelperText id="password1-helper">{this.state.password1.helper}</FormHelperText>
              <Input
                fullWidth
                placeholder="Enter password"
                type="password"
                name="password1"
                error={this.state.password1.err}
                onBlur={this.handleInputBlur}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <FormHelperText id="password2-helper">{this.state.password2.helper}</FormHelperText>
              <Input
                fullWidth
                placeholder="Enter password again"
                type="password"
                name="password2"
                error={this.state.password2.err}
                onBlur={this.handleInputBlur}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="inline-flex" >
              <Checkbox
                checked={this.state.checked}
                onChange={this.handleCheckbox}
                color="primary"
              />
              <div className='form-text'>
                I agree to the terms & conditions
              </div>
            </div>
            <div className="centeredFlex">
              <Button
                variant="raised"
                color="primary"
                className="login-button"
                onClick={this.handleRegisterClick}
              >
                Sign Up
              </Button>
            </div>
            <br />
            <div className="inline-flex">
              <div className="form-text">
                Already have an account? &nbsp;
              </div>
              <Link to="/login" style={{ textDecoration: "none", color: "blue", marginLeft: 'auto' }}>
                <Button variant="raised" className="login-button" color="secondary">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
