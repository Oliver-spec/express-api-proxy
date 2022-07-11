const express = require("express");
const cors = require("cors");
const axios = require("axios").default;
const fs = require("fs-extra");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/:name", (req, res) => {
  const keys = fs.readJSONSync("./api_keys.json");
  const api_key = keys[req.params.name];
  const URL = req.body.URL.replace("api_key", api_key);

  axios.get(URL).then((axiosRes) => res.send(axiosRes.data));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
