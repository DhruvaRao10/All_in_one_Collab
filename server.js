const express = require("express");
const cors = require("cors");
const Axios = require("axios");
const { exec } = require("child_process");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

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

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
