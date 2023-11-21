import React, { useState } from "react";

import Keyboard from "../Keyboard/Keyboard";

const GuessInput = ({ handleAddGuess, isGameOver }) => {
  const [guess, setGuess] = useState("");
  
  const onKeyPress = (char) => {
    const newGuess = [...guess, char];
    setGuess(newGuess.join(''));
  }
  return (
    <>
      <form
        className="guess-input-wrapper"
        onSubmit={(event) => {
          event.preventDefault();
          const newGuess = guess;
          handleAddGuess(newGuess);
          setGuess("");
        }}
      >
        <label htmlFor="guess-input">Enter guess:</label>
        {!isGameOver ? (
          <input
            id="guess-input"
            type="text"
            minLength={5}
            maxLength={5}
            pattern="[a-zA-Z]{5}"
            value={guess}
            onChange={(event) => setGuess(event.target.value.toUpperCase())}
          />
        ) : null}
      </form>
      <Keyboard onKeyPress={onKeyPress}/>
    </>
  );
};

export default GuessInput;
