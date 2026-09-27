import React, { useState } from "react";
import MarketResultCard from "./MarketResultCard";
import SeasonalResultCard from "./SeasonalResultCard";
import { Circle } from "lucide-react";
import { useEffect } from "react";


const ChatMessage = ({ message, loading }) => {
  const [showMsg, setShowMsg] = useState(loading ^ false)

  useEffect(() => {
    let callback = () => setShowMsg(true)
    setTimeout(callback, 3500)
  })

  return <div className={message.sender === "user" ? "chat-message-wrapper user-wrapper" : "chat-message-wrapper bot-wrapper"} >
    {message.sender === 'user'?
      <div className="chat-message user-message">
        {message.text}
      </div>
      : !showMsg && loading ?
        <div className="chat-message bot-message">
          <Circle fill="var(--ink)" size={15} className='waiting' />
          <Circle fill="var(--ink)" size={15} className='waiting' />
          <Circle fill="var(--ink)" size={15} className='waiting' />
        </div>
        :
        <React.Fragment>
          <div className="chat-message bot-message"> {/* Normal message */}
            { message.text }
          </div>

          {message.type === "market" && message.data && /* Single Market */
            <MarketResultCard market={message.data} />
          }

          {message.type === "markets" && Array.isArray(message.data) && /* Multiple Markets */
            <div className="chat-market-results">
              {message.data.map((market) => <MarketResultCard key={market.id} market={market} />)}
            </div>
          }

          {message.type === "seasonal" && Array.isArray(message.data) && /* Seasonal Results */
            <div className="seasonal-results">
              {message.data.map((item) => <SeasonalResultCard key={item.id} item={item} />)}
            </div>
          }
        </React.Fragment>
    }
  </div>

};


export default ChatMessage;
