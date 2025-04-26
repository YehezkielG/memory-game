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
