export default function Fail({ onRestart }) {
  return (
    <div id="fail-screen">
      <h2>💀 Temps écoulé ou erreur.</h2>
      <p>Tu dois tout recommencer.</p>
      <button onClick={onRestart}>Recommencer</button>
    </div>
  );
}
