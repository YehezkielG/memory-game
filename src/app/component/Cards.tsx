"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGameSettingsStore } from "../store/Stores";

import programming from "../CardComponent/programming.json";
import math from "../CardComponent/math.json";
import color from "../CardComponent/color.json";
import science from "../CardComponent/science.json";

interface CardsInterface{
  id: number;
  name: string;
  imgLoc?: string;
  symbol?:string;
  background?:string;
}

function shuffleData(arr: CardsInterface[]): CardsInterface[] {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function getTheme(Theme: string): CardsInterface[] {
  if (Theme == "programming") {
    return programming;
  } else if (Theme == "math") {
    return math;
  } else if (Theme == "color") {
    return color;
  }
  else{
    return science;
  }
}

export default function Cards({ moves }: { moves: () => void }) {
  const [cards, setCards] = useState<CardsInterface[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [check, setCheck] = useState<boolean>(false);
  const [savedIdCard, setSavedIdCard] = useState(-1);
  const [savedIndex, setSavedIndex] = useState(-1);
  const [grid, setGrid] = useState("");
  const { difficulty, theme } = useGameSettingsStore();

  const handleFlip = (index: number) => {
    setFlippedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleCardClick = (index: number, idCard: number) => {   
    moves();
    handleFlip(index);
    if (savedIdCard != idCard && check) {
      setCheck(!check);
      setTimeout(() => {
        handleFlip(savedIndex);
        handleFlip(index);
      }, 500);
      setSavedIdCard(-1);
      setSavedIndex(-1);
    } else {
      setSavedIdCard(idCard);
      setSavedIndex(index);
      }
      setCheck(!check);
  };

  useEffect(() => {
    setCheck(false);
    setSavedIdCard(-1);
    setSavedIndex(-1);
    setFlippedCards([]);
    const timeout = setTimeout(() => {
      let selectedCards = shuffleData(getTheme(theme)).slice(0, difficulty);
      const shuffledCards = selectedCards;
      shuffledCards.forEach((card) => {
        selectedCards.push(card);
      });
      selectedCards = shuffleData(selectedCards);
      setCards(selectedCards);
      if (difficulty == 12) {
        setGrid("grid-cols-4 w-[400px]");
      } else if (difficulty == 18) {
        setGrid("grid-cols-4 sm:grid-cols-6 sm:w-[600px] w-[100%]");
      } else if (difficulty == 24) {
        setGrid("grid-cols-6 sm:grid-cols-8 sm:w-[730px] w-[100%]");
      } else if (difficulty == 30) {
        setGrid("grid-cols-6 sm:grid-cols-10 sm:w-[950px] w-[100%]");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [theme, difficulty]);

  useEffect(()=>{
    if(flippedCards.length == (difficulty*2)){
      setTimeout(()=>{
        alert("you win")
      },500)
    }
  },[flippedCards])

  return (
    <div className="flex justify-center w-full">
      <div className={`grid ${grid} sm:gap-1 gap-0.5`}>
        {cards.map((card, index) => (
          <motion.div
            className="relative aspect-square cursor-pointer"
            onClick={
              !flippedCards.includes(index)
                ? () => handleCardClick(index, card.id)
                : undefined
            }
            key={index}
          >
            {/* Animasi Flip */}
            <motion.div
              className="absolute w-full h-full"
              animate={{ rotateY: flippedCards.includes(index) ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              style={{ transformStyle: "preserve-3d" }}
            > 
              <button className="absolute w-full h-full  flex items-center justify-center bg-blue-100 rounded-lg backface-hidden">
                ❓
              </button> 
              <button
                value={card.id}
                className="absolute w-full h-full  flex items-center justify-center bg-white rounded-lg backface-hidden"
                style={{ transform: "rotateY(180deg)" }}
              >
                {theme === "science" || theme === "programming"  ? (
                  <img
                    src={`${card.imgLoc}`}
                    className="object-contain sm:p-2 p-1 w-11/12"
                    alt={`${card.name}`}
                  />
                ) : (
                  ""
                )}
                {theme == "math" ? (
                  <div className="text-4xl">{card.symbol}</div>
                ) : (
                  ""
                )}
                {theme == "color" ? (
                  <div
                    className={`w-full h-full rounded-lg`}
                    style={{ background: `${card.background}` }}
                  ></div>
                ) : (
                  ""
                )}
              </button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}