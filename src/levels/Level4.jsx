import { useEffect, useRef, useState } from "react";

export default function Level4({ onNext }) {
  const btnRef = useRef();
  const areaRef = useRef();
  const [pos, setPos] = useState({ top: "50%", left: "50%" });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    setPos({ top: `${y}%`, left: `${x}%` });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = btnRef.current.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);

      setOpacity(dist < 100 ? 0.7 : 0);

      const areaRect = areaRef.current.getBoundingClientRect();
      const x = e.clientX - areaRect.left;
      const y = e.clientY - areaRect.top;

      areaRef.current.style.background = `radial-gradient(circle 100px at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, #121212 100%)`;
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div id="game-area" ref={areaRef} style={{ cursor: "none" }}>
      <button
        ref={btnRef}
        className="game-btn"
        style={{
          top: pos.top,
          left: pos.left,
          transform: "translate(-50%, -50%)",
          opacity,
          cursor: "none",
        }}
        onClick={onNext}
      />
    </div>
  );
}
