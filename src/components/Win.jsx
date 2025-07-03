import React from "react";

export default function Win({ onRestart }) {
  return (
    <div id="win-screen">
      <h2>👏 Tu as réussi à cliquer.</h2>
      <p>Tu es officiellement... une machine.</p>
      <button onClick={onRestart}>Rejouer</button>
    </div>
  );
}
