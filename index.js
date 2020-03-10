const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const passport = require("passport");
const GithubStrategy = require("passport-github");
const chalk = require("chalk");

let user;

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        "https://github-auth-login.herokuapp.com/auth/github/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

app.use(cors());
app.use(passport.initialize());

app.get("/auth/github", passport.authenticate("github"));
app.get(
  "/auth/github/callback",
  passport.authenticate("github"),
  (req, res) => {
    res.redirect("/profile");
  }
);

app.get("/user", (req, res) => {
  console.log("getting user data!");
  res.send(user);
});

app.get("/auth/logout", (req, res) => {
  console.log("logout");
  user = {};
  res.redirect("/");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
