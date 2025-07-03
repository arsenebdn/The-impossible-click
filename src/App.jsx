import { useEffect, useState } from "react";
import Start from "./components/Start";
import Fail from "./components/Fail";
import Win from "./components/Win";
import Level1 from "./levels/Level1";
import Level2 from "./levels/Level2";
import Level3 from "./levels/Level3";
import Level4 from "./levels/Level4";
import Level5 from "./levels/Level5";

const levels = [Level1, Level2, Level3, Level4, Level5]; // + autres plus tard

export default function App() {
  const [status, setStatus] = useState("start"); // start | playing | fail | win
  const [level, setLevel] = useState(1);
  const [counter, setCounter] = useState(5);

  // Gère le timer
  useEffect(() => {
    if (status !== "playing") return;

    if (counter <= 0) {
      setStatus("fail");
      return;
    }

    const timer = setTimeout(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter, status]);

  const handleStart = () => {
    setLevel(1);
    setCounter(5);
    setStatus("playing");
  };

  const handleNext = () => {
    if (level >= levels.length) {
      setStatus("win");
    } else {
      setLevel((prev) => prev + 1);
      setCounter(5);
    }
  };

  const handleFail = () => {
    setStatus("fail");
  };

  const handleRestart = () => {
    setLevel(1);
    setCounter(5);
    setStatus("start");
  };

  const CurrentLevel = levels[level - 1];

  return (
    <>
      {status === "start" && <Start onStart={handleStart} />}

      {status === "fail" && <Fail onRestart={handleRestart} />}

      {status === "win" && <Win onRestart={handleRestart} />}

      {status === "playing" && (
        <div id="game-screen">
          <div id="hud">
            <span id="level-display">Niveau {level}</span>
            <span id="timer">{counter}</span>
          </div>
          <CurrentLevel onNext={handleNext} onFail={handleFail} />
        </div>
      )}
    </>
  );
}
