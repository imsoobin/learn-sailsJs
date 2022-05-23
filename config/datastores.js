module.exports.datastores = {
  default: {
    // adapter: 'sails-mysql',
    // url: 'mysql://user:password@host:port/database',
  },

  mongodb: {
    adapter: require("sails-mongo"),
    url: "mongodb://localhost:27017/database",
  },
};
