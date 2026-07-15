const express = require("express");

const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const cors=require("cors")
const logger = require("./middleware/logger");

const errorHandler = require("./middleware/errorMiddleware");
const http = require("http");
const { Server } = require("socket.io");
dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors())
app.use(logger);
// const server=http.createServer(app)
// const io=new Server(server)
// app.use(express.static(path.join(__dirname,"socket-demo/public")))
// console.log(__dirname);
// io.on("connection",(socket)=>{
//      console.log(`user connected ${socket.id}`)
//      socket.emit("welcome","welcome bro")
//     socket.on("disconnect",()=>{
//         console.log(`User disconnected: ${socket.id}`)
//     })
//     })

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoute"));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log("socker server is running");
// });
app.listen(PORT, () => {

console.log(`Server running on ${PORT}`);

});
