import React, { useRef, useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock || data[num] !== "") {
      return;
    }

    if (count % 2 === 0) {
      data[num] = "x";
      e.target.innerHTML = `<img src="${cross_icon}" alt="X" width="35" height="35"/>`;
    } else {
      data[num] = "o";
      e.target.innerHTML = `<img src="${circle_icon}" alt="O" width="35" height="35"/>`;
    }
    setCount(count + 1);

    checkWin();
  };

  const checkWin = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for(let pattern of winPatterns){
        const [a,b,c] = pattern;
        if(data[a] !== "" && data[a] === data[b] && data[a] === data[c]){
            won(data[a])
            return;
        }
    }
  };

  const won = (winner) => {
    setLock(true);
    if(winner === 'x'){
        titleRef.current.innerHTML = `Congratulations: <img src="${cross_icon}"  width="35" height="35"/>  Wins`
    } else {
         titleRef.current.innerHTML = `Congratulations: <img src="${circle_icon}" width="35" height="35" />  Wins`
    }
  };

  const reset = () => {
    setLock(false);
    data= ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = "TicTacToe Game"

    document.querySelectorAll('.boxes').forEach(box => (box.innerHTML = ""))
  }

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>TicTacToe Game</h1>
      <div className="board">
        <div className="row1">
          <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className="row2">
          <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className="row3">
          <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <button className="reset" onClick={() => {reset()}}>Reset</button>
    </div>
  );
};

export default TicTacToe;
