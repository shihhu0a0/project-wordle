import React from "react";

const Keyboard = () => {
  const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const handleClick = (char) => {
    onKeyPress(char);
  };

  return (
    <div className="virtual-keyboard">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((char, charIndex) => (
            <button key={charIndex} onClick={() => handleClick(char)}>
              {char}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
