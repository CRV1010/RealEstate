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
const userMsg = require("./db/userMessage");
const comments = require("./db/comment");

const io = require("socket.io")(5555, {
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
  // console.log("gc", result);
  if (result) {
    // console.log("hi");
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
    console.log("index", userId);
    const conversations = await conversation.find({
      members: { $in: [userId] },
    });
    const conversationData = Promise.all(
      conversations.map(async (talk) => {
        const receiverId = talk.members.find((member) => member !== userId);
        // console.log("userId:",receiverId);
        const userTalked = await user.findById(receiverId);
        // console.log("user my", userTalked);
        // if(userTalked!=null)
        return {
          users: {
            id: userTalked?._id,
            image: userTalked?.image,
            username: userTalked?.username,
            email: userTalked?.email,
          },
          conversationId: talk?._id,
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

app.post("/user-contact", async (req, res) => {
  let data = new userMsg(req.body);
  data = await data.save();
  if (data) {
    res.send({ result: "Message sent Successfully" });
  } else {
    res.send(false);
  }
});

//   CODE FOR STORING THE IMAGE OF SELLER

//npm i --save multer  before executing this code
const multer = require("multer");

//image Schema i am importing
const Image = require("./db/image");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/src/Images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null,uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

//getting all file(images) information
//i have to store the file(images) name in database to store that making this array
//iterating through array temp(file information) and gettig only file names.

app.post("/upload-image", upload.array("image"), async (req, res) => {
  const temp = req.files;

  const imageName = [];

  temp.map((element) => {
    imageName.push(element.filename);
  });

  res.send(imageName);
});

app.post("/upload-imageProfile", upload.single("image"), async (req, res) => {
  // const temp = req.files;
  const image = req.file.filename;
  res.send(image);
});

app.put("/updateUser/:id", async (req, res) => {
  let data = await user.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  if (data) {
    let result = await user.findOne({ _id: req.params.id });
    delete result.password;
    jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        res.send("Token Expired or something went wrong");
      } else {
        res.send({ result, token });
      }
    });
  }
  //  result = result.toObject();
});

//code for storing the basix text data for selling the property
app.post("/upload-database", async (req, res) => {
  try {
    await Image.create({
      propertyFor: req.body.selectedValue,
      type: req.body.type,
      State: req.body.State,
      City: req.body.City,
      society: req.body.society,
      zone: req.body.zone,
      pincode: req.body.pincode,
      area: req.body.area,
      price: req.body.price,
      rooms: req.body.rooms,
      sellerId: req.body.sellerId,
      image: req.body.imageName,
      owner: req.body.owner,
      premium: req.body.premium,
      build: req.body.build,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.put("/update-database/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body.imageName);
  let data = await Image.updateOne(
    { _id: req.params.id },
    {
      $set: {
        propertyFor: req.body.selectedValue,
        type: req.body.type,
        State: req.body.State,
        City: req.body.City,
        society: req.body.society,
        zone: req.body.zone,
        pincode: req.body.pincode,
        area: req.body.area,
        price: req.body.price,
        rooms: req.body.rooms,
        sellerId: req.body.sellerId,
        image: req.body.imageName,
        modified: 1,
        owner: req.body.owner,
        build: req.body.build,
      },
    }
  );
  if (data) {
    res.send({ res: "updated successfully" });
  } else {
    res.send(false);
  }
});

//CODE FOR GETTING THE IMAGES FROM THE DATABASE
app.get("/get-data", async (req, res) => {
  try {
    Image.find({}).then((object) => {
      res.send(object);
    });
  } catch (error) {
    res.json({ staus: error });
  }
});

//to get the user information like username , email , phone
app.post("/getUserDetails", async (req, res) => {
  console.log(req.body);
  let result = await user.findOne(req.body);
  username = result.username;
  email = result.email;
  phone = result.phone;
  dob = result.dob;
  image = result.image;
  res.send({ username, email, phone, dob, image });
});

//to get the details of user's property
app.post("/getPropertyDetails", async (req, res) => {
  let propertys = await Image.find(req.body);
  res.send(propertys);
});

app.delete("/property/:id", async (req, res) => {
  console.log(req.params.id, "deleteing with id");
  let data = await Image.deleteOne({ _id: req.params.id });
  res.send(data);
});

app.delete("/user-property-delete/:id", async (req, res) => {
  console.log("Deleteing property using seller Id", req.params.id);

  let data;
  try {
    data = await Image.deleteMany({ sellerId: req.params.id });
  } catch (e) {
    console.log("error", e);
  }
  console.log(data);
  res.send(data);
});

app.post("/search-property", async (req, res) => {
  try {
    const { propertyFor, type, State, City, zone, rooms, price } = req.body;
    let data = await Image.find({
      propertyFor: propertyFor,
      type: type,
      State: State,
      City: City,
      zone: zone,
      rooms: { $gte: rooms },
      price: { $lte: price },
    });
    if (data) {
      res.send(data);
    } else {
      res.send({ result: "No Property avialable with given specification" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/search-property-two", async (req, res) => {
  try {
    const { propertyFor, type, State, City, zone, rooms, price } = req.body;
    console.log(type, rooms, price);
    let data = await Image.find({
      propertyFor: propertyFor,
      type: type,
      State: State,
      City: City,
      rooms: { $gte: rooms },
      price: { $lte: price },
    });
    if (data) {
      console.log(data);
      const newdata = data.filter((property) => {
        return property.zone !== zone;
      });
      res.send(newdata);
    } else {
      res.send({ result: "No Property avialable with given specification" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/search-property-three", async (req, res) => {
  try {
    const { propertyFor, type, State, City, zone, rooms, price } = req.body;
    console.log(type, rooms, price);
    let data = await Image.find({
      propertyFor: propertyFor,
      // type: type,
      State: State,
      City: City,
      rooms: { $gte: rooms },
      price: { $lte: price },
    });
    if (data) {
      console.log(data);
      const newdata = data.filter((property) => {
        return property.type !== type;
      });
      res.send(newdata);
    } else {
      res.send({ result: "No Property avialable with given specification" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/search/:key", async (req, res) => {
  // console.log("hello");
  try {
    var regex = new RegExp(
      ["^", req.params.key.toLowerCase(), "$"].join(""),
      "i"
    );
    let data = await Image.find({
      $or: [
        { propertyFor: { $regex: req.params.key } },
        { type: { $regex: req.params.key } },
        { State: { $regex: req.params.key } },
        { City: { $regex: req.params.key } },
        { society: { $regex: req.params.key } },
        { zone: { $regex: req.params.key } },
        // { price: { $regex: req.params.key } },
      ],
    });

    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/comment", async (req, res) => {
  let data = new comments(req.body);
  data = await data.save();
  res.send({ result: "comment saved" });
});

app.get("/show-comments", async (req, res) => {
  let data = await comments.find({});
  res.send(data);
});

app.delete("/commentDelete/:id", async (req, res) => {
  let data = await comments.deleteOne({ _id: req.params.id });
  res.send(data);
});

app.get("/getAllUsers", async (req, res) => {
  let result = await user.find({});

  result.forEach((data) => {
    data.password = undefined;
  });

  res.send(result);
});

app.delete("/delete-user/:id", async (req, res) => {
  let data = await user.deleteOne({ _id: req.params.id });
  res.send(data);
});

app.delete("/conversations/:id", async (req, res) => {
  // var myquery = { _id: { $in: req.params.idArr } };
  let data = await conversation.deleteOne({ _id: req.params.id });
  res.send(data);
});

//payment application
require("dotenv").config();

const path = require("path");

const shortid = require("shortid");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_H0imBRBCGuVydw",
  key_secret: "QhbO7lXBYIjsoJ8nlF1k9qSO",
});

app.use(cors());

// Serving company logo
app.get("/logo.png", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "logo.png"));
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = req.body.amount;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

//for like a post
app.put("/like", async (req, res) => {
  try {
    const result = await Image.findByIdAndUpdate(
      req.body.imageId,
      {
        $push: { likes: req.body.user_id },
      },
      {
        new: true, //it will return updated record if we don't write then it will return us old record
      }
    );
    if (!result) {
      return res.status(404).json({ error: "Image not found" });
    }
    return res.json(result);
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
});

// Code for fetching seller in explore details page
app.get("/get-seller", async (req, res) => {
  try {
    user.find({}).then((object) => {
      res.send(object);
    });
  } catch (error) {
    res.json({ staus: error });
  }
});

function verifyToken(req, res, next) {
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
