import { useEffect, useState } from 'react';

type Message = {
  id: number;
  sender: string;
  content: string;
};

export const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const loadInitialMessages = async () => {
      const initialMessages = [
        { id: 1, sender: 'bot', content: 'Добро пожаловать в чат!' }
      ];
      setMessages(initialMessages);
    };

    loadInitialMessages();
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: input
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Отправить</button>
      </div>
    </div>
  );
};
