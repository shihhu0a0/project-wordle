import React, { useEffect, useState } from "react";

import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { WORDS } from "../../data";
import { checkGuess } from "../../game-helpers";
import { range, sample } from "../../utils";
import Guess from "../Guess";
import GuessInput from "../GuessInput";

// Pick a random word on every pageload.
// const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
// console.info({ answer });

export const getGuesses = () => {
  return range(0, NUM_OF_GUESSES_ALLOWED).map(() => {
    return { guess: "", id: Math.random() };
  });
};

const Game = () => {
  const [answer, setAnswer] = useState(() => sample(WORDS));
  const [guesses, setGuesses] = useState(getGuesses);
  const [guessNum, setGuessNum] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const handleRestart = () => {
    setIsGameOver(false);
    setIsWin(false);
    setGuessNum(0);
    setGuesses(getGuesses);
    setAnswer(sample(WORDS));
  };

  useEffect(() => {
    console.info({ answer });
  }, [answer]);

  useEffect(() => {
    if (guessNum > 0) {
      const lastGuess = guesses[guessNum - 1].guess;
      const isGuessCorrect = checkGuess(lastGuess, answer).every(
        (obj) => obj.status === "correct"
      );
      if (isGuessCorrect) {
        setIsGameOver(true);
        setIsWin(true);
      } else if (guessNum === 6) {
        // this is the last guess
        setIsGameOver(true);
      }
    }
  }, [guesses]);

  const handleAddGuess = (newGuess) => {
    if (guessNum >= NUM_OF_GUESSES_ALLOWED) {
      return;
    }
    const newGuessNum = guessNum + 1;
    setGuesses((prev) => {
      const updatedGuesses = [...prev];
      updatedGuesses[guessNum].guess = newGuess;
      return updatedGuesses;
    });
    setGuessNum(newGuessNum);
  };

  const renderGameOverBanner = () => {
    if (isGameOver) {
      if (isWin) {
        return (
          <div className="happy banner">
            <p>
              <strong>Congratulations!</strong> Got it in
              <strong> {guessNum} guesses</strong>.
            </p>
            <button className="restart" onClick={handleRestart}>Restart</button>
          </div>
        );
      } else {
        return (
          <div className="sad banner">
            <p>
              Sorry, the correct answer is <strong>{answer}</strong>.
            </p>
            <button className="restart" onClick={handleRestart}>Restart</button>
          </div>
        );
      }
    }
  };

  return (
    <>
      <Guess guesses={guesses} answer={answer} />
      <GuessInput handleAddGuess={handleAddGuess} isGameOver={isGameOver} />
      {renderGameOverBanner()}
    </>
  );
};

export default Game;
