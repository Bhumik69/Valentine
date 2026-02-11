"use client";
import { useMemo, useState } from "react";
import "./App.css";
import GiftWall from "./GiftWall";

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [showGiftPage, setShowGiftPage] = useState(false);

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
  const showNoButton = noCount < phrases.length;

  const yesScale = Math.min(1 + noCount * 0.08, 1.8);
  const noScale = Math.max(1 - noCount * 0.05, 0.45);
  const yesFontSize = Math.min(noCount * 6 + 22, 42);

  const handleNoClick = () => {
    setNoCount((c) => c + 1);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(40);
    }
  };

  const handleYes = () => {
    setYesPressed(true);
    setShowGiftPage(true);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([60, 40, 60]);
    }
  };

  if (showGiftPage) return <GiftWall />;

  return (
    <div className="app-shell">
      <div className="app-bg" />
      <div className="app-glow app-glow--top" />
      <div className="app-glow app-glow--bottom" />

      <Hearts />

      <div className="app-card">
        {yesPressed ? (
          <>
            <Confetti />

            <img
              className="app-hero"
              src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
              alt="Bear kiss"
            />

            <div className="app-success-title">WOOOOOO!!! 💞</div>
            <div className="app-success-subtitle">I love you pookie!! ;))</div>
            <div className="app-success-text">
              Now come here… I’m claiming my valentine 😘🧸💘
            </div>

            <div className="app-actions">
              <button
                className="app-btn app-btn--replay"
                onClick={() => {
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
              className="app-hero"
              src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
              alt="Bear roses"
            />

            <h1 className="app-title">Will you be my Valentine?</h1>
            <p className="app-subtitle">{moodText}</p>

            <div className="app-actions">
              <button
                className="app-btn app-btn--yes yesPulse"
                style={{
                  fontSize: yesFontSize,
                  lineHeight: 1,
                  transform: `scale(${yesScale})`,
                }}
                onClick={handleYes}
              >
                Yes 💖
              </button>

              {showNoButton && (
                <button
                  className="app-btn app-btn--no noWiggle"
                  style={{ transform: `scale(${noScale})` }}
                  onClick={handleNoClick}
                >
                  {noCount === 0 ? "No 😤" : noText}
                </button>
              )}
            </div>

            <p className="app-note">
              (Tapping “No” makes the “Yes” button stronger… like my feelings 💘)
            </p>
          </>
        )}
      </div>
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
          z-index: 1;
          pointer-events: none;
        }

        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 0.4; }
          70% { opacity: 0.35; }
          100% { transform: translateY(-120vh) translateX(40px) scale(1.25); opacity: 0; }
        }

        .heart-0 { left: 8%; animation-duration: 8s; }
        .heart-1 { left: 18%; animation-duration: 10s; font-size: 26px; }
        .heart-2 { left: 30%; animation-duration: 9s; font-size: 18px; }
        .heart-3 { left: 42%; animation-duration: 11s; font-size: 28px; }
        .heart-4 { left: 55%; animation-duration: 8.5s; }
        .heart-5 { left: 66%; animation-duration: 12s; font-size: 24px; }
        .heart-6 { left: 74%; animation-duration: 9.5s; font-size: 20px; }
        .heart-7 { left: 82%; animation-duration: 10.5s; font-size: 30px; }
        .heart-8 { left: 90%; animation-duration: 8.8s; font-size: 18px; }
        .heart-9 { left: 95%; animation-duration: 12.5s; font-size: 22px; }
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
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(320deg); opacity: 0; }
        }

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
