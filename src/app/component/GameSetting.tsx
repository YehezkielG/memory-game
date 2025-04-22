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
  }

  const themes: ThemeOption[] = [
    { id: "programming", label: "programming" },
    { id: "math", label: "math" },
    { id: "color", label: "color" },
    { id: "science", label: "science" },
  ];

  return (
    <>
      <h1 className="my-2  flex items-center">
      <img 
            width="18"
            height="18"
            src="icon/theme.png" 
            alt="theme"
            className="mr-1"
            />
        Card Theme</h1>
      <div className="flex gap-2">
        {themes.map((items) => (
          <label
            key={items.id}
            className={`cursor-pointer p-2 rounded-xl border-2 shadow-md transition-all w-40 text-center hover:border-blue-300
            ${
              theme === items.id
                ? "border-2 border-blue-500 text-gray-700"
                : "border-2"
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
            {items.label}
          </label>
        ))}
      </div>
    </>
  );
}

function GameDiffculty() {
  const { difficulty, setDifficulty } = useGameSettingsStore();

  type difficultyType = 8 | 16 | 24 | 32;

  interface difficultyoption {
    id: difficultyType;
    label: string;
    detail: string;
  }

  const difficultys: difficultyoption[] = [
    { id: 8, label: "easy", detail: "8 pairs" },
    { id: 16, label: "medium", detail: "16 pairs" },
    { id: 24, label: "hard", detail: "24 pairs" },
    { id: 32, label: "extreme", detail: "32 pairs" },
  ];

  return (<>
      <h1 className="my-2 flex items-center"><img 
            width="18"
            height="18"
            src="icon/ladder.png" 
            alt="ladder"
            className="mr-1"
            />
        Game Difficulty
      </h1>
      <div className="flex gap-2">
        {difficultys.map((items) => (
          <label
            key={items.id}
            className={`cursor-pointer p-2 rounded-xl border-2 shadow-md transition-all w-40 text-center hover:border-blue-300
            ${
              difficulty === items.id
                ? "border-2 border-blue-500 text-gray-700"
                : "border-2"
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
            {items.label}<br />
            <span className="text-xstext-gray-700">({items.detail})</span>
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
                  <div className="flex items-center w-full justify-between">
                  <span>
                    Game Settings
                  </span>
                  <span className="">
                    <img src="icon/close.png" alt="close" className="w-5" />
                  </span>    
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
