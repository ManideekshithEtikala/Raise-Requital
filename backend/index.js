import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
const app = express();
app.use(json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
import businessRouter from "./EnterpreneureData/Routers/Data.js"
const url =
  "mongodb+srv://ManiDeekshithEtikala:Manideekshith%4011@raiserequitalcluster.vjbzt.mongodb.net/?retryWrites=true&w=majority&appName=RaiseRequitalCluster";


app.get("/", (req, res) => {
  res.send("Hello World");
});


// routes
app.use("/business", businessRouter);

connect(url)
  .then(() => {
    console.log("connected to database");
    app.listen(4000, () => {
      console.log("server is runnignn");
    });
  })
  .catch((err) => {
    console.log(err);
  });
