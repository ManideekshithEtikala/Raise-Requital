import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import nodemailer from "nodemailer"; // Import nodemailer for sending emails
import crypto from "crypto"; // Import crypto for generating OTPs
import businessRouter from "./EnterpreneureData/Routers/Data.js";
import investorRouter from "./Investors/Routers/InvestorsData.js";

const app = express();
const server = http.createServer(app);
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
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Temporary storage for OTPs
const otpStore = {};

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service provider
  auth: {
    user: "your-email@gmail.com", // Replace with your email
    pass: "your-email-password", // Replace with your email password or app password
  },
});

// Routes
app.post("/send-otp", async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password (you can add your own logic here)
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  // Generate a 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Store the OTP temporarily (you can use a database instead)
  otpStore[email] = otp;

  // Send the OTP via email
  try {
    await transporter.sendMail({
      from: "your-email@gmail.com", // Replace with your email
      to: email,
      subject: "Your OTP for RaiseRequital",
      text: `Your OTP is: ${otp}`,
    });

    console.log(`OTP sent to ${email}: ${otp}`);
    res.json({ success: true, message: "OTP sent successfully." });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  // Validate email and OTP
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Email and OTP are required." });
  }

  // Check if the OTP matches
  if (otpStore[email] === otp) {
    // OTP is valid, remove it from the store
    delete otpStore[email];
    res.json({ success: true, message: "OTP verified successfully." });
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP." });
  }
});


// Routes
// app.get("/", (req, res) => {

//   res.send("Hello World");
// });
app.use("/business", businessRouter);
app.use('/investor', investorRouter);

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