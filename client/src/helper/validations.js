/**
 * Validate input value with RegEx; based on input type.
 * @param {String} type  'name', 'email', 'password' etc ...
 * @param {String} value
 * @returns {Boolean} TRUE if valid
 */
export const validateInp = (type, value) => {
  const regEx = {
    name: /^\s*[0-9a-zA-Z][0-9a-zA-Z '-]{2,35}$/,
    email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
  };

  return regEx[type].test(value);
};
