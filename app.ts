import express from "express";
import employeeRouter from "./employee_router";
import loggerMiddleware from "./loggerMiddleware";
import datasource from "./data-source";

// const { Client } = require('pg');

const server = express();
server.use(express.json());
server.use(loggerMiddleware);

server.use("/employee", employeeRouter);

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello world typescript");
});

const init = async () => {
  try {
    await datasource.initialize();
    console.log('Connected to DB');
  }
  catch {
    console.error('Failed to connect to DB');
    process.exit(1);
  }

  server.listen(3000, () => {
    console.log("server listening to 3000");
  });

};

init();

