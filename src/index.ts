import express from "express";
import mongoose, { connect } from "mongoose";
import router from "./routes/user";
import routers from "./routes/blog";
import swaggerDocs from "./utils/swagger";
import messageRouter from "./routes/message";



export const app= express();
const port = 4000;
app.use(express.json());

const MONGO_URL = "mongodb+srv://gogo:gloria@cluster0.le5cbfi.mongodb.net/";
mongoose.connect(MONGO_URL).then(() => {
    console.log("Database connected");
}).catch((error) => console.log(error));

app.use('/user', router);
app.use('/blog', routers);
app.use('/message', messageRouter)

app.get('/', (req: Request, res: Response) => {
    res.send({ message: "Hello from My Brand" })
});

app.listen(4000, async () => {
    console.log(`Server running on http://localhost:4000`);

    swaggerDocs(app, port);
});
