import "../Style/Marcard.css";

function Marcard(props) {
  return (
    <div className="market-card">

      {/* Image */}
      <div className="market-img-container">
        <img
          src={props.img}
          alt={props.markName}
          className="market-img"
        />

        <span className="market-status">
          Open
        </span>
      </div>

      {/* Card Content */}
      <div className="market-content">

        <h2 className="market-name">
          {props.markName}
        </h2>

        <p className="market-location">
          <span>⌖</span>
          {props.markLoc}
        </p>

        <p className="market-time">
          <span>◷</span>
          {props.time}
        </p>

        <button className="market-button">
          {props.but}
        </button>

      </div>
    </div>
  );
}

export default Marcard;