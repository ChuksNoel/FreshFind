import "../Style/MinBar.css";

function MinBar() {
  return (
    <section className="minbar">
      <div className="minbar-container">

        <button className="minbar-btn active">
          <span className="minbar-icon">▣</span>
          All Markets
        </button>

        <button className="minbar-btn">
          <span className="minbar-icon">♧</span>
          Organic Certified
        </button>

        <button className="minbar-btn">
          <span className="minbar-icon">▦</span>
          Seasonal Guides
        </button>

        <button className="minbar-btn">
          <span className="minbar-icon">✧</span>
          Artisan Goods
        </button>

        <button className="minbar-btn">
          <span className="minbar-icon">↗</span>
          Trending Now
        </button>

        <button className="minbar-btn">
          <span className="minbar-icon">☆</span>
          Pet Friendly
        </button>

      </div>
    </section>
  );
}

export default MinBar;