const ChatComponent = ({ message, showAvatar, showTimestamp }) => {
  return (
    <div key={message.id} className="message">
      {showAvatar ? (
        <img src={message.avatar} alt="avatar" className="avatar" />
      ) : <div className="avatar-blank"></div>}
      <div className="message-content">
        <div className="message-header">
          {showAvatar && <div className="username">{message.user}</div>}
          {showTimestamp && (
            <div className="timestamp">
              {message.timestamp.toLocaleTimeString()}
            </div>
          )}
        </div>
        <div className={`text ${message.user === 'Me' ? 'text-me' : 'text-other'}`}>{message.text}</div>
      </div>
    </div>
  );
};

export default ChatComponent;