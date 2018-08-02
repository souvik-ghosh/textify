/**
 * Make a GET Request using Fetch Api
 * @param {string} url
 * @returns {Promise<Response>} JSON
 */
const get = async url => {
  const response = await fetch(url, {
    headers: {
      "Accept": "application/json"
    },
    credentials: "same-origin"
  });

  return await response.json();
};

/**
 * Make a POST Request using Fetch Api
 * @param {string} url
 * @param {Object} data plain JavaScript object
 * @returns {Promise<Response>} JSON
 */
const post = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json"
    },
    credentials: "same-origin",
    body: JSON.stringify(data)
  });

  return await response.json();
};

export { get, post };
