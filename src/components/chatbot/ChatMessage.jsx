import MarketResultCard from "./MarketResultCard";
import SeasonalResultCard from "./SeasonalResultCard";


const ChatMessage = ({ message }) => {
    return (
     <div
            className={
                message.sender === "user"
                    ? "chat-message-wrapper user-wrapper"
                    : "chat-message-wrapper bot-wrapper"
            }
        >
            {/* Normal message */}
            <div
                className={
                    message.sender === "user"
                        ? "chat-message user-message"
                        : "chat-message bot-message"
                }
            >
                {message.text}

            </div>
            {/* Single Market */}
            {message.type === "market" && message.data && (

                <MarketResultCard
                    market={message.data}
                />

            )}
            {/* Multiple Markets */}
            {message.type === "markets" &&
                Array.isArray(message.data) && (

                    <div className="chat-market-results">

                        {message.data.map((market) => (

                            <MarketResultCard
                                key={market.id}
                                market={market}
                            />

                        ))}

                    </div>

                )}
            {/* Seasonal Results */}
            {message.type === "seasonal" &&
                Array.isArray(message.data) && (

                    <div className="seasonal-results">

                        {message.data.map((item) => (

                            <SeasonalResultCard
                                key={item.id}
                                item={item}
                           />
                        ))}

                    </div>
                )}
        </div>
    );
};


export default ChatMessage;