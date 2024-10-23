import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/product.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { StatusCodes } from "http-status-codes";

dotenv.config();

//create express server app
const app = express();

app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(function (res: any, next: any) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.com  https://cdnjs.cloudflare.com http://localhost:5100/js/main.ts; img-src 'self' https://res.cloudinary.com https://cdnjs.com  https://cdnjs.cloudflare.com; font-src 'self' https://cdnjs.com  https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdnjs.com  https://cdnjs.cloudflare.com"
  );

  next();
});

//requests
app.use("/api/product", router);

//render homepage
app.get("/", (res: any) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

//display "Page Not Found" for invalid routes
app.use("*", (res: any) => {
  res.send("Page Not Found").status(StatusCodes.NOT_FOUND);
});

//create port variable
const port = process.env.PORT || 5000;

//connect to database and start server app on port 5100 or 5000
const connectFunc = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Database connected...");

    app.listen(port, () => {
      console.log(`Server is listening on PORT ${port}...`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectFunc();
