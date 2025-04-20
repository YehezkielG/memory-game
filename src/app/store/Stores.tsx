import { create } from "zustand";

type ThemeType = "math" | "programming" | "color" | "science";
type CardSet = 8 | 16 | 24 | 32;

interface GameSettingsStore {
  theme: ThemeType;
  setTheme: (t: ThemeType) => void;

  difficulty: CardSet;
  setDifficulty: (d: CardSet) => void;
}

export const useGameSettingsStore = create<GameSettingsStore>((set) => ({
  theme: "programming",
  setTheme: (t) => set({ theme: t }),

  difficulty: 8,
  setDifficulty: (d) => set({ difficulty: d }),
}));
