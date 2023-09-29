const mongoose = require("mongoose");
// mongoose.connect("mongodb://0.0.0.0:27017/real-estate")
const url = `mongodb+srv://Luis_martin:realestate@cluster0.xzabzha.mongodb.net/real-estate?retryWrites=true&w=majority`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch((e) => console.log("error", e));
