import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import http from "http"; // Import HTTP to create the server
import { Server } from "socket.io"; // Import Socket.IO
import businessRouter from "./EnterpreneureData/Routers/Data.js";

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

const url =
  "mongodb+srv://ManiDeekshithEtikala:Manideekshith%4011@raiserequitalcluster.vjbzt.mongodb.net/?retryWrites=true&w=majority&appName=RaiseRequitalCluster";

// Middleware
app.use(json());
// app.get("/connected-users", (req, res) => {
//   res.json(users); // Return the list of connected users
// });
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
app.use("/business", businessRouter);

// Socket.IO Logic
const users = {}; // Store connected users

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle user joining
  socket.on("join", ({ userId, role }) => {
    users[userId] = { socketId: socket.id, role };
    console.log(`${role} joined with ID: ${userId}`);
    console.log("Current users:", users);
  });

  // Handle sending messages
  socket.on("sendMessage", ({ senderId, receiverId, message ,senderName,senderImage }) => {
    const receiver = users[receiverId];
    if (receiver) {
      // Send the message to the receiver
      io.to(receiver.socketId).emit("receiveMessage", {
        senderId,
        message,
        senderName,
        senderImage
      });
      console.log(`Message sent from ${senderId} to ${receiverId}: ${message}`);
    } else {
      console.log(`Receiver ${receiverId} is not connected.`);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    for (const userId in users) {
      if (users[userId].socketId === socket.id) {
        delete users[userId];
        console.log(`User ${userId} removed from users list.`);
        break;
      }
    }
  });
});

// Connect to MongoDB and Start the Server
connect(url)
  .then(() => {
    console.log("Connected to database");
    server.listen(4000, () => {
      console.log("Server is running on http://localhost:4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });