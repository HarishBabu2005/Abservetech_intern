const express = require("express");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const logger = require("./middleware/logger");

const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(logger);

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoute"));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

console.log(`Server running on ${PORT}`);

});