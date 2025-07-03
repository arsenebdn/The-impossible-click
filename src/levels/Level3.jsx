import { useEffect, useRef, useState } from "react";

export default function Level3({ onNext }) {
  const [pos, setPos] = useState({ top: "50%", left: "50%" });
  const [visible, setVisible] = useState(false);
  const btnRef = useRef();
  const timeoutRef = useRef(null);

  const moveButton = () => {
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    setPos({ top: `${y}%`, left: `${x}%` });
  };

  useEffect(() => {
    moveButton();
    const timeout = setTimeout(() => setVisible(true), 10);

    const handleMouseMove = (e) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 60 && !timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          moveButton();
          timeoutRef.current = null;
        }, 100);
      } else if (dist >= 60 && timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div id="game-area">
      <button
        ref={btnRef}
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
