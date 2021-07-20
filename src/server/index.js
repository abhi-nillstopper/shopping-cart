import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import app_routes from "./app_routes";
const PORT = process.env.PORT || 8000;
const app = express();
// const httpServer = createServer(app);

// const CONNECTED_USERS = {};

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

try {
  mongoose
    .connect(process.env.MONGO_DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((status) => {
      console.log("mongoDB conection successful!");
    });
} catch (error) {
  console.error(error);
}

// app.use((req, res, next) => {
//   req.io = io;
//   req.connectedusers = CONNECTED_USERS;
//   next();
// });

app.use(cors({ origin: process.env.SPORT_FRONTEND_URL }));
app.use(express.json());

console.log("__dirname", __dirname);

// the __dirname is the current directory from where the script is running
app.use(express.static(path.join(__dirname, "..", "client_build")));

// app.use("/files", express.static(path.resolve(__dirname, "..", "files")));
app.use(app_routes);

// send the user to index html page inspite of the url
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client_build", "index.html"));
});

app.listen(PORT, function () {
  console.log(`started listing on ${PORT}`);
});

process.on("SIGINT", function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit(1);
});
