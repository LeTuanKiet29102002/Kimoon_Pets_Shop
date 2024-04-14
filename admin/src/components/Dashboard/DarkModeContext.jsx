import React, { createContext, useState, useContext } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    const body = document.querySelector("body");
    // const toggleDiv = document.querySelector(".toggle-div");
    if (isDarkMode) {
      body.classList.remove('dark-theme-variables');
    //   toggleDiv.classList.remove("night");
      body.classList.remove("night");
    } else {
      body.classList.add('dark-theme-variables');
    //   toggleDiv.classList.add("night");
      body.classList.add("night");
    }
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
