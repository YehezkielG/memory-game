import { create } from "zustand";

type ThemeType = "math" | "programming" | "color" | "science";
type CardSet = 12 | 18 | 24 | 30;

interface GameSettingsStore {
  theme: ThemeType;
  setTheme: (t: ThemeType) => void;

  difficulty: CardSet;
  setDifficulty: (d: CardSet) => void;
}

export const useGameSettingsStore = create<GameSettingsStore>((set) => ({
  theme: "programming",
  setTheme: (t) => set({ theme: t }),

  difficulty: 12,
  setDifficulty: (d) => set({ difficulty: d }),
}));

interface isWinningStore{
  isWinning:boolean;
  setWinning: (w:boolean) => void;

  time:string;
  setTimeStore: (w:string) => void;

  moves:number;
  setMovesStore: (w:number) => void;
}

export const useWiningGameStrore = create<isWinningStore>((set) => ({ 
  isWinning: false,
  setWinning:(w) => set({ isWinning:w }),
  time: "",
  setTimeStore:(w) => set({ time:w }),
  moves: 0,
  setMovesStore:(w) => set({ moves:w }),
}));
