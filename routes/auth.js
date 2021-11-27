const express = require("express");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const { generateToken, verifyToken } = require("../middlewares/authenticate");
const User = require("../models/User");

const route = express.Router();

// GET
route.get("/", verifyToken, (req, res) => {
  res.status(200).json(req.user);
});

// POST REGISTER
route.post("/register", async (req, res) => {
  try {
    if (req.body.password != req.body.confirmPassword)
      return res
        .status(200)
        .json({ param: "confirmPassword", msg: "Kedua password harus sama" });

    req.body.password = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User(req.body);
    const user = await newUser.save();

    res.status(200).json(user.username);
  } catch (err) {
    console.log(err);
    if (err.code == 11000)
      return res
        .status(400)
        .json({ param: "username", msg: "Username sudah terdaftar !" });

    res.status(400).json(err.errors);
  }
});

// POST LOGIN
route.post("/login", async (req, res) => {
  try {
    const checkUser = await User.findOne({ username: req.body.username });
    if (!checkUser)
      return res
        .status(400)
        .json({ param: "username", msg: "Username belum terdaftar !" });

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      checkUser.password
    );
    if (!checkPassword)
      return res
        .status(400)
        .json({ param: "password", msg: "Password salah !" });

    const user = {
      id: checkUser._id,
      username: checkUser.username,
    };
    const accessToken = generateToken(user);
    res.status(200).json({ accessToken, user });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = route;
