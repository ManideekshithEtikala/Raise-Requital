import { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import socket from "./socket.js"; // Import the Socket.IO client instance
import { UserContext } from "../../Authentication/UserContext"; // Import UserContext from its module
import { FaRegUserCircle } from "react-icons/fa";

const ChatPage = () => {
  const location = useLocation();
  const { senderId, receiverId, role } = location.state || {}; // Retrieve props from state
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Track theme state
const {user}=useContext(UserContext)
  // Refs for audio elements and chat container
  const incomingSoundRef = useRef(null);
  const outgoingSoundRef = useRef(null);
  const chatContainerRef = useRef(null); // Ref for the chat container

  useEffect(() => {
    if (!senderId || !receiverId) {
      console.error("Missing senderId or receiverId");
      return;
    }

    console.log("Joining chat with Sender ID:", senderId, "Receiver ID:", receiverId, "Role:", role);

    // Emit the join event with userId and role
    socket.emit("join", { userId: senderId, role });

    // Listen for incoming messages
    socket.on("receiveMessage", ({ senderId: incomingSenderId, message }) => {
      // Ignore messages sent by the current user
      if (incomingSenderId === senderId) {
        console.log("Ignoring message sent by the current user");
        return;
      }

      console.log("Message received:", { incomingSenderId, message });

      // Play incoming message sound
      if (incomingSoundRef.current) {
        console.log("Playing incoming sound...");
        incomingSoundRef.current.play().catch((error) => console.error("Error playing incoming sound:", error));
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId: incomingSenderId, message, isIncoming: true },
      ]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, [senderId, receiverId, role]);

  // Scroll to the bottom of the chat container when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      // Play outgoing message sound
      if (outgoingSoundRef.current) {
        console.log("Playing outgoing sound...");
        outgoingSoundRef.current.play().catch((error) => console.error("Error playing outgoing sound:", error));
      }

      // Send the message to the receiver
      socket.emit("sendMessage", {
        senderId: senderId,
        receiverId: receiverId,
        message,
      });

      // Add the message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId: senderId, message, isIncoming: false },
      ]);

      setMessage("");
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div
      className={`container mx-auto px-4 py-8 ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } transition-all duration-300`}
    >
      {/* Audio Elements for Notification Sounds */}
      <audio
        ref={incomingSoundRef}
        src="public/sounds/incoming.mp3"
        preload="auto"
        onCanPlay={() => console.log("Incoming sound is ready to play")}
      ></audio>
      <audio
        ref={outgoingSoundRef}
        src="public/sounds/outgoing.mp3"
        preload="auto"
        onCanPlay={() => console.log("Outgoing sound is ready to play")}
      ></audio>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Let&lsquo;s Have a Chat</h1>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-lg ${
            isDarkTheme
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          } transition-all duration-300`}
        >
          {isDarkTheme ? "Light Theme" : "Dark Theme"}
        </button>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef} // Attach the ref to the chat container
        className={`p-4 rounded-lg shadow-md h-96 overflow-y-auto ${
          isDarkTheme ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-2 font-serif ${
              msg.isIncoming ? "justify-start" : "justify-end"
            }`}
          >
          <div
            className={`p-2 max-w-xs ${
              msg.isIncoming
                ? isDarkTheme
                  ? "bg-blue-700 text-white"
                  : "bg-blue-200 text-gray-900"
                : isDarkTheme
                ? "bg-green-700 text-white"
                : "bg-green-200 text-gray-900"
            } ${
              msg.isIncoming
                ? "rounded-tr-lg rounded-tl-lg rounded-bl-lg" // Incoming message shape
                : "rounded-tr-lg rounded-tl-lg rounded-br-lg" // Outgoing message shape
            }`}
          >
            {msg.message}
          </div>
            <div className="ml-2 flex items-center">
              {msg.isIncoming ? (
                <FaRegUserCircle className="w-8 h-8 rounded-full"/>
              ):(
                <img
                src={user?.picture}
                alt="Outgoing User"
                className="w-8 h-8 rounded-full"
              />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="mt-4 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`flex-grow p-2 border rounded-lg outline-none ${
            isDarkTheme
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white text-gray-900 border-gray-300"
          }`}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className={`ml-2 px-4 py-2 rounded-lg ${
            isDarkTheme
              ? "bg-blue-600 text-white hover:bg-blue-500"
              : "bg-blue-500 text-white hover:bg-blue-400"
          } transition-all duration-300`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;