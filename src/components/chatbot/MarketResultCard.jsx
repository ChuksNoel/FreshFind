const MarketResultCard = ({ market }) => {

    return (

        <div className="market-result-card">

            {market.image && (

                <img
                    src={market.image}
                    alt={market.name}
                    className="market-result-image"
                />

            )}

            <div className="market-result-content">

                <h4>{market.name}</h4>

                <p>
                    📍 {market.area}
                </p>

                <p>
                    🕒 {market.openingTime} - {market.closingTime}
                </p>

                <div className="market-produce-tags">

                    {market.produce
                        ?.slice(0, 3)
                        .map((item, index) => (

                            <span key={index}>
                                {item}
                            </span>

                        ))}

                </div>

                <button className="view-market-btn">
                    View Market
                </button>

            </div>

        </div>

    );
};

export default MarketResultCard;