import React from 'react';
import Loader from './Loader';

const Logout = (props) => {
    fetch('/user/logout', {method: 'POST', credentials: "same-origin"})
      .then(() => {
        window.location.href = '/';
      })
      .catch(err => console.log(err));

  return (
    <div className="centeredFlex">
      <Loader />
    </div>
  )
}

export default Logout;