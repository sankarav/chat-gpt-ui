import React, { useState } from 'react';
import Message from './Message';
import './Chat.css';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' as const };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      try {
        const response = await fetch('http://localhost:8091/hello', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: input })
        });

        if (response.ok) {
          const botMessage = await response.json();
          setMessages(prevMessages => [...prevMessages, botMessage]);
        } else {
          const errorBotMessage = { text: 'Error: Could not get response from server.', sender: 'bot' as const };
          setMessages(prevMessages => [...prevMessages, errorBotMessage]);
        }
      } catch (error) {
        const errorBotMessage = { text: 'Error: Could not get response from server.', sender: 'bot' as const };
        setMessages(prevMessages => [...prevMessages, errorBotMessage]);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="message-list">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} sender={message.sender} />
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;