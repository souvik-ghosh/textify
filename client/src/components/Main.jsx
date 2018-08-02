import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import Loader from "./Loader";
import Toast from './Toast';
import Header from "./Header";
import { fetchUser } from "../api";

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      loading: true,
      toast: {
        open: false,
        msg: null,
        variant: null
      },
    }
    this.getUser = this.getUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.openToast = this.openToast.bind(this)
  }

  componentWillMount() {
    this.getUser();
    setTimeout(() => {
      if (!this.state.loggedIn) {
        (window.location.href.indexOf('/login') < 0 && window.location.href.indexOf('/register') < 0) && (window.location.href = '/login');
      }
    }, 10);
  }

  getUser = () => {
    fetchUser()
      .then(response => {
        if (response.user) {
          this.setState({
            loggedIn: true,
            username: response.user.username,
            loading: false,
          });
        } else {
          this.setState({
            loggedIn: false,
            username: null,
            loading: false,
          });
        }
      })
      .catch(err => console.log(err));
  }

  /** @function updateUser */
  updateUser(userObject) {
    this.setState(userObject)
  }

  openToast(obj) {
    this.setState({ toast: obj })
  }

  closeToast = () => {
    this.setState({
      toast: { open: false }
    })
  }

  showLoader = () => {
    this.setState({
      loader: { open: true }
    })
  }

  render() {
    let mainContent;
    const toast = this.state.toast;
    if (!this.state.loggedIn) {
      (window.location.href.indexOf('/logout') >= 0) && window.location.replace('/login')
      mainContent = (window.location.href.indexOf('/register') >= 0) ? <Register openToast={this.openToast} /> : <Login updateUser={this.updateUser} openToast={this.openToast} loggedIn={this.state.loggedIn} />
    } else {
      mainContent =
        <Switch>
          <Route exact path="/" render={() => <Home loggedIn={this.state.loggedIn} openToast={this.openToast} />} />
          <Route path="/login" render={() => <Login updateUser={this.updateUser} openToast={this.openToast} loggedIn={this.state.loggedIn} />} />
          <Route path="/register" render={this.state.loggedIn ? () => <Home loggedIn={this.state.loggedIn} openToast={this.openToast} /> : () => <Register openToast={this.openToast} />} />
          <Route path="/logout" render={() => <Logout loggedIn={this.state.loggedIn} openToast={this.openToast} />} />
        </Switch>
    }
    return (
      <div style={{ height: '100vh' }} className="content-div">
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="main-div" id="main-div">
          <Header loggedIn={this.state.loggedIn} />
          {
            this.state.loading ?
              <div id="main-content" className="centeredFlex" style={{ flex: 1 }}> <Loader /> </div>
              :
              <div className="flex justify-center" style={{ flex: 1 }}>
                {mainContent}
              </div>
          }
          <div className="centeredFlex" style={{ height: 100, background: '#152029', color: '#dedede' }}>
            <div className="centeredFlex" >
              Copyright &copy; 2018 Textify Inc.
            </div>
          </div>
        </main>
        <div>
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
      </div>
    )
  }
}

export default Main;
