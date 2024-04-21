const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const { exec } = require("child_process");
const app = express();
require("dotenv").config();
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
// const session = require("express-session");
// const MongoDbStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const PORT = 8000;

app.use(cors());
app.use(express.json());
// const http = require("http").createServer(app);

// database connection
mongoose.connect("mongodb://127.0.0.1:27017/Collaboratory", {});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .on("error", function (err) {
    console.log(err);
  });

// session store
// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoDbStore({
//       mongooseConnection: mongoose.connection,
//       collection: "sessions", // Optional, specify the collection name
//       ttl: 24 * 60 * 60, // Optional, session expiration in seconds
//     }),
//   })
// );

app.use(cors());
app.use(express.json({ limit: "3mb" }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// compiler code
app.post("/compile", (req, res) => {
  //getting the required data from the request
  let code = req.body.code;
  let language = req.body.language;
  let input = req.body.input;

  if (language === "python") {
    language = "py";
  }

  if (language === "c") {
    language = "c";
  }

  if (language === "cpp") {
    language = "cpp";
  }
  if (language === "java") {
    language = "java";
  }
  let data = {
    code: code,
    language: language,
    input: input,
  };
  let config = {
    method: "post",
    url: "https://emkc.org/api/v2/piston/execute",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  //calling the code compilation API
  Axios(config)
    .then((response) => {
      res.send(response.data);
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
});
//live server
app.post("/run-live-server", (req, res) => {
  const command = "live-server --port=9000";

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred");
      return;
    }
    console.log("stdout:", stdout);
    console.error("stderr:", stderr);
    res.send("live-server started successfully");
  });
});

// routes
app.use("/user", userRouter);
app.use("/blog", blogRouter);

// app listening
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
