const SeasonalResultCard = ({ item }) => (
  <div className="seasonal-result-card">
    <h4>{item.name}</h4>
    <span>{item.category}</span>
    <p>{item.message}</p>
  </div>
);

export default SeasonalResultCard;
