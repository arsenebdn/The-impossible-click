import { useEffect, useRef, useState } from "react";

export default function Level6({ onNext }) {
  const btnRef = useRef();
  const areaRef = useRef();
  const [pos, setPos] = useState({ top: "50%", left: "50%" });

  // Position initiale du bouton
  useEffect(() => {
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    setPos({ top: `${y}%`, left: `${x}%` });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!btnRef.current || !areaRef.current) return;

      const rect = btnRef.current.getBoundingClientRect();
      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;

      const dx = e.clientX - btnX;
      const dy = e.clientY - btnY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const max = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
      const norm = Math.min(1, dist / max);

      const cold = [0, 119, 255];
      const hot = [255, 51, 0];
      const mix = cold.map((c, i) => Math.round(c + (hot[i] - c) * (1 - norm)));
      const color = `rgb(${mix.join(",")})`;

      areaRef.current.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, ${color} 0%, #121212 100%)`;
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div id="game-area" ref={areaRef}>
      <button
        ref={btnRef}
        className="game-btn"
        style={{
          top: pos.top,
          left: pos.left,
          transform: "translate(-50%, -50%)",
          opacity: 0,
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      />
    </div>
  );
}
