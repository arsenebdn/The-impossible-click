export default function Start({ onStart }) {
  return (
    <div id="home-screen">
      <h1>T'as réussi à cliquer ?</h1>
      <p className="rules">
        Tu as <strong>5 secondes</strong> pour cliquer sur le <strong>bon bouton</strong>.<br />
        Si tu rates ou cliques mal, tu <strong>recommences au niveau 1</strong>.<br />
        Chaque niveau est <em>plus injuste que le précédent</em>.<br />
        Bonne chance.
      </p>
      <button id="start-btn" className="rouge" onClick={onStart}>JOUER</button>
    </div>
  );
}
