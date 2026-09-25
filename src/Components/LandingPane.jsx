import React from "react";

function LandingPane({children, className}) {
  return (
    <React.Fragment>
      <section className="hanging-pane">
        <img src={null} alt="branch" />
        <div>
          <div className="wrapper">
            <div className={`front ${className}`}> {children} </div>
            <div className="back"></div>
          </div>
        </div>
      </section>
    </React.Fragment>
    )
}

export default LandingPane;
