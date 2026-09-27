import { useEffect, useRef, useState } from 'react';
import { ArrowUp, MessageCircle, RotateCcw, Sprout, X } from 'lucide-react';
import { getBotResponse } from '../../utils/chatbotEngine';
import ChatMessage from './ChatMessage';
import './chatbot.css';

const greeting = {
  sender: 'bot',
  text: 'Hello! Looking for something fresh? Ask me about Lagos markets, produce, or opening days.',
  type: 'text',
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([greeting]);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages]);

  function closeChat() {
    setOpen(false);
    launcherRef.current?.focus({ preventScroll: true });
  }

  function sendMessage(text) {
    const message = text.trim();
    if (!message) return;
    const response = getBotResponse(message);
    setMessages((previous) => [
      ...previous,
      { sender: 'user', text: message, type: 'text' },
      { sender: 'bot', text: response.message, data: response.data || null, type: response.type || 'text' },
    ]);
    setInput('');
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className="chat-launcher"
        onClick={() => open ? closeChat() : setOpen(true)}
        aria-label={open ? 'Close chat' : 'Ask FreshFind — open chat'}
        aria-expanded={open}
        aria-controls={open ? 'freshfind-chat' : undefined}
      >
        {open ? <X size={22} /> : <MessageCircle size={23} />}
        {!open && <span>Ask FreshFind</span>}
      </button>
      {open? (
        <div id="freshfind-chat" className="chat-container" role="dialog" aria-label="FreshFind assistant" onKeyDown={(event) => { if (event.key === 'Escape') closeChat(); }}>
          <div className="chat-header">
            <span className="chat-brand-icon"><Sprout size={21} /></span>
            <div><h2>Your fresh-find friend.</h2><span>LET’S EXPLORE LAGOS</span></div>
            <button type="button" onClick={() => { setMessages([greeting]); setInput(''); inputRef.current?.focus(); }} aria-label="Reset conversation"><RotateCcw size={16} /></button>
            <button type="button" onClick={closeChat} aria-label="Close assistant"><X size={19} /></button>
          </div>
          <div className="chat-body" ref={bodyRef} role="log" aria-live="polite" aria-relevant="additions" onClick={(event) => { if (event.target.closest('a')) closeChat(); }}>
            {messages.map((message, index) => <ChatMessage key={index} message={message} loading={index != messages.length - 1} />)}
          </div>
          <div className="chat-suggestions">
            <button type="button" onClick={() => sendMessage('Markets open today')}>Open today</button>
            <button type="button" onClick={() => sendMessage('Where can I find tomatoes?')}>Find tomatoes</button>
            <button type="button" onClick={() => sendMessage("What's in season?")}>In season</button>
          </div>
          <form className="chat-input" onSubmit={(event) => { event.preventDefault(); sendMessage(input); }}>
            <input ref={inputRef} type="text" placeholder="What are you looking for?" value={input} onChange={(event) => setInput(event.target.value)} aria-label="Ask FreshFind" />
            <button type="submit" disabled={!input.trim()} aria-label="Send message"><ArrowUp size={19} /></button>
          </form>
          <div className="chat-footnote">A little help for your next market trip.</div>
        </div>
      ) : null}
    </>
  );
}
