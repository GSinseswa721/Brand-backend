import express from "express";
import mongoose from "mongoose";
import router from "./routes/user";
import routers from "./routes/blog";

const app= express();
app.use(express.json());

const MONGO_URL = "mongodb://127.0.0.1:27017";
mongoose.connect(MONGO_URL, {
    dbName: "mybrand",
}).then(() => {
    console.log("Database connected");
}).catch((error) => console.log(error));

app.use('/', router);
app.use('/', routers);
app.listen(4000, () => {
    console.log(`Server running on http://localhost:4000`);
});
