const express = require("express");
require("./db/config");
const cors = require("cors");
const user = require("./db/users");
const jwt = require("jsonwebtoken");
const guser = require("./db/googleUser");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");

let global_otp;

const generateOTP = () => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  return otp;
};

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

app.post("/otp_auth", async (req, res) => {
  let result = await user.findOne(req.body);
  if (result) {
    global_otp = generateOTP();

    var mailOptions = {
      from: "sscrpmsu@gmail.com",
      to: req.body.email,
      subject: "Real Estate OTP",
      text: `Your one time otp is ${global_otp} valid for 5 minutes`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email Sent Succesfully");
      }
    });

    res.send(global_otp);
  } else {
    res.send(false);
  }
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

app.put("/update_password/:email", async (req, res) => {
  console.log(req.params.email)
  const salt = await bcrypt.genSalt(10);
  let pa = await bcrypt.hash(req.body.password, salt);
  // req.body.password = pa
  let result = await user.updateOne(
    { email: req.params.email },
    {
      $set: { password: pa },
    }
  );
  console.log(req.body.password);
  if (result) {
    res.send(result);
  } else {
    res.send(false);
  }
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    em = req.body.email;
    let result = await user.findOne({ email: em });

    if (result) {
      var authUser = await bcrypt.compare(req.body.password, result.password);
      console.log(authUser);
      if (!authUser) {
        res.send({ result: "Wrong Password" });
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

app.post("/google-check", async (req, res) => {
  let result = await guser.findOne(req.body);
  if (result) {
    result = result.toObject();
    jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        res.send("Token Expired or something went wrong");
      } else {
        res.send({ result, token });
      }
    });
  } else {
    res.send(false);
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
