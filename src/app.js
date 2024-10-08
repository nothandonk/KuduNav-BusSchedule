import express from "express";
import Router from './routes/busschedule.js';
import connectDb from "../config/db.js";
import subRouter from "./routes/subscriptionRoute.js";
import routesRouter from "./routes/routesRoute.js";
import busRouter from "./routes/busRoute.js";
import stopRouter from "./routes/stopRoute.js";
import scheduleRouter from "./routes/scheduleRoute.js";
import notifyRouter from "./routes/notifyRoute.js";

const app = express();

const startServer = async () => {
  await connectDb();
} 

startServer();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, PATCH, OPTIONS"
    );
    res.header("Access-Control-Allow-Credentials", true);
    if ("OPTIONS" == req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  });

app.use(Router)
app.use(subRouter)
app.use(routesRouter)
// app.use(busRouter)
// app.use(stopRouter)
app.use(scheduleRouter)
app.use(notifyRouter)

export default app