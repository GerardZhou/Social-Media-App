import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("server is ready");
});
app.listen(8000, () => {
  console.log("running on port 8000");
});
