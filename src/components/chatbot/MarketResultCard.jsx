import { Link } from 'react-router-dom';
import { marketImage } from '../../utils/market';

const MarketResultCard = ({ market }) => {

    return (

        <div className="market-result-card">

                <img
                    src={marketImage(market)}
                    alt="Fresh produce at a Lagos market"
                    className="market-result-image"
                />

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

                <Link to={`/markets/${market.id}`} className="view-market-btn">
                    View Market
                </Link>

            </div>

        </div>

    );
};

export default MarketResultCard;
