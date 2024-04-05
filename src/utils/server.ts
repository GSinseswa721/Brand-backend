import express from "express";
import routes from "../routes/blog";
import cors from "cors"
import { app } from "..";

function createServer() {
  const app = express();

  app.use(express.json());


  return app;
}

export default createServer;
