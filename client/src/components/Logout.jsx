import React from 'react';
import Loader from "./Loader";

const Logout = (props) => {
  if (props.loggedIn) {
    fetch('/user/logout', {method: 'POST', credentials: "same-origin"})
      .then(() => {
        props.openToast({
          open: true,
          variant: 'success',
          msg: 'Successfuly logged out !'
        })
        window.location.replace("/login");
      })
      .catch(err => console.log(err));
  } else
    window.location.replace("/login");

  return(
    <div>
      <Loader />
    </div>
  )
}

export default Logout;