import React, { useState } from 'react';
import './ToggleLanguage.css';


const ToggleLanguage = () => {
    return (
        <>
            <div className="toggle">
                <input type="checkbox" id="btn" />
                <label for="btn">
                    <span className="thumb"></span>
                </label>
            </div>
        </>
    )

}

export default ToggleLanguage;