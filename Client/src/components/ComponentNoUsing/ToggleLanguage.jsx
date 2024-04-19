import React, { useState } from 'react';
import './ToggleLanguage.css';


const ToggleLanguage = () => {
    return (
        <>
            <div class="toggle">
                <input type="checkbox" id="btn" />
                <label for="btn">
                    <span class="thumb"></span>
                </label>
            </div>
        </>
    )

}

export default ToggleLanguage;