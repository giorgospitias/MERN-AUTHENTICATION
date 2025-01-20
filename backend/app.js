const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./mongodb/connect");
const errorHandler = require("./middleware/errorMiddleware");
const portfolioRoutes = require("./routes/portfolioRoutes");
const userRoutes = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./middleware/errorMiddleware");

connectDB();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1/portfolio", portfolioRoutes);
app.use("/api/v1/user", userRoutes);

//MIDDLEWARES
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from server",
  });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
