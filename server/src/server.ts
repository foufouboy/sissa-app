import dotenv from "dotenv";
dotenv.config({});

import cors from "cors";
import express from "express";
import router from "./api/routes/router";

const app = express();

app.use(
	cors({
		origin: [process.env.CORS_ORIGIN],
		allowedHeaders: ["Content-Type", "Authorization"],
		methods: ["GET", "POST", "PUT", "DELETE"],
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);

app.get("/", (req, res) => {
	res.redirect("/api");
});

app.listen(8000, () => {
	console.log(`Sissa Server - Running at localhost:${8000}`);
});
