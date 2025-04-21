"use client";
import { useEffect, useState } from "react";
import Cards from "./Cards"
import { useGameSettingsStore } from "../store/Stores";

function Moves({ moveCount }: { moveCount:number }){
  return <div className="mx-2">
    Moves {moveCount}, 
  </div>
}

function Times(){
  const [seconds,setSeconds] = useState<number>(0);
  const {difficulty,theme} = useGameSettingsStore();

  useEffect(()=>{
    const timer:NodeJS.Timeout = setInterval(()=>{
      setSeconds(seconds + 1);
    },1000)
    return () => clearInterval(timer);
  },[seconds])

  useEffect(()=>{
    setSeconds(0);
  },[theme,difficulty])

  return <span>
    {`Time ${(Math.floor(seconds/60)).toString().padStart(2,"0")} :  ${(seconds%60).toString().padStart(2,"0")}`}
  </span>
}

export default function Game(){
  const [moves,SetMoves] = useState<number>(0);
  const {difficulty,theme} = useGameSettingsStore();

  useEffect(()=>{
    SetMoves(0);
  },[theme,difficulty])

  return (
    <>
      <div className="my-5">
          <div  className="flex items-center justify-end mb-5">
            <Moves moveCount={moves}/><Times />
          </div>
          <div className="flex justify-center items-center">
            <Cards moves={()=>SetMoves(moves+1)}/>
          </div>
        </div>
    </>
  ); 
};

