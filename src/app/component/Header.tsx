"use client";
import { useState } from "react";
import GameSetting from "./GameSetting";

export default function Header(){  
  const [open, setOpen] = useState(false);
  return (
    <header className="mt-2 text-xl flex items-center justify-between">
      <h1>Memory Game</h1>
      <div className="flex items-center">
        <button className="w-7 mr-2 h-7 rounded-full flex items-center cursor-pointer justify-center bg-gray-100/[50%]" onClick={()=>setOpen(true)}>
          <img
            width="18"
            height="18"
            src="https://img.icons8.com/material-sharp/24/settings.png"
            alt="settings"
          />
        </button>
        <GameSetting isOpen={open} onClose={()=>setOpen(false)} />
      </div>
    </header>
  );
};
