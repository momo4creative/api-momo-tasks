if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { verifyToken } = require("./middlewares/authenticate");

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((error) => console.error(error));

app.use("/api/auth", require("./routes/auth"));
// with authenticate
app.use(verifyToken);
app.use("/api/tasks", require("./routes/tasks"));

app.use("/*", require("./routes/notFound"));
// Listen
app.listen(port, console.log(`Server running in port ${port}...`));
