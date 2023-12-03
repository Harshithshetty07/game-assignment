import { useState } from 'react';
import './App.css';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

function App() {
  const [game, setGame] = useState(new Chess());

  function safeGame(modify) {
    setGame((g) => {
      const update = new Chess(g.fen());
      modify(update);
      return update;
    });
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over || game.in_draw || possibleMoves.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);

    safeGame((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  }

  function onDrop(source, target) {
    let move = null;
    safeGame((game) => {
      move = game.moves({
        from: source,
        to: target,
        promotion: 'q',
      });
    });

    if (move === null) return false;
    setTimeout(makeRandomMove, 200);
    return true;
  }

  return (
    <div className='app'>
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
      />
    </div>
  );
}

export default App;
