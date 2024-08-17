import React, { useState, useEffect } from 'react';

const ClearThePoints = () => {
  const [points, setPoints] = useState(3);
  const [random, setRandom] = useState([]);
  const [time, setTime] = useState(0);
  const [nextNumber, setNextNumber] = useState(1);
  const [allCleared, setAllCleared] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startGame, setStartGame] = useState(false);

  

  const handlePointChange = (e) => {
    const value = e.target.value;
      setPoints(value);
   
  };

  const handleRestart = () => {
    if (!startGame) {
      setStartGame(true);
    }
    setNextNumber(1)
    setTime(0);
    setAllCleared(false);
    setGameOver(false);
    ;
    const newRandom = Array.from({ length: points }, (_, i) => ({
      id: i + 1,
      clicked: false,
      top: Math.random() * 446,
      left: Math.random() * 440,
    }));
    setRandom(newRandom);
  };

  const handleChooseClick = (id) => {
    if (id === nextNumber) {
      setNextNumber(prevId => prevId + 1);
      setRandom(prevRandom =>
        prevRandom.map(random =>
          random.id === id ? { ...random, clicked: true } : random
        )
      );

      setTimeout(() => {
        setRandom(prevRandom => prevRandom.filter(random => random.id !== id));
      }, 2000);
    } else {
      setGameOver(true);
    }
  };
  useEffect(() => {
    let timer;
    if (random.length > 0 && !gameOver) {
      timer = setInterval(() => setTime(prevTime => prevTime + 0.1), 100);
    }
    return () => clearInterval(timer);
  }, [random, gameOver]);

  useEffect(() => {
    if (random.length > 0 && random.every(random => random.clicked) && points > 0 && !gameOver) {
      setAllCleared(true);
    }
  }, [random, points, gameOver]);

  return (
    <div className="p-8 max-w-md mx-auto  rounded-xl  overflow-hidden md:max-w-2xl ">
      <h2
        className={`text-xl font-bold mb-4 ${gameOver ? 'text-red-600' : allCleared ? 'text-green-600' : 'text-black'}`}
      >
        {gameOver ? 'GAME OVER' : allCleared ? 'ALL CLEARED' : "LET'S PLAY"}
      </h2>
      <div className="mb-4">
        <label className="mr-20">Points:</label>
        <input
          type="text"
          value={points}
          onChange={handlePointChange}
          className="border rounded w-32 "
         
        />
      </div>
      <div className="mb-2 flex items-center">
        <label className="mr-20">Time:</label>
        <span className="font-mono">{time.toFixed(1)}s</span>
      </div>
      <button
        onClick={handleRestart}
        className="bg-gray-300 text-black px-8  rounded hover:bg-gray-400 text-sm"
      >
        {startGame ? 'Restart' : 'Play'}
      </button>

      <div className="relative w-[500px] h-[500px] mt-8 border border-black">
        {random.map(randoms => (
          <div
            key={randoms.id}
            onClick={() => handleChooseClick(randoms.id)}
            className={`w-[50px] h-[50px] rounded-full border-2 border-black absolute flex items-center justify-center cursor-pointer transition-all duration-1000
        ${randoms.clicked ? 'bg-red-600 opacity-0' : 'bg-white'}`}
            style={{
              top: `${randoms.top}px`,
              left: `${randoms.left}px`,
              zIndex: points - randoms.id + 1,

            }}
          >
            {randoms.id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClearThePoints;
