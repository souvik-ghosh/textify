import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import Loader from "./Loader";

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      loading: true,
    }
    this.getUser = this.getUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    fetch('/user/', {
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin"
    })
      .then(response => response.json())
      .then(response => {
        console.log('Get user response: ')
        console.log(response);
        if (response.user) {
          this.setState({
            loggedIn: true,
            username: response.user.username,
            loading: false,
          });
        } else {
          console.log('Get user: no user');
          this.setState({
            loggedIn: false,
            username: null,
            loading: false,
          });
        }
      })
      .catch(err => console.log(err));
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  render() {
    let mainContent;
    if (this.state.loading) {
      mainContent = <Loader />;
    } else if (!this.state.loggedIn) {
      mainContent = <Login updateUser={this.updateUser} />
      if (window.location.href.indexOf('register') >= 0)
        mainContent = <Register />
    } else {
      mainContent = <Switch>
                      <Route exact path="/" render={() => <Home loggedIn={this.state.loggedIn} />} />
                      <Route path="/login" render={() => <Login updateUser={this.updateUser} loggedIn={this.state.loggedIn} />} />
                      <Route path="/register" render={this.state.loggedIn ? () => <Home loggedIn={this.state.loggedIn} /> : <Register />} />
                      <Route path="/logout" component={Logout} />
                    </Switch>
    }
    return (
      <main style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {mainContent}
        </div>
        <div className="centeredFlex" style={{ marginTop: 'auto', height: 100, background: '#152029', color: '#dedede' }}>
          <div className="centeredFlex">
            Copyright &copy; 2018 Textify Inc.
          </div>
        </div>
      </main>
    )
  }
}

export default Main;
