import { useEffect, useState } from "react";

export default function Level2({ onNext }) {
  const [pos, setPos] = useState({ top: "50%", left: "50%" });
  const [visible, setVisible] = useState(false);

  const moveRandom = () => {
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    setPos({ top: `${y}%`, left: `${x}%` });
  };

  useEffect(() => {
    moveRandom();
    const timeout = setTimeout(() => setVisible(true), 10);
    const interval = setInterval(moveRandom, 600);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div id="game-area">
      <button
        className={`game-btn ${visible ? "appear" : ""}`}
        style={{
          top: pos.top,
          left: pos.left,
          transform: "translate(-50%, -50%)",
        }}
        onClick={onNext}
      >
        Clique-moi
      </button>
    </div>
  );
}
