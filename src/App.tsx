"use client";
  import { useMemo, useState } from "react";
import GiftWall from "./GiftWall";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [showGiftPage, setShowGiftPage] = useState(false);

  // BIG yes button but capped so it doesn't break mobile layout
  const yesButtonSize = Math.min(noCount * 18 + 32, 86);

  const phrases = useMemo(
    () => [
      "No",
      "Are you sure?",
      "What if I asked really nicely?",
      "Pretty please 🥺",
      "With a chocolate rice cake on top 🍫",
      "What about a matcha frostie 🍵",
      "PLEASE POOKIE 😭",
      "But :*(",
      "I am going to die 💀",
      "Yep im dead",
      "ok ur talking to nathan's ghost 👻",
      "please babe 😔",
      ":((((",
      "PRETTY PLEASE 🙏",
      "Estoy muerto",
      "No :(",
    ],
    []
  );

  const moodLines = useMemo(
    () => [
      "I asked with all my heart 💗",
      "You’re kinda my favorite person… 👉👈",
      "Please don’t break my tiny bear heart 🧸",
      "I will literally do the dishes for a week 😭",
      "I’m on my knees (respectfully) 🥺",
      "POOKIE PLEASE I’M SHAKING 😭💞",
      "This is emotional damage 🥲",
      "I made this page for you ok 😔💗",
      "Last chance before I turn into a sad burrito 🌯",
    ],
    []
  );

  const noText = phrases[Math.min(noCount, phrases.length - 1)];
  const moodText = moodLines[Math.min(noCount, moodLines.length - 1)];

  const handleNoClick = () => {
    setNoCount((c) => c + 1);

    // Mobile "feelings" (safe + optional)
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(40);
    }

    // Optional: tiny click sound (uncomment if you want)
    // const audio = new Audio("/click.mp3");
    // audio.volume = 0.4;
    // audio.play().catch(() => {});
  };

  const handleYes = () => {
    setYesPressed(true);
    setShowGiftPage(true);

    // Optional: celebration vibration
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([60, 40, 60]);
    }

    // Optional: success sound (uncomment)
    // const audio = new Audio("/yay.mp3");
    // audio.volume = 0.5;
    // audio.play().catch(() => {});
  };

  if (showGiftPage) {
    return <GiftWall />;
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pink-100 via-rose-100 to-white" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-pink-200/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-120px] right-[-120px] h-[420px] w-[420px] rounded-full bg-rose-200/60 blur-3xl" />

      {/* Floating hearts */}
      <Hearts />

      {/* Card */}
      <div className="relative w-full max-w-xl rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl backdrop-blur-md sm:p-10">
        {yesPressed ? (
          <>
            {/* Confetti */}
            <Confetti />

            <img
              className="mx-auto w-[320px] sm:w-[380px] md:w-[460px] drop-shadow-md"
              src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
              alt="Bear kiss"
            />

            <div className="mt-8 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              WOOOOOO!!! 💞
            </div>
            <div className="mt-3 text-center text-2xl font-bold sm:text-3xl">
              I love you pookie!! ;))
            </div>
            <div className="mt-4 text-center text-lg text-gray-700 sm:text-xl">
              Now come here… I’m claiming my valentine 😚🧸💘
            </div>

            <div className="mt-8 flex justify-center">
              <button
                className="rounded-2xl bg-rose-500 px-10 py-4 text-xl font-extrabold text-white shadow-lg transition hover:scale-105 hover:bg-rose-600 active:scale-95"
                onClick={() => {
                  // quick restart
                  setYesPressed(false);
                  setNoCount(0);
                }}
              >
                Replay 💞
              </button>
            </div>
          </>
        ) : (
          <>
            <img
              className="mx-auto w-[340px] sm:w-[420px] md:w-[520px] drop-shadow-md"
              src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
              alt="Bear roses"
            />

            <h1 className="mt-8 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Will you be my Valentine?
            </h1>

            <p className="mt-4 text-center text-xl font-semibold text-gray-700 sm:text-2xl">
              {moodText}
            </p>

            <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
              <button
                className="yesPulse rounded-2xl bg-green-500 px-14 py-7 font-extrabold text-white shadow-lg transition hover:scale-110 hover:bg-green-600 active:scale-95"
                style={{
                  fontSize: yesButtonSize,
                  lineHeight: 1,
                }}
                onClick={handleYes}
              >
                Yes 💖
              </button>

              <button
                onClick={handleNoClick}
                className="noWiggle rounded-2xl bg-red-500 px-14 py-7 text-2xl font-extrabold text-white shadow-lg transition hover:scale-105 hover:bg-red-600 active:scale-95 sm:text-3xl"
              >
                {noCount === 0 ? "No 😤" : noText}
              </button>
            </div>

            <p className="mt-8 text-center text-base text-gray-600 sm:text-lg">
              (Tapping “No” makes the “Yes” button stronger… like my feelings 💘)
            </p>
          </>
        )}
      </div>

      {/* Local CSS animations */}
      <style>{`
        .yesPulse {
          animation: pulse 1.2s infinite;
        }
        .noWiggle:active {
          animation: wiggle 0.25s ease-in-out;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes wiggle {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
          75% {
            transform: rotate(-2deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}

/** Floating hearts layer (pure CSS) */
function Hearts() {
  const hearts = Array.from({ length: 10 });

  return (
    <>
      <div className="pointer-events-none absolute inset-0">
        {hearts.map((_, i) => (
          <span key={i} className={`heart heart-${i}`}>
            ♥
          </span>
        ))}
      </div>

      <style>{`
        .heart {
          position: absolute;
          bottom: -20px;
          font-size: 22px;
          opacity: 0.35;
          animation: floatUp 9s linear infinite;
          filter: blur(0.2px);
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          70% {
            opacity: 0.35;
          }
          100% {
            transform: translateY(-120vh) translateX(40px) scale(1.25);
            opacity: 0;
          }
        }

        /* Different positions/speeds */
        .heart-0 {
          left: 8%;
          animation-duration: 8s;
        }
        .heart-1 {
          left: 18%;
          animation-duration: 10s;
          font-size: 26px;
        }
        .heart-2 {
          left: 30%;
          animation-duration: 9s;
          font-size: 18px;
        }
        .heart-3 {
          left: 42%;
          animation-duration: 11s;
          font-size: 28px;
        }
        .heart-4 {
          left: 55%;
          animation-duration: 8.5s;
        }
        .heart-5 {
          left: 66%;
          animation-duration: 12s;
          font-size: 24px;
        }
        .heart-6 {
          left: 74%;
          animation-duration: 9.5s;
          font-size: 20px;
        }
        .heart-7 {
          left: 82%;
          animation-duration: 10.5s;
          font-size: 30px;
        }
        .heart-8 {
          left: 90%;
          animation-duration: 8.8s;
          font-size: 18px;
        }
        .heart-9 {
          left: 95%;
          animation-duration: 12.5s;
          font-size: 22px;
        }
      `}</style>
    </>
  );
}

/** Lightweight confetti (CSS only) */
function Confetti() {
  const pieces = Array.from({ length: 24 });

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        {pieces.map((_, i) => (
          <span key={i} className={`confetti confetti-${i}`} />
        ))}
      </div>

      <style>{`
        .confetti {
          position: absolute;
          top: -10px;
          width: 10px;
          height: 16px;
          opacity: 0.9;
          border-radius: 3px;
          animation: fall 1.8s ease-in-out infinite;
          background: rgba(244, 63, 94, 0.9);
        }

        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(320deg);
            opacity: 0;
          }
        }

        /* Scatter positions + timing */
        ${Array.from({ length: 24 })
          .map((_, i) => {
            const left = (i / 24) * 100;
            const delay = (i % 6) * 0.08;
            const dur = 1.4 + (i % 5) * 0.15;
            const size = 8 + (i % 4) * 3;
            return `
              .confetti-${i}{
                left:${left}%;
                animation-delay:${delay}s;
                animation-duration:${dur}s;
                width:${size}px;
                height:${size + 6}px;
              }
            `;
          })
          .join("")}
      `}</style>
    </>
  );
}
