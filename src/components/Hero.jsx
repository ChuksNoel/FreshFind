import "../Style/Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">

        {/* Hero Text */}
        <div className="hero-text">
          <span className="hero-label">
            FRESH ALL ALONG
          </span>

          <h1>
            Discover the Harvest of <br />
            Your Community.
          </h1>

          <p>
            Connecting you with local farmers, sustainable artisans, and the
            freshest seasonal produce available right in your neighborhood.
          </p>
        </div>

        {/* Search Box */}
        <div className="hero-search">
          <div className="hero-location">

            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11z" />
              <circle cx="12" cy="10" r="2" />
            </svg>

            <span>San Francisco, CA</span>
          </div>

          <button>
            Find Markets
          </button>
        </div>

        {/* Community */}
        <div className="hero-community">

          <div className="hero-avatars">
            <div className="avatar">1</div>
            <div className="avatar">2</div>
            <div className="avatar">3</div>

            <div className="avatar-more">
              +2K
            </div>
          </div>

          <p>
            Join <span>2,000+ neighbors</span> shopping local this week.
          </p>

        </div>

      </div>
    </section>
  );
}

export default Hero;