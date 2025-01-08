import Confetti from "react-confetti";

export const CustomConfetti = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "98%",
        height: "100%",
        zIndex: 1091,
        overflowX: "hidden",
      }}
    >
      <Confetti gravity={0.2} run={true} numberOfPieces={100} />
    </div>
  );
};
