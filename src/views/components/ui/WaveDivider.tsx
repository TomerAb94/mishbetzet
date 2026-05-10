interface WaveDividerProps {
  fromColor: string;
  toColor: string;
}

export default function WaveDivider({ fromColor, toColor }: WaveDividerProps) {
  return (
    <div className="w-full overflow-hidden leading-none" style={{ backgroundColor: fromColor }}>
      <svg
        viewBox="0 0 1440 56"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-14 block"
      >
        <path
          d="M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28 L1440,56 L0,56 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}
