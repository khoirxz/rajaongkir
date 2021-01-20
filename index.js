const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

axios.defaults.baseURL = "https://api.rajaongkir.com/starter";
axios.defaults.headers.common["key"] = "f4242bdf2c03ce49f33f8d371e774166";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

app.use(cors());

app.get("/provinsi", (req, res) => {
  axios
    .get("/province")
    .then((response) => {
      res.json(response.data.rajaongkir.results);
    })
    .catch((err) => res.send(err));
});

app.get("/kota/:provId", (req, res) => {
  const id = req.params.provId;
  axios
    .get(`/city?province=${id}`)
    .then((response) => {
      res.json(response.data.rajaongkir.results);
    })
    .catch((err) => res.send(err));
});

app.get("/ongkos/:asal/:tujuan/:berat/:kurir", (req, res) => {
  const param = req.params;
  axios
    .post("/cost", {
      origin: param.asal,
      destination: param.tujuan,
      weight: param.berat,
      courier: param.kurir,
    })
    .then((response) => {
      res.json(response.data.rajaongkir);
    })
    .catch((err) => res.send(err));
});

app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
