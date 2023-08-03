const express = require("express");
require("./db/config");
const cors = require("cors");
const user = require("./db/users");
const jwt = require("jsonwebtoken");
const guser = require("./db/googleUser");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const jwtKey = "luis_martin";
const app = express();

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "sscrpmsu@gmail.com",
    pass: "gtmmmnbhrhncobub",
  },
});

app.post("/signup", async (req, res) => {
  
  const salt = await bcrypt.genSalt(10);
  let pa = await bcrypt.hash(req.body.password, salt);
  req.body.password = pa;
  let data = new user(req.body);
  let result = await data.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (err, token) => {
    if (err) {
      res.send("Token Expired or something went wrong");
    } else {
      res.send({ result, token });
    }
  });

  var mailOptions = {
    from: "sscrpmsu@gmail.com",
    to: req.body.email,
    subject: "Real Estate Account Register",
    text: `Thank you ${req.body.username} for registering with us`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent Succesfully");
    }
  });
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    em = req.body.email;
    let result = await user.findOne({ email: em });

    
    if (result) {
      var authUser = await bcrypt.compare(req.body.password, result.password);
      console.log(authUser);
      if (!authUser) {
        res.send({result : "Wrong Password"});
      }
      result.password = undefined;
      jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          res.send("Token Expired or something went wrong");
        } else {
          res.send({ result, token });
        }
      });
    } else {
      res.send({ result: "No record found" });
    }
  } else {
    res.send({ result: "No record found" });
  }
});

app.post("/google-login", async (req, res) => {
  let data = new guser(req.body);
  let result = await data.save();
  result = result.toObject();
  jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (err, token) => {
    if (err) {
      res.send("Token Expired or something went wrong");
    } else {
      res.send({ result, token });
    }
  });
});

function verfiyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.send({ result: "error in token" });
      } else {
        next();
      }
    });
  } else {
    res.send({ result: "Pls provide token with header" });
  }
}

app.listen(5000);
