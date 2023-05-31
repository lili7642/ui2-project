import React from "react";
import ReactConfetti from "react-confetti";

//Confetti component will only render when showConfetti-state is true
const Confetti = ({ showConfetti }) => {
  return (
    <>
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}
    </>
  );
};

export default Confetti;