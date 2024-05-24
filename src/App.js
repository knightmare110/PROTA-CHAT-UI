import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ChatComponent from "./components/ChatComponent";
import SendIcon from "./components/icons/SendIcon";
import GifIcon from "./components/icons/GifIcon";
import Header from "./components/Header";
import { API_TOKEN, API_URL, MY_AVATAR_URL, OTHER_AVATAR_URL } from "./utils/constant";
import ChannelHeader from "./components/ChannelHeader";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [gifs, setGifs] = useState([]);
  const [showGifs, setShowGifs] = useState(false);

  const sendMessage = (message) => {
    const newMessage = {
      id: Date.now().toString(),
      user: "Me",
      avatar: MY_AVATAR_URL,
      text: message,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleGifClick = (gifUrl) => {
    sendMessage(<img src={gifUrl} alt="gif" />);
    setShowGifs(false);
  };

  const fetchGifs = async () => {
    const response = await axios.get(
      `${API_URL}?api_key=${API_TOKEN}`
    );
    setGifs(response.data.data);
  };

  useEffect(() => {
    fetchGifs();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = {
        id: Date.now().toString(),
        user: 'Other',
        avatar: OTHER_AVATAR_URL,
        text: 'This is a mock message from another user.',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }, 10000); // every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <Header />
      <ChannelHeader />
      <div className="chat-window">
        <div className="messages">
          {messages.map((message, index) => {
            const showAvatar =
              index === 0 || messages[index - 1].user !== message.user;
            const showTimestamp =
            index === 0 || messages[index - 1].user !== message.user;
            return (
              <ChatComponent key={message.id} message={message} showAvatar={showAvatar} showTimestamp={showTimestamp}/>
            );
          })}
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="Enter Message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button onClick={() => setShowGifs(!showGifs)} className="btn btn-white"><GifIcon /></button>
          <button onClick={handleSend} className="btn btn-radius btn-primary"><SendIcon /></button>
        </div>
      </div>
      {showGifs && (
        <div className="gif-picker">
          <h1>Trending Gifs</h1>
          <div className="gif-container">
            {gifs.map((gif) => (
              <img
                key={gif.id}
                src={gif.images.fixed_height_small.url}
                alt={gif.title}
                onClick={() => handleGifClick(gif.images.fixed_height_small.url)}
                className="gif"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
