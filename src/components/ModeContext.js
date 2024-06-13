import React, { useState } from 'react';
const ModeContext = React.createContext();

const ModeProvider = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState(true);

  const handleModeToggle = () => {
    setIsLightMode(prevMode => !prevMode);
  };
  return (
    <ModeContext.Provider value={{ isLightMode, handleModeToggle }}>
      {children}
    </ModeContext.Provider>
  );
};

export { ModeContext, ModeProvider };
