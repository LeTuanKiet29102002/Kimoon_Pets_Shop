import React, { useState } from 'react';
import './Darkmode.css'; // Import CSS file for styles

function Toggle() {
  const [isNight, setIsNight] = useState(false);

  const handleToggle = (e) => {
    const isChecked = e.target.checked;
    setIsNight(isChecked);
    if (isChecked) {
      document.querySelector("body").classList.add("night");
      document.getElementById("toggle-div").classList.add("night");
    } else {
      document.querySelector("body").classList.remove("night");
      document.getElementById("toggle-div").classList.remove("night");
    }
  };
  
  return (
    <body className= 'body'>
      <label htmlFor="toggle" id="toggle-label">
        <div id="toggle-div">
          <input type="checkbox" id="toggle" onChange={handleToggle} />
          <div className="clouds">
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="cloud cloud-3"></div>
            <div className="cloud cloud-4"></div>
            <div className="cloud cloud-5"></div>
          </div>
          <div className="backdrops">
            <div className="backdrop"></div>
          </div>
          <div className="stars">
            <div className="star star-1"></div>
            <div className="star star-2"></div>
            <div className="star star-3"></div>
          </div>
          <div className="sun-moon">
            <div className="crater"></div>
          </div>
        </div>
      </label>
    </body>
  );
}

export default Toggle;
