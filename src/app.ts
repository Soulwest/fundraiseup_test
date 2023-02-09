import * as express from "express";
import connectDB from "./utils/mongo";


import appController from "./controller/app";
import trackController from "./controller/tracker";

require('dotenv').config();

// Default app
const app = express();

app.use('/', appController);
app.use('/*.html', appController);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

// Script app
const script = express();
script.use('/', trackController)


script.listen(process.env.SCRIPT_PORT, () => {
  console.log(`Script listening on port ${process.env.SCRIPT_PORT}`);
  connectDB();
});