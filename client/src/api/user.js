import { get, post } from "./main";

/**
 * Fetch logged in user from server
 * @returns {Promise<Response>} JSON { user }
 */
const fetchUser = async () => {
  return await get("/user/");
}

/**
 * Request the server to log in user
 * @param {Object} user plain JS object
 * @returns {Promise<Response>} JSON {id: string}
 */
const loginUser = async user => {
  return await post("/user/login", user);
}

/**
 * Request the server to create a new user
 * @param {Object} user plain JS object
 * @returns {Promise<Response>} JSON {id: string}
 */
const createUser = async user => {
  return await post("/user/", user);
}

export { fetchUser, loginUser, createUser }