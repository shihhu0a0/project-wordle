import React from "react";

import { GUESS_LENGTH_ALLOWED } from "../../constants";
import { range } from "../../utils";
import { checkGuess } from "../../game-helpers";

const Guess = ({ guesses, answer }) => {
  return (
    <>
      <div className="guess-results">
        {guesses.map((guessObj) => {
          const guess = guessObj.guess;
          const id = guessObj.id;
          return (
            <p className="guess" key={id}>
              {guess
                ? checkGuess(guess, answer).map(({letter, status}) => (
                    <span className={`cell ${status}`} key={Math.random()}>
                      {letter}
                    </span>
                  ))
                : range(0, GUESS_LENGTH_ALLOWED).map(() => (
                    <span className="cell" key={Math.random()}></span>
                  ))}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default Guess;
