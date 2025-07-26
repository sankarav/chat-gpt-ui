
import React from 'react';

interface MessageProps {
  text: string;
  sender: 'user' | 'bot';
}

const Message: React.FC<MessageProps> = ({ text, sender }) => {
  return (
    <div className={`message ${sender}`}>
      {text}
    </div>
  );
};

export default Message;
