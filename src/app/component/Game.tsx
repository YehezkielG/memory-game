"use client";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import { useGameSettingsStore, useWiningGameStrore } from "../store/Stores";
import Completed from "./GameWin";

function Moves({ moveCount }: { moveCount: number }) {
  return <div className="mx-2">Moves {moveCount},</div>;
}

function Times({seconds}:{seconds:number}) {
  return (
    <span>
      {`Time ${Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0")} :  ${(seconds % 60).toString().padStart(2, "0")}`}
    </span>
  );
}

export default function Game() {
  const [moves, SetMoves] = useState<number>(0);
  const { difficulty, theme } = useGameSettingsStore();
  const { isWinning, setMovesStore, setTimeStore } = useWiningGameStrore();
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (isWinning) return;
    const timer: NodeJS.Timeout = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds,isWinning]);

  useEffect(() => {
    setTimeStore(
      `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")} :  ${(seconds % 60).toString().padStart(2, "0")}`)
    setMovesStore(moves);  
    SetMoves(0);
    setSeconds(0);
  }, [theme, difficulty,isWinning]);

  return (
    <>
      {isWinning ? (
        <div>
          <Completed />
        </div>
      ) : (
        <div className="">
          <div className="flex h-[5svh] items-center justify-between">
            <div>
              {theme.charAt(0).toUpperCase() + theme.slice(1)},{" "}
              {difficulty == 12 ? "Easy" : ""}
              {difficulty == 18 ? "Medium" : ""}
              {difficulty == 24 ? "Hard" : ""}
              {difficulty == 30 ? "Extreme" : ""}
            </div>
            <div className="flex items-center">
              <Moves moveCount={moves} />
              <Times seconds={seconds }/>
            </div>
          </div>
          <div className="flex items-center justify-center h-[89svh]">
            <Cards moves={() => SetMoves(moves + 1)} />
          </div>
        </div>
      )}
    </>
  );
}
