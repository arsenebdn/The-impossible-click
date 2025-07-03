import { useEffect, useState } from "react";

export default function Level1({ onNext }) {
  const [pos, setPos] = useState({ top: "50%", left: "50%" });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    setPos({ top: `${y}%`, left: `${x}%` });

    // Laisse le temps au DOM de positionner le bouton avant d'animer
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
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
