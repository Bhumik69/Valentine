import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";

import dateImage from "../../assets/date.jpg";
import foodImage from "../../assets/food.jpg";
import snuglesImage from "../../assets/Snugles.png";
import "./Gifts.css";

type Slide = {
  id: string;
  title: string;
  desc: string;
  color: string;
  image?: string;
};

type CarouselRedeemProps = {
  onBack?: () => void;
};

export default function CarouselRedeem({ onBack }: CarouselRedeemProps) {
  const slides: Slide[] = useMemo(
    () => [
      { id: "s1", title: "", desc: "", color: "#ff3b3b", image: snuglesImage },
      { id: "s2", title: "", desc: "", color: "#22c55e", image: foodImage },
      { id: "s3", title: "", desc: "", color: "#3b82f6", image: dateImage },
    ],
    []
  );

  const loop = useMemo(() => {
    const last = slides[slides.length - 1];
    const first = slides[0];
    return [last, ...slides, first];
  }, [slides]);

  const [idx, setIdx] = useState(1);
  const [anim, setAnim] = useState(true);
  const [redeemedById, setRedeemedById] = useState<Record<string, boolean>>({});
  const lockRef = useRef(false);

  const go = (dir: -1 | 1) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setAnim(true);
    setIdx((v) => v + dir);
  };

  const onTransitionEnd = () => {
    const n = slides.length;
    if (idx === 0) {
      setAnim(false);
      setIdx(n);
    } else if (idx === n + 1) {
      setAnim(false);
      setIdx(1);
    }
    lockRef.current = false;
  };

  useEffect(() => {
    if (!anim) {
      const t = requestAnimationFrame(() => setAnim(true));
      return () => cancelAnimationFrame(t);
    }
  }, [anim]);

  const currentSlide = slides[(idx - 1 + slides.length) % slides.length];
  const isRedeemed = !!redeemedById[currentSlide.id];

  const fireConfetti = () => {
    confetti({ particleCount: 160, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
      confetti({ particleCount: 120, spread: 120, origin: { y: 0.4 } });
    }, 250);
  };

  const redeem = () => {
    if (isRedeemed) return;
    setRedeemedById((prev) => ({
      ...prev,
      [currentSlide.id]: true,
    }));
    fireConfetti();
  };

  const back = () => {
    if (onBack) return onBack();
    window.history.back();
  };

  return (
    <div className="cr">
      {/* 🔹 TOP TITLE */}
      <header className="cr__topTitle dancing-script-title">
        Free Voucher
      </header>

      {/* 🔹 CENTER CONTENT */}
      <div className="cr__center">
        <div className="cr__stage" aria-label="Gift carousel">
          <button
            className="cr__arrow cr__arrow--left"
            onClick={() => go(-1)}
            aria-label="Previous"
            type="button"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <div className="cr__viewport">
            <div
              className={`cr__track ${anim ? "is-anim" : "no-anim"}`}
              style={{ transform: `translateX(${-idx * 100}%)` }}
              onTransitionEnd={onTransitionEnd}
            >
              {loop.map((s, i) => (
                <div className="cr__slide" key={`${s.id}-${i}`}>
                  <div className="cr__card" style={{ background: s.color }}>
                    {s.image && (
                      <img
                        className="cr__image"
                        src={s.image}
                        alt={s.title}
                      />
                    )}
                    <div className="cr__cardInner">
                      <h2>{s.title}</h2>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="cr__arrow cr__arrow--right"
            onClick={() => go(1)}
            aria-label="Next"
            type="button"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>

        <div className="cr__actions">
          <button
            className="cr__btn cr__btn--back"
            onClick={back}
            type="button"
          >
            Back
          </button>

          <button
            className="cr__btn cr__btn--redeem"
            onClick={redeem}
            disabled={isRedeemed}
            type="button"
          >
            {isRedeemed ? "Redeemed Successfully" : "Redeem Now"}
          </button>
        </div>
      </div>

      {/* 🔹 BOTTOM NOTE */}
      <footer className="cr__bottomNote">
        Please send screenshot after redeeming it
      </footer>
    </div>
  );
}
