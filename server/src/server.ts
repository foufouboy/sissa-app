import express from "express";

const app = express();

app.listen(8000, () => {
  console.log(`Sissa Server - Running at localhost:${8000}`);
});
