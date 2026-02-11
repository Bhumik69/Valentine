import { useMemo, useState } from "react";
import "./GiftWall.css";
import LoveLetterScreen from "./components/LoveLetterScreen/LoveLetter";
import GiftsCarousel from "./components/Gifts/Gifts";
import FutureScrapbook from "./components/future-scrapbook/FutureScrapbook";

type View = "wall" | "letter" | "gifts" | "scrapbook";

type Gift = {
  id: number;
  title: string;
  target: View;
};

export default function GiftWall() {
  const gifts = useMemo<Gift[]>(
    () => [
      { id: 1, title: "Love Letter", target: "letter" },
      { id: 2, title: "Gifts", target: "gifts" },
      { id: 3, title: "Future Scrapbook", target: "scrapbook" },
    ],
    []
  );

  const [view, setView] = useState<View>("wall");

  // If user is inside a view, render that component full screen
  if (view === "letter") {
    return <LoveLetterScreen onBack={() => setView("wall")} />;
  }

  if (view === "gifts") {
    return <GiftsCarousel onBack={() => setView("wall")} />;
  }

  if (view === "scrapbook") {
    return (
      <FutureScrapbook
        onBack={() => setView("wall")}
        onContinue={() => setView("wall")}
      />
    );
  }

  return (
    <div className="giftwall">
      <div className="giftwall__inner">
        <h1 className="giftwall__title">GIFT FOR YOU</h1>

        <div
          className="giftwall__gifts"
          role="list"
          aria-label="Gift choices"
        >
          {gifts.map((gift) => (
            <button
              key={gift.id}
              type="button"
              className="giftcard"
              onClick={() => setView(gift.target)}
              aria-label={`Open ${gift.title}`}
            >
              <GiftArt />
              <span className="giftcard__tag">Open Me!</span>
            </button>
          ))}
        </div>

        <p className="giftwall__hint">CLICK ANY GIFT TO OPEN</p>
      </div>
    </div>
  );
}

function GiftArt() {
  return (
    <svg
      className="giftart"
      viewBox="0 0 260 180"
      role="img"
      aria-hidden="true"
    >
      <g opacity="0.9">
        <path
          d="M55 42c-6-10-20-7-22 4-2 12 11 18 22 28 11-10 24-16 22-28-2-11-16-14-22-4z"
          fill="currentColor"
        />
        <path
          d="M205 34c-5-9-18-7-20 3-2 11 10 16 20 25 10-9 22-14 20-25-2-10-15-12-20-3z"
          fill="currentColor"
          opacity="0.6"
        />
      </g>

      <rect
        x="35"
        y="55"
        width="190"
        height="100"
        rx="18"
        fill="#fff6f8"
        stroke="#f2c9d4"
        strokeWidth="3"
      />

      <path
        d="M35 70l95 60 95-60"
        fill="none"
        stroke="#f2c9d4"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <path
        d="M35 104h190"
        stroke="#ff6a8a"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M130 55v100"
        stroke="#ff6a8a"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.85"
      />

      <path
        d="M130 103c-18-18-38-12-40 3 12 16 30 19 40 8 10 11 28 8 40-8-2-15-22-21-40-3z"
        fill="#ff4f77"
        opacity="0.9"
      />
      <circle cx="130" cy="104" r="8" fill="#ff2f62" opacity="0.95" />

      <g transform="translate(52 62)">
        <circle cx="0" cy="0" r="10" fill="#ff406e" />
        <circle cx="16" cy="4" r="9" fill="#ff5a80" />
        <circle cx="6" cy="16" r="9" fill="#ff2f62" />
        <path
          d="M-8 10c10 6 20 6 30-2"
          stroke="#69b36d"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
