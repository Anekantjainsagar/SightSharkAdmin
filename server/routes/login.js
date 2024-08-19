const express = require("express");
const login = express.Router();
const User = require("../db/schema/user");
const jwt = require("jsonwebtoken");

login.post("/create", async (req, res) => {
  try {
    const newUser = new User({ ...req.body });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

login.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

    let data = await User.findOne({ email });

    if (data) {
      if (password == data?.password) {
        const jwtToken = jwt.sign(
          {
            user: data._id,
          },
          process.env.SECRET_KEY
        );
        res.status(200).send(jwtToken);
      } else {
        res.status(203).json({ data: "Invalid credentials", success: false });
      }
    } else {
      res.status(203).json({ data: "Invalid credentials", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

login.post(
  "/check-token",
  async (req, res, next) => {
    try {
      if (req.body.token) {
        const token = req.body.token;
        if (!token) {
          res.status(404).json({ success: false, data: "Cookie not found" });
        } else {
          jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
              res.status(400).json({ success: false, data: "Invalid token" });
            }
            req.id = user?.user;
          });
        }
      }
    } catch (err) {
      res.status(500).send(err);
    }
    next();
  },
  async (req, res) => {
    const { id } = req;

    let user = await User.findById(id);
    res.send(user);
  }
);

module.exports = login;
