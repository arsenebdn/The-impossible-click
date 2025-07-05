export default function Debug({ datas, ...props }) {
  const {
    handleFail,
    handleNext,
    handlePrev,
    handleRestart,
    handleStart,
    handlePlayAgain,
    toggleCounter,
  } = datas;
  return (
    <div
      className="debug-panel"
      style={{
        padding: "20px",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "300px",
        textAlign: "left",
        zIndex: 1000,
      }}
    >
      <h2 style={{marginBlock: 6}}>Debug Mode</h2>

      <label
        htmlFor="counter-checkbox"
        style={{ fontSize: 12 }}
      >
        <input type="checkbox" id="counter-checkbox" onChange={toggleCounter} />
        Désactiver le counter
      </label>

      <div style={{ display: "flex", flexDirection: "row", gap: "10px", marginTop: "10px" }}>
        <button
          onClick={handlePrev}
          style={{ fontSize: 12, padding: "6px 12px" }}
        >
          Précédent
        </button>
        <button
          onClick={handlePlayAgain}
          style={{ fontSize: 12, padding: "6px 12px" }}
        >
          Rejouer
        </button>
        <button
          onClick={handleNext}
          style={{ fontSize: 12, padding: "6px 12px" }}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
