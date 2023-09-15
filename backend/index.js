const express = require("express");
require("./db/config");
const cors = require("cors");
const user = require("./db/users");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const nocache = require("nocache");
const conversation = require("./db/conversation");
const messages = require("./db/messages");
const userMsg = require("./db/userMessage")

const io = require("socket.io")(5050, {
  cors: {
    origin: "http://localhost:3000",
  },
});

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
app.use(nocache());

// socket io
let userslist = [];
io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("addUser", (userId) => {
    console.log("usd", userId, userslist);
    const userExists = userslist.find((userli) => userli.userId === userId);
    console.log("exists:", userExists);

    if (!userExists) {
      const userli = { userId, socketId: socket.id };
      console.log(userli);
      userslist.push(userli);
      io.emit("getUsers", userslist);
    }
  });

  socket.on(
    "sendMessages",
    async ({ senderId, conversationId, receiverId, message }) => {
      const receiver = userslist.find((user) => user.userId === receiverId);
      const sender = userslist.find((user) => user.userId === senderId);
      const senderUser = await user.findById(senderId);
      console.log(receiver);
      try {
        if (receiver) {
          console.log("chirag bro");
          io.to(receiver.socketId)
            .to(sender.socketId)
            .emit("getMessage", {
              senderId,
              conversationId,
              message,
              receiverId,
              suser: {
                id: senderUser._id,
                username: senderUser.username,
                email: senderUser.email,
              },
            });
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  socket.on("disconnect", () => {
    userslist = userslist.filter((userli) => userli.socketId !== socket.id);
    io.emit("getUsers", userslist);
  });
});

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
  console.log("in singnup");
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
  console.log(req.params.email);
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
  console.log("inside login");
  if (req.body.email && req.body.password) {
    em = req.body.email;
    let result = await user.findOne({ email: em });
    console.log(result);
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
  let mail = req.body.email;
  let result = await user.findOne({ email: mail });
  console.log("gc", result);
  if (result) {
    console.log("hi");
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
  let data = new user(req.body);
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

app.post("/conversations", async (req, res) => {
  try {
    let { senderId, receiverId } = req.body;
    console.log("ids", senderId, receiverId);
    const checkAlready = await conversation.find({
      members: { $all: [senderId, receiverId] },
    });
    console.log("ca", checkAlready);
    if (checkAlready.length === 0 || !checkAlready) {
      const newConversation = new conversation({
        members: [senderId, receiverId],
      });
      let result = await newConversation.save();
      res.send(result);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/conversations/:userId", async (req, res) => {
  try {
    let userId = req.params.userId;
    const conversations = await conversation.find({
      members: { $in: [userId] },
    });
    const conversationData = Promise.all(
      conversations.map(async (talk) => {
        const receiverId = talk.members.find((member) => member !== userId);
        const userTalked = await user.findById(receiverId);

        return {
          users: {
            id: userTalked._id,
            username: userTalked.username,
            email: userTalked.email,
          },
          conversationId: talk._id,
        };
      })
    );
    // let conversationUserData = await conversationData;
    // console.log(await conversationData);
    res.send(await conversationData);
  } catch (error) {
    console.log(error);
  }
});

app.post("/messages", async (req, res) => {
  try {
    // console.log("body:", req.body);
    const { conversationId, senderId, message, receiverId = "" } = req.body;
    if (!senderId || !message) {
      console.log("sid", senderId);
      res.send("out all details");
    }
    if (!conversationId && receiverId) {
      const newConversation = new conversation({
        members: [senderId, receiverId],
      });
      await newConversation.save();
    } else if (!conversationId && !receiverId) {
      console.log("cid", conversationId, receiverId);
      res.send("fill all details");
    }
    const newMessage = new messages({ conversationId, senderId, message });
    await newMessage.save();
    res.status(200).send({ res: "Message sent Successfully" });
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/messages/:conversationId", async (req, res) => {
  try {
    let conversationId = req.params.conversationId;
    const msg = await messages.find({ conversationId });
    if (!msg) {
      res.send([]);
    } else {
      const msgData = Promise.all(
        msg.map(async (msgs) => {
          const usersdata = await user.findById(msgs.senderId);
          return {
            users: {
              id: usersdata._id,
              username: usersdata.username,
              email: usersdata.email,
            },
            message: msgs.message,
          };
        })
      );
      res.send(await msgData);
    }
  } catch (error) {
    console.log("Error", error);
  }
});

app.post("/user-contact",async (req,res)=>{
    let data = new userMsg(req.body)
    data = await data.save();
    if(data){
      res.send({result:"Message sent Successfully"})
    }
    else{
      res.send(false)
    }
})

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
