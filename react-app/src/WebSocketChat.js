import { useState, useEffect, useRef } from "react";

export default function WebSocketChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8080");

    socketRef.current.onopen = () => {
      console.log("Connected to WebSocket server!");
    };

    socketRef.current.onmessage = (message) => {
      setMessages((prev) => {
        return [...prev, message.data];
      });
    };

    socketRef.current.onclose = () => {
      console.log("Disconnected from WebSocket server!");
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (inputValue !== "" && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(inputValue);
      flushInputValue();
    }
  };

  const flushInputValue = () => {
    setInputValue("");
  };

  return (
    <>
      <h1>WebSocketChat</h1>

      <div>
        {messages.map((message, i) => {
          return <div key={Math.random + i}>{message}</div>;
        })}
      </div>

      <input
        type="text"
        value={inputValue}
        placeholder="Type your message."
        onChange={(event) => {
          event.preventDefault();
          setInputValue(event.target.value);
        }}
      />

      <button onClick={sendMessage}>Send</button>
    </>
  );
}
