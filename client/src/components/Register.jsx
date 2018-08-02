import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, Checkbox, Input, Card, FormHelperText } from "@material-ui/core";
import { Link } from "react-router-dom";
import GoogleIcon from "../icons/google.png";
import FacebookIcon from "../icons/facebook.png";
import CustomDivider from "./CustomDivider";
import { createUser } from "../api";
import { validateInp } from "../helper";

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
  }
});

class Login extends Component {
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
      redirectTo: null
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
        helper: "",
        err: false
      }
    });
  };

  handleInputBlur = event => {
    let error, err_msg;
    const input_name = event.target.name;
    const input_value = event.target.value;

    switch (input_name) {
      case "name":
        err_msg = !input_value
          ? "Name must not be empty !"
          : !validateInp("name", input_value)
            ? "Please enter a valid name !"
            : null;
        break;
      case "email":
        err_msg = !input_value
          ? "Email address must not be empty !"
          : !validateInp("email", input_value)
            ? "Please enter a valid email !"
            : null;
        break;
      case "password1":
        err_msg = !input_value
          ? "Please enter a password !"
          : !validateInp("password", input_value)
            ? "Password must be alphanumeric and minimum six characters long."
            : null;
        break;
      case "password2":
        err_msg = !input_value
          ? "Please enter password again !"
          : input_value !== this.state.password1.val
            ? "Passwords dont match !"
            : null;
        break;
      default:
        break;
    }

    error = !input_value || err_msg ? true : false;

    const state_val = {
      val: input_value,
      helper: err_msg,
      err: error
    };

    this.setState({ [input_name]: state_val });
  };

  handleSubmit = () => {
    const user = {
      username: this.state.email.val,
      password: this.state.password1.val
    };
    
    createUser(user)
      .then(response => {
        if (response._id) {
          this.props.openToast({
            open: true,
            msg: "Successfully signed up!",
            variant: "success"
          });
          //redirect to login page
          this.setState({
            redirectTo: "/login"
          });
        } else {
          this.props.openToast({
            open: true,
            msg: response.error,
            variant: "error"
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.props.openToast({
          open: true,
          msg: "Something went wrong.",
          variant: "error"
        });
      });
  };

  handleRegisterClick = e => {
    e.preventDefault();
    const { name, email, password1, password2, checked } = this.state;
    if (!name.val || !email.val || !password1.val || !password2.val) {
      this.props.openToast({
        open: true,
        msg: "Please fill up all the fields first !",
        variant: "warning"
      });
      return;
    } else if (!checked) {
      this.props.openToast({
        open: true,
        msg: "You must agree to the terms & conditions !",
        variant: "warning"
      });
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
                <img alt="Sign in with Google" src={GoogleIcon} height="20" />
                Sign Up with Google
              </Button>
            </div>
            <div className="centeredFlex" style={{ marginTop: 8 }}>
              <Button
                variant="raised"
                className="social-button"
                color="inherit"
              >
                <img alt="Sign in with Google" src={FacebookIcon} height="20" />
                Sign Up with Facebook
              </Button>
            </div>
            <br />
            <CustomDivider />
            <div style={{ marginTop: 5 }}>
              <FormHelperText id="name-helper">
                {this.state.name.helper}
              </FormHelperText>
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
              <FormHelperText id="email-helper">
                {this.state.email.helper}
              </FormHelperText>
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
              <FormHelperText id="password1-helper">
                {this.state.password1.helper}
              </FormHelperText>
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
              <FormHelperText id="password2-helper">
                {this.state.password2.helper}
              </FormHelperText>
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
            <div className="inline-flex">
              <Checkbox
                checked={this.state.checked}
                onChange={this.handleCheckbox}
                color="primary"
              />
              <div className="form-text">I agree to the terms & conditions</div>
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
              <div className="form-text">Already have an account?</div>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "blue",
                  marginLeft: "auto"
                }}
              >
                <Button
                  variant="raised"
                  className="login-button"
                  color="secondary"
                >
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
