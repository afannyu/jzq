import { useState } from "react";
import "./App.css";
import { Col, Row, Button } from "antd";

function Square({ value, handleClick, isWinnerSquare }) {
  return (
    <Col
      className={`col ${isWinnerSquare ? "winner" : ""}`}
      span={8}
      onClick={handleClick}
    >
      {value}
    </Col>
  );
}

// 宣布获胜者
function winner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const winningLine = lines.find(
    ([a, b, c]) =>
      squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
  );
  return winningLine ? winningLine : null;
}

function Board({ squares, nextIsX, change }) {
  const winningLine = winner(squares);
  console.log(winningLine, "jjj");
  let status;

  function handleSquareClick(i) {
    // 数据不可修改，出现胜出者不能再继续操作
    if (squares[i] || winner(squares)) return;

    const newSquare = [...squares];
    nextIsX ? (newSquare[i] = "X") : (newSquare[i] = "O");
    change(newSquare);
  }

  if (winningLine) {
    status = "winner: " + squares[winningLine[0]];
  } else if (squares.every((square) => square !== null)) {
    status = "It's a draw!"; // 所有方块都被填满，没有人获胜，显示平局消息
  } else {
    status = "nextPlayer: " + (nextIsX ? "X" : "O");
  }

  return (
    <div className="board">
      <div>{status}</div>
      <Row className="row">
        <Square
          handleClick={() => handleSquareClick(0)}
          value={squares[0]}
          isWinnerSquare={winningLine && winningLine.includes(0)}
        />
        <Square
          handleClick={() => handleSquareClick(1)}
          value={squares[1]}
          isWinnerSquare={winningLine && winningLine.includes(1)}
        />
        <Square
          handleClick={() => handleSquareClick(2)}
          value={squares[2]}
          isWinnerSquare={winningLine && winningLine.includes(2)}
        />
      </Row>
      <Row className="row">
        <Square
          handleClick={() => handleSquareClick(3)}
          value={squares[3]}
          isWinnerSquare={winningLine && winningLine.includes(3)}
        />
        <Square
          handleClick={() => handleSquareClick(4)}
          value={squares[4]}
          isWinnerSquare={winningLine && winningLine.includes(4)}
        />
        <Square
          handleClick={() => handleSquareClick(5)}
          value={squares[5]}
          isWinnerSquare={winningLine && winningLine.includes(5)}
        />
      </Row>
      <Row className="row">
        <Square
          handleClick={() => handleSquareClick(6)}
          value={squares[6]}
          isWinnerSquare={winningLine && winningLine.includes(6)}
        />
        <Square
          handleClick={() => handleSquareClick(7)}
          value={squares[7]}
          isWinnerSquare={winningLine && winningLine.includes(7)}
        />
        <Square
          handleClick={() => handleSquareClick(8)}
          value={squares[8]}
          isWinnerSquare={winningLine && winningLine.includes(8)}
        />
      </Row>
    </div>
  );
}

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); // 当前步数
  const nextIsX = currentMove % 2 === 0;
  const currentSquare = history[currentMove];

  // 处理每一步的落子事件
  function change(newSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), newSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // 历史记录跳转
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, index) => {
    let text;
    if (index) {
      text = `go to move # ${index}`;
    } else {
      text = "go to game start";
    }
    return (
      <li key={index}>
        <Button onClick={() => jumpTo(index)}>{text}</Button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquare} nextIsX={nextIsX} change={change} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
