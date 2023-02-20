const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")
const socket = require("socket.io")
require("dotenv").config();

// Set up a new HTTP server using the Express app
const server = require('http').createServer(app);
// Create a new instance of the Socket.io server and attach it to the HTTP server
const io = socket(server,{
    cors:{
        origin: "http://localhost:3000",
        credentials: true,
    }
});

app.use(express.json());
app.use(cors());
app.use("/api", userRoutes)
app.use("/message", messageRoutes)


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log(error.message)
});


server.listen(process.env.PORT, ()=>{
    console.log(`Server started on port ${process.env.PORT}`)
})

// global map that contains the online users:
global.onlineUsers = new Map();

io.on('connection', (socket) => {
   global.chatSocket = socket
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id)
    })

    socket.on("send-user", (data) => {
        const userSocketSend = onlineUsers.get(data.to);
        if (userSocketSend){ // if user is online
            socket.to(userSocketSend).emit("message-received", data.message);
        }
    })

});
