import { useWiningGameStrore, useGameSettingsStore } from "../store/Stores";

export default function WinGame() {
  const { setWinning, time, moves } = useWiningGameStrore();
  const { difficulty, theme } = useGameSettingsStore();

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}px`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              background: [
                "#FF9F1C",
                "#FFBF69",
                "#CBF3F0",
                "#2EC4B6",
                "#FF4D6D",
              ][Math.floor(Math.random() * 5)],
              borderRadius: "50%",
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
         {
          /* @keyframes spin{
          0%{
              transform: rotate(0deg);
          }
          100%{
              transform: rotate(360deg);
          }
        }
        .animate-spin{
          animation: spin linear repeat;
        } */
        }
      `}</style>
      <section className="absolute top-0 w-full left-0 -z-10 flex items-center justify-center h-svh">
        <div className="m-auto rounded-lg bg-white/70 w-[100%] sm:w-[450px] mx-2 p-5">
          <div className="grid grid-cols-1 gap-2 place-items-center">
            <img src="icon/crown.png" alt="crown" className="mx-auto" />
            <h1 className="text-3xl text-[#282828] font-bold">
              Congratulations!
            </h1>
            <p className="text-gray-700">You&rsquo;ve completed the game!</p>
            <div className="grid grid-cols-2 my-3">
              <div className="mx-5 font-bold text-center">Theme</div>
              <div className="mx-5 font-bold text-center">Difficulty</div>
              <div className="mx-5 text-center text-gray-700">
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </div>
              <div className="mx-5 text-center text-gray-700">
                {difficulty == 12 ? "Easy" : ""}
                {difficulty == 18 ? "Medium" : ""}
                {difficulty == 24 ? "Hard" : ""}
                {difficulty == 30 ? "Extreme" : ""}
              </div>
              <div className="mx-5 font-bold text-center">Time</div>
              <div className="mx-5 font-bold text-center">Moves</div>
              <div className="mx-5 text-center text-gray-700">{time}</div>
              <div className="mx-5 text-center text-gray-700">{moves}</div>
            </div>
            <button
              className="w-full p-2 bg-[#8F87F1] cursor-pointer text-[#282828] rounded-lg text-lg flex items-center justify-center"
              onClick={() => {
                setWinning(false);
              }}
            >
              <img src="icon/repeat2.png" alt="" className="w-6 mr-2" />
              Play Again
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
