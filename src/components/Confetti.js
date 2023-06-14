import React from "react";
import ReactConfetti from "react-confetti";

/*File: Confetti.js

This file is used to implement ReactConfetti, that is shown when a correct guess is made
*/

//Confetti component will only render when showConfetti-state is true
const Confetti = ({ showConfetti }) => {
  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={3800}
          height={window.innerHeight}
        />
      )}
    </>
  );
};

export default Confetti;