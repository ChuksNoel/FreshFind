import "../Style/Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar-container">

        <div className="navbar-logo">
          <img src="/logo.png" alt="FreshFind logo" />
        </div>

        <div className="navbar-right">
          <div className="navbar-links">
            <a href="/markets">Markets</a>
            <a href="/produce-guide">Produce Guide</a>
            <a href="/saved">Saved</a>
          </div>

          <div className="navbar-divider"></div>

          <div className="navbar-actions">
            <button className="navbar-icon" type="button" aria-label="Search">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16" y1="16" x2="21" y2="21" />
              </svg>
            </button>

            <button className="navbar-icon" type="button" aria-label="Location">
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
            </button>
          </div>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;