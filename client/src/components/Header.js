import React from "react";
import Menu from "./Menu";
import icon from "../icons/logo.png";
import { Link } from "react-router-dom";

export const Header = (props) => {
    return (
      <div>
          <div className="header flex align-center">
            <Link to="/" style={{ color: "white", textDecoration: 'none'}}>
              <div className="inline-flex">
                <img alt="logo" src={icon} height="55" width="150"/>
              </div>
            </Link>
            <div style={{ marginLeft: "auto", marginRight: '8px'}}>
              <Menu loggedIn={props.loggedIn} />
            </div>
          </div>
      </div>
    );
  
}

export default Header;
