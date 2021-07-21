const User = require("../../models/User");
const { to } = require("await-to-js");
const getIndex = async (req, res, next) => {
  let user;
  if (req.user) {
    user = req.user;
  }
  return res.render("default/UserInfo", { user: user });
};
module.exports = { getIndex };
