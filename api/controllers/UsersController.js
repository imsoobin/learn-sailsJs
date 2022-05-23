/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Articles = require("../models/Articles");

module.exports = {
  welcome: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });

      res.status(200).json(user.group);
    } catch (err) {
      res.status(405).send("Something went wrong");
    }
  },
  signup: async (req, res) => {
    try {
      const { first_name, last_name, email, password, group } = req.body;
      if (!(first_name && last_name && email && password)) {
        res.status(400).send("All input required");
      }
      const oldUser = await Users.findOne({ email });
      if (oldUser) {
        res.status(409).send("User Already Exist. Please Login!");
      }
      encryptedPassword = await bcrypt.hash(password, 10);
      const user = {
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        group,
      };
      await Users.create(user);
      const token = jwt.sign({ user_id: user._id, email }, "secretkey", {
        expiresIn: "360s",
      });
      user.token = token;
      res.status(201).json(user);
    } catch (err) {
      console.log("err");
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        res.status(400).send("All input required");
      }
      const user = await Users.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ user_id: user._id, email }, "secretkey", {
          expiresIn: "360s",
        });
        user.token = token;
        res.status(200).json(user);
      }
      res.status(400).send("Not found this account");
    } catch (err) {
      console.log("err");
    }
  },
};
