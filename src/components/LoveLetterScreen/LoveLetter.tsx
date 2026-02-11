import React from "react";
import "./LoveLetter.css";

type LoveLetterProps = {
  onBack?: () => void;
};

const LoveLetter: React.FC<LoveLetterProps> = ({ onBack }) => {
  return (
    <div className="scrapbook-container">
      <button type="button" className="loveletter-back" onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default LoveLetter;
