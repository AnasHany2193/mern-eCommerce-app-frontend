import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const starContainerStyle = {
  display: "flex",
};

StarRatings.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  maxRating: PropTypes.number,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
  defaultRating: PropTypes.number,
  disabled: PropTypes.bool,
};

function StarRatings({
  size = 48,
  onSetRating = () => {},
  maxRating = 5,
  className = "",
  color = "#0F172A",
  defaultRating = 0,
  disabled = false,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (newRating) => {
    if (disabled) return;
    setRating(newRating);
    onSetRating(newRating);
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            size={size}
            color={color}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => !disabled && setTempRating(i + 1)}
            onHoverOut={() => !disabled && setTempRating(0)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size, disabled }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: disabled ? "not-allowed" : "pointer",
    color: full ? color : "#E2E8F0",
    transition: "color 0.2s ease-in-out",
  };

  return (
    <span
      style={starStyle}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={full ? "Rated" : "Unrated"}
      onClick={!disabled ? onRate : undefined}
      onMouseEnter={!disabled ? onHoverIn : undefined}
      onMouseLeave={!disabled ? onHoverOut : undefined}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
          width={size}
          height={size}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
          strokeWidth={2}
          width={size}
          height={size}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

export default StarRatings;
