import { useState } from "react";
import { getBotResponse } from "../../utils/chatbotEngine";
import ChatMessage from "./ChatMessage";
import "./ChatBot.css";

const ChatBot = () => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hi! 👋 I'm the FreshFind Assistant. How can I help you today?",
            type: "text"
        }
    ]);

    const handleSend = (customMessage = null) => {
        const messageText = customMessage || input;
        if (!messageText.trim()) return;
        const userMessage = {
            sender: "user",
            text: messageText,
            type: "text"
        };

        const response = getBotResponse(messageText);
        const botMessage = {
            sender: "bot",
            text: response.message,
            data: response.data || null,
            type: response.type || "text"
        };


        setMessages((previousMessages) => [
            ...previousMessages,
            userMessage,
            botMessage
        ]);
        setInput("");
    };


    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSend();
        }
    };


    return (
        <>
            {/* Floating Chat Button */}
            <button
                className="chat-launcher"
                onClick={() => setOpen((previous) => !previous)}
                aria-label={open ? "Close chat" : "Open chat"}
            >
                {open ? "✕" : "💬"}
            </button>

            {/* Chat Window */}
            {open && (
                <div className="chat-container">
                    {/* Header */}
                    <div className="chat-header">
                        <div>
                            <h3>
                                FreshFind Assistant
                            </h3>
                            <span>
                                Ask about markets & produce
                            </span>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="chat-body">
                        {messages.map((message, index) => (
                            <ChatMessage
                                key={`${message.sender}-${index}`}
                                message={message}
                            />
                        ))}

                    </div>


                    {/* Quick Suggestions */}
                    <div className="chat-suggestions">

                        <button
                            onClick={() =>
                                handleSend("Markets open today")
                            }
                        >
                            Markets open today
                        </button>


                        <button
                            onClick={() =>
                                handleSend(
                                    "Where can I find tomatoes?"
                                )
                            }
                        >
                            Find tomatoes
                        </button>


                        <button
                            onClick={() =>
                                handleSend(
                                    "What's in season?"
                                )
                            }
                        >
                            What's in season?
                        </button>

                    </div>


                    {/* Input */}

                    <div className="chat-input">

                        <input
                            type="text"
                            placeholder="Ask FreshFind..."
                            value={input}
                            onChange={(event) =>
                                setInput(event.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            aria-label="Ask FreshFind"
                        />


                        <button
                            onClick={() => handleSend()}
                            aria-label="Send message"
                        >
                            ➤
                        </button>

                    </div>

                </div>

            )}

        </>

    );
};


export default ChatBot;