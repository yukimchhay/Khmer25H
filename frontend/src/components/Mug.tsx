
type Props = { color: string; scale: number };
 
export default function Mug({ color, scale }: Props) {
  const recolor = "transition-colors duration-500 motion-reduce:transition-none";
 
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Preview of the Everyday Mug in the selected glaze"
      className="w-full max-w-md"
    >
      <ellipse cx="200" cy="352" rx="125" ry="13" fill="#000" opacity=".12" />
      <g
        className="transition-transform duration-500 motion-reduce:transition-none"
        style={{ transform: `scale(${scale})`, transformOrigin: "200px 345px" }}
      >
        {/* steam */}
        <g fill="none" stroke="#14201B" strokeWidth="5" strokeLinecap="round" opacity=".3">
          <path d="M165 88 C150 68 180 58 165 36" className="motion-safe:animate-pulse" />
          <path d="M200 84 C185 62 215 52 200 28" className="motion-safe:animate-pulse" />
          <path d="M235 88 C220 68 250 58 235 36" className="motion-safe:animate-pulse" />
        </g>
 
        {/* handle */}
        <path
          d="M290 150 C372 146 372 282 286 284"
          fill="none"
          strokeWidth="26"
          strokeLinecap="round"
          className={recolor}
          style={{ stroke: color }}
        />
 
        {/* body */}
        <path
          d="M105 112 H295 V270 C295 318 260 345 200 345 C140 345 105 318 105 270 Z"
          className={recolor}
          style={{ fill: color }}
        />
 
        {/* glaze drip */}
        <path
          d="M105 120 H295 V160 Q283 192 268 160 Q255 140 240 162 Q228 208 212 162 Q196 128 180 162 Q165 188 150 162 Q135 140 120 164 Q112 174 105 164 Z"
          fill="#000"
          opacity=".14"
        />
 
        {/* highlight */}
        <path
          d="M127 150 V266 C127 294 142 314 162 324"
          fill="none"
          stroke="#fff"
          strokeOpacity=".35"
          strokeWidth="10"
          strokeLinecap="round"
        />
 
        {/* rim + coffee */}
        <ellipse cx="200" cy="112" rx="95" ry="22" className={recolor} style={{ fill: color }} />
        <ellipse cx="200" cy="114" rx="82" ry="16" fill="#24170F" />
      </g>
    </svg>
  );
}
 
