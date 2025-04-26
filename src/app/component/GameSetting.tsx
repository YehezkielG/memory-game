"use client";

import { useGameSettingsStore } from "../store/Stores";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CardTheme() {
  const { theme, setTheme } = useGameSettingsStore();

  type ThemeType = "math" | "color" | "programming" | "science";

  interface ThemeOption {
    id: ThemeType;
    label: string;
    cards: string[];
  }

  const themes: ThemeOption[] = [
    {
      id: "programming",
      label: "programming",
      cards: ["Images/Programming/TS.png", "Images/Programming/python.png"],
    },
    { id: "math", label: "math", cards: ["√","∫"] },
    { id: "color", label: "color", cards: ["#39CCCC", "#F5F5DC"] },
    { id: "science", label: "science", cards: ["Images/science/acidbase.png", "Images/science/chemical.png"] },
  ];

  return (
    <>
      <h1 className="my-2 flex items-center">
        {/* <img
          width="18"
          height="18"
          src="icon/theme.png"
          alt="theme"
          className="mr-1"
        /> */}
        Card Theme
      </h1>
      <div className="grid grid-cols-2 gap-1 w-full  ">
        {themes.map((items) => (
          <label
            key={items.id}
            className={`bg-[#DAD2FF] cursor-pointer p-1 rounded-xl shadow-md transition-all text-center hover:border-blue-300
            ${
              theme === items.id
                ? "border-2 border-blue-500 text-gray-700"
                : ""
            }`}
          >
            <input
              type="radio"
              name="theme"
              value={items.id}
              checked={theme === items.id}
              onChange={() => setTheme(items.id)}
              className="hidden"
            />
            
            <div className="grid grid-cols-2 gap-2 h-9/12">
              {items.label === "science" || items.label === "programming" ? (
                <>
                  <div className="flex items-center h-24 justify-center bg-white rounded-lg">
                    <img
                      src={`${items.cards[0]}`}
                      className="object-contain sm:p-2 p-1"
                      alt={`${items.label}`}
                    />
                  </div>
                  <div className="flex items-center h-24 justify-center bg-white rounded-lg">
                    <img
                      src={`${items.cards[1]}`}
                      className="object-contain sm:p-2 p-1"
                      alt={`${items.label}`}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
              {items.label == "math" ? (<>
                <div className="flex items-center justify-center font-bold bg-white w-full h-full rounded-lg">
                  {items.cards[0]}
                </div>
                <div className="flex items-center justify-center font-bold bg-white rounded-lg">
                  {items.cards[1]}
                </div>
              </>
              ) : (
                ""
              )}
              {items.label == "color" ? (
                <>
                <div className="flex items-center justify-center bg-white rounded-lg">
                <div
                  className={`w-full h-full rounded-lg`}
                  style={{ background: `${items.cards[0]}` }}
                ></div>
                </div>
                <div className="flex items-center justify-center bg-white rounded-lg">
                <div
                  className={`w-full h-full rounded-lg`}
                  style={{ background: `${items.cards[1]}` }}
                ></div>
                </div>
                </>
                
              ) : (
                ""
              )}
            </div>
            <div className="my-1">{items.label}</div>
          </label>
        ))}
      </div>
    </>
  );
}

function GameDiffculty() {
  const { difficulty, setDifficulty } = useGameSettingsStore();

  type difficultyType = 12 | 18 | 24 | 30;

  interface difficultyoption {
    id: difficultyType;
    label: string;
    detail: string;
  }

  const difficultys: difficultyoption[] = [
    { id: 12, label: "easy", detail: "12 pairs" },
    { id: 18, label: "medium", detail: "18 pairs" },
    { id: 24, label: "hard", detail: "24 pairs" },
    { id: 30, label: "extreme", detail: "30 pairs" },
  ];

  return (
    <>
      <h1 className="my-2 flex items-center">
        {/* <img
          width="18"
          height="18"
          src="icon/ladder.png"
          alt="ladder"
          className="mr-1"
        /> */}
        Game Difficulty
      </h1>
      <div className="flex gap-2 justify-between">
        {difficultys.map((items) => (
          <label
            key={items.id}
            className={`cursor-pointer p-2 rounded-xl bg-[#DAD2FF] shadow-md transition-all w-40 text-center hover:border-blue-300
            ${
              difficulty === items.id
                ? "border-2 border-blue-500 text-gray-700"
                : ""
            }`}
          >
            <input
              type="radio"
              name="theme"
              value={items.id}
              checked={difficulty === items.id}
              onChange={() => setDifficulty(items.id)}
              className="hidden"
            />
            {items.label}
            <br />
            <span className="text-xs text-gray-700">({items.detail})</span>
          </label>
        ))}
      </div>
    </>
  );
}
export default function Modal({ isOpen, onClose }: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-200"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white py-6 px-4 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                >
                  <div className="flex my-2 items-center w-full justify-between">
                    <span>Game Settings</span>
                    <button className="cursor-pointer" onClick={onClose}>
                      <img src="icon/close.png" alt="close" className="w-6" />
                    </button>
                  </div>
                </Dialog.Title>
                <div className="mt-2">
                  <CardTheme />
                  <GameDiffculty />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}