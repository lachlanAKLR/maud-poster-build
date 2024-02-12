interface CountdownCircleProps {
  duration: number;
  startCountdown: boolean;
}

const CountdownCircle: React.FC<CountdownCircleProps> = ({
  duration,
  startCountdown,
}) => {
  const radius = 8;
  const circumference = 2 * Math.PI * radius;

  const animationStyle = startCountdown
    ? {
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
        animation: `countdown ${duration / 1000}s linear infinite forwards`,
      }
    : {};

  return (
    <svg
      width="24"
      height="24"
      className="absolute bottom-2 right-2"
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        stroke="rgba(255, 255, 255, 0.5)"
        strokeWidth="3"
        fill="transparent"
        r={radius}
        cx="12"
        cy="12"
      />
      <circle
        stroke="white"
        strokeWidth="3"
        fill="transparent"
        r={radius}
        cx="12"
        cy="12"
        style={animationStyle}
      />
      <style jsx>{`
        @keyframes countdown {
          from {
            stroke-dashoffset: ${circumference};
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  );
};

export default CountdownCircle;
