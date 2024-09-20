import "./services/passport.js";
import "dotenv/config";
import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRoutes from "./routes/users.js";
import projectRoutes from "./routes/project.js";
import dashboardRoutes from "./routes/dashboard.js";
import authRoutes from "./routes/auth.js";

const frontEnd_URL = process.env.FRONTEND_URL;
const dbUrl = process.env.DB_URL;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: frontEnd_URL,
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: dbUrl }),
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(dbUrl);
  console.log("Mongo Connection Open!!!");
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
// });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App Is Listening On Port ${port}!`);
});
