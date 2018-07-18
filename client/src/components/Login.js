import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import googleIcon from "../icons/google.png";
import facebookIcon from "../icons/facebook.png";
import CustomDivider from "./CustomDivider";
import FormHelperText from '@material-ui/core/FormHelperText';
import Toast from './Toast';
import Loader from './Loader';

const styles = theme => ({
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
    // create a ref to store the textInput DOM element
    this.emailInput = React.createRef();
    //this.focusTextInput = this.focusTextInput.bind(this);
    this.state = {
      loading: false,
      checked: false,
      email: '',
      password: '',
      email_helper: '',
      password_helper: '',
      toast: {
        open: false,
        msg: '',
        variant: null
      },
      redirectTo: this.props.redirectTo || '/',
    };
  }

  closeToast = () => {
    this.setState({
      toast: { open: false }
    })
  }

  handleSubmit = () => {
    const user = {
      username: this.state.email,
      password: this.state.password,
    };

    fetch('/user/login', {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: 'POST',
      credentials: "same-origin",
      body: JSON.stringify(user)
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          // update Main state
          response.json();

          this.setState({
            loading: true, 
            toast: {
              open: true,
              variant: 'error',
              msg: 'Successfuly logged in !'
            } 
          });
          
          this.props.updateUser({
            isAuthenticated: true,
            username: response.username,
          })

          window.location.reload(true);
        } else {
          this.setState({ 
            toast: {
              open: true,
              variant: 'error',
              msg: 'Wrong Username/Password !'
            } 
          });
        }
      })
      .catch(error => console.log(error));
  }


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.check_remember });
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLoginClick = () => {
    if (!this.state.email || !this.state.password) {
      this.setState({ 
        toast: {
          open: true,
          variant: 'warning',
          msg: "Enter your email and password first!"
        } 
      });
      return;
    }
    this.handleSubmit();
  };



  render() {
    const { classes } = this.props;

    const {toast} = this.state;

    if (this.props.loggedIn) {
      window.location.href = this.state.redirectTo;
      return (<div className="centered-flex"><Loader /></div>);
    }

    if (this.state.loading) return (<div className="centered-flex"><Loader /></div>);

    return (
      <div className={classes.login}>
        <Card className={classes.card}>
          <div className="card-content">
            <div className="centeredFlex">
              <Button variant="raised" className="social-button">
                <img alt="Sign in with Google" src={googleIcon} height="22" />
                &nbsp; Log in with Google &nbsp; &nbsp;
              </Button>
            </div>
            <div className="centeredFlex" style={{ marginTop: 8 }}>
              <Button variant="raised" className="social-button" color="inherit">
                <img alt="Sign in with Google" src={facebookIcon} height="20" />
                &nbsp; Log in with Facebook
              </Button>
            </div>
            <br />
            <CustomDivider />
            <div>
              <FormHelperText id="email-helper">{this.state.email_helper}</FormHelperText>
              <Input
                name="email"
                placeholder="Enter email address"
                onChange={this.handleInput}
                className="input"
                id="input-email"
                fullWidth
              />
            </div>
            <div>
              <FormHelperText id="password-helper">{this.state.password_helper}</FormHelperText>
              <Input
                fullWidth
                name="password"
                id="input-pass"
                placeholder="Enter password"
                onChange={this.handleInput}
                type="password"
              />
            </div>
            <div className="inline-flex">
              <div className='form-text'>
                <Checkbox
                  name="checkbox"
                  checked={this.state.checked}
                />
                Remember me
              </div>
              <pre className="forgot-pass">
                <Link
                  to="/recover"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  Forgot <br />
                  password?
                </Link>
              </pre>
            </div>
            <div className="centeredFlex">
              <Button
                variant="raised"
                color="primary"
                className="login-button"
                onClick={event => this.handleLoginClick(event)}
              >
                Log in
              </Button>
            </div>
            <br />
            <div className="inline-flex">
              <div className='form-text'>
                Don't have an account? &nbsp;
              </div>
              <Link to="/register" style={{ textDecoration: "none", marginLeft: 'auto' }}>
                <Button variant="raised" className="login-button" color="secondary">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </Card>
        {
        // Toast message
          toast.open &&
          <Toast
            open={toast.open}
            onClose={this.closeToast}
            variant={toast.variant}
            message={toast.msg}
          />
        }
      </div>
    );
  }
}


export default withStyles(styles)(Login);
