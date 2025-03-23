import React, { useState, useEffect } from "react";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = new WebSocket("ws://localhost:5000"); // ✅ Connect to local WebSocket server

        newSocket.onopen = () => {
            console.log("Connected to WebSocket");
            setIsConnected(true);
        };

        newSocket.onmessage = async (event) => {
            let messageData = event.data;

            if (messageData instanceof Blob) {
                messageData = await messageData.text(); // ✅ Convert Blob to text
            }

            setMessages((prevMessages) => [...prevMessages, messageData]);
        };

        newSocket.onclose = () => {
            console.log("WebSocket Disconnected");
            setIsConnected(false);
        };

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []); // ✅ Runs only once

    const sendMessage = () => {
        if (!input.trim() || !isConnected || !socket) return;
        socket.send(input);
        setMessages((prevMessages) => [...prevMessages, input]);
        setInput("");
    };

    return (
        <div style={{
            maxWidth: "400px", 
            margin: "auto", 
            textAlign: "center", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            padding: "20px"
        }}>
            <h2>💬 WebSocket Chat</h2>
            <div style={{
                border: "1px solid #ccc", 
                padding: "10px", 
                height: "300px", 
                width: "100%", 
                maxWidth: "400px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                background: "#f9f9f9",
                borderRadius: "8px"
            }}>
                {messages.map((msg, index) => (
                    <p key={index} style={{
                        textAlign: "left", 
                        padding: "8px", 
                        background: "#e1f5fe", 
                        borderRadius: "5px",
                        margin: "2px 0"
                    }}>
                        {msg}
                    </p>
                ))}
            </div>
            <div style={{ display: "flex", gap: "5px", marginTop: "10px", width: "100%", maxWidth: "400px" }}>
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Type a message..." 
                    style={{ 
                        flexGrow: 1, 
                        padding: "10px", 
                        borderRadius: "5px", 
                        border: "1px solid #ccc" 
                    }} 
                />
                <button 
                    onClick={sendMessage} 
                    disabled={!isConnected} 
                    style={{ 
                        padding: "10px", 
                        borderRadius: "5px", 
                        border: "none", 
                        background: isConnected ? "#007bff" : "#ccc", 
                        color: "white", 
                        cursor: isConnected ? "pointer" : "not-allowed" 
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
