//midleware check token
module.exports.policies = {
  // '*': true,
  UsersController: {
    welcome: ["isAuth"],
  },
  ArticlesController: {
    "*": ["isAuth"],
  },
};
