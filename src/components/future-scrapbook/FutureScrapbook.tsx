import { useEffect, useMemo, useRef, useState } from "react";
import "./futureScrapbook.css";
import surpriseBoxAsset from "../../assets/surprise.png";

type FutureScrapbookProps = {
  onBack?: () => void;
  onContinue?: () => void;
};

type Pos = { x: number; y: number };

type HeartSize = {
  px: number;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function FutureScrapbook({
  onBack,
  onContinue,
}: FutureScrapbookProps) {
  const TARGET_SCORE = 10;
  const MOVE_MS = 1000;

  const areaRef = useRef<HTMLDivElement | null>(null);

  const [score, setScore] = useState(0);
  const [win, setWin] = useState(false);
  const [paid, setPaid] = useState(false);
  const [started, setStarted] = useState(false);

  const [heartPos, setHeartPos] = useState<Pos>({ x: 0, y: 0 });
  const [heartSize, setHeartSize] = useState<HeartSize>({ px: 64 });

  const canPlay = !win && !paid;

  const computeSize = (areaW: number, areaH: number) => {
    const base = Math.min(areaW, areaH) * 0.18;
    return clamp(Math.round(base), 42, 72);
  };

  const setCenter = () => {
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const size = computeSize(rect.width, rect.height);
    setHeartSize({ px: size });
    setHeartPos({ x: (rect.width - size) / 2, y: (rect.height - size) / 2 });
  };

  const setRandom = () => {
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const size = computeSize(rect.width, rect.height);
    const pad = Math.max(10, Math.round(size * 0.22));
    const maxX = Math.max(pad, rect.width - size - pad);
    const maxY = Math.max(pad, rect.height - size - pad);

    const x = Math.floor(pad + Math.random() * (maxX - pad + 1));
    const y = Math.floor(pad + Math.random() * (maxY - pad + 1));

    setHeartSize({ px: size });
    setHeartPos({ x, y });
  };

  useEffect(() => {
    setCenter();

    const onResize = () => {
      const area = areaRef.current;
      if (!area) return;
      const rect = area.getBoundingClientRect();
      const size = computeSize(rect.width, rect.height);

      setHeartSize({ px: size });

      setHeartPos((prev) => {
        if (!started) {
          return { x: (rect.width - size) / 2, y: (rect.height - size) / 2 };
        }
        const pad = Math.max(10, Math.round(size * 0.22));
        const maxX = Math.max(pad, rect.width - size - pad);
        const maxY = Math.max(pad, rect.height - size - pad);
        return {
          x: clamp(prev.x, pad, maxX),
          y: clamp(prev.y, pad, maxY),
        };
      });
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  useEffect(() => {
    if (!canPlay || !started) return;
    const id = window.setInterval(() => {
      if (!canPlay) return;
      setRandom();
    }, MOVE_MS);

    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canPlay, started]);

  const onCatch = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!canPlay) return;

    if (!started) setStarted(true);

    setScore((s) => {
      const next = s + 1;
      if (next >= TARGET_SCORE) setWin(true);
      return next;
    });

    setRandom();
  };

  const progress = useMemo(() => Math.round((score / TARGET_SCORE) * 100), [score]);

  const handleBack = () => {
    if (onBack) return onBack();
    window.history.back();
  };

  const handlePay = () => setPaid(true);

  const handleContinue = () => {
    if (onContinue) return onContinue();
    if (onBack) return onBack();
    window.history.back();
  };

  return (
    <section className="fp" aria-label="Catch the Heart">
      <div className="fp__decor" aria-hidden="true">
        <span className="fp__glow fp__glow--a" />
        <span className="fp__glow fp__glow--b" />
        <div className="fp__floaters">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className={`fp__float fp__float--${i + 1}`} />
          ))}
        </div>
      </div>
      <div className="fp__card">
        <header className="fp__header">
          <h1 className="fp__title">Catch the Heart ??</h1>
          <p className="fp__subtitle">Tap the heart to reach 10 and unlock your surprise</p>
          <div className="fp__scoreRow">
            <div className="fp__score">Score: {score}/{TARGET_SCORE}</div>
            <div className="fp__progress" aria-label="Progress">
              <div className="fp__progressFill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </header>

        <div className="fp__playArea" ref={areaRef} role="region" aria-label="Play area">
          <button
            type="button"
            className="fp__heart"
            onPointerDown={onCatch}
            style={{
              left: heartPos.x,
              top: heartPos.y,
              width: heartSize.px,
              height: heartSize.px,
            }}
            aria-label="Heart"
          >
            ❤️
          </button>
        </div>

        <div className="fp__footer">
          <button className="fp__back" type="button" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>

      {win && !paid && (
        <div className="fp__overlay" role="dialog" aria-modal="true">
          <div className="fp__overlayCard">
            <div className="fp__overlayImage">
              {surpriseBoxAsset ? <img src={surpriseBoxAsset} alt="Surprise box" /> : <span>??</span>}
            </div>
            <h2>You have almost completed the game ??</h2>
            <p>Your Surprise Box is waiting!</p>
            <p className="fp__payline">Pay 2 Kisses ???? to get delivery (COD: Kisses)</p>
            <button className="fp__cta" type="button" onClick={handlePay}>
              Pay 2 Kisses ????
            </button>
          </div>
        </div>
      )}

      {win && paid && (
        <div className="fp__overlay fp__overlay--success" role="dialog" aria-modal="true">
          <div className="fp__confetti" aria-hidden="true">
            <div className="fp__confettiDebug" aria-hidden="true">
              <span className="fp__confettiArrow fp__confettiArrow--left" />
              <span className="fp__confettiArrow fp__confettiArrow--right" />
            </div>
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} className={`fp__confettiPiece fp__confettiPiece--${i + 1}`} />
            ))}
          </div>
          <div className="fp__overlayCard">
            <div className="fp__successIcon" aria-hidden="true">
              <span className="fp__successTick" />
            </div>
            <div className="fp__successCongrats">Congratulations Ritika !</div>
            <h2 className="fp__successTitle">Order placed successfully !</h2>
            <p>Payment method: Cash on Delivery (Kisses). Your gift will reach you soon !!</p>
            <button className="fp__cta" type="button" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
