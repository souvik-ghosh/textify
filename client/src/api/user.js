import { get, post } from ".";

const USER = {
  get: async () => {
    return await get("/user/");
  },
  login: async user => {
    return await post("/user/login", user);
  },
  create: async user => {
    return await post("/user/", user);
  }
};

export default USER;