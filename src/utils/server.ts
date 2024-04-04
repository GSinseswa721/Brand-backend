import express from "express";
import routes from "../routes/blog";


function createServer() {
  const app = express();

  app.use(express.json());

  return app;
}

export default createServer;
