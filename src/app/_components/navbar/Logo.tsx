interface PokeballSVGProps {
  width?: number;
  height?: number;
  className?: string;
}

export const PokeballSVG: React.FC<PokeballSVGProps> = ({
  width = 48,
  height = 48,
  className,
}) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 300 300"
      className={className}
    >
      <g transform="translate(0,300) scale(0.1,-0.1)">
        <path
          d="M1314 2859 c-18 -5 -58 -13 -90 -18 -158 -26 -336 -99 -502 -207
-108 -71 -372 -332 -372 -369 0 -3 -11 -21 -24 -38 -22 -30 -83 -146 -111
-212 -6 -16 -20 -47 -29 -68 -9 -21 -16 -45 -16 -53 0 -9 -7 -37 -15 -63 -18
-57 -38 -177 -39 -234 l-1 -42 417 -3 417 -2 15 54 c9 30 16 58 16 63 0 6 11
30 25 54 13 24 29 53 34 64 24 54 142 154 232 196 140 67 304 65 447 -5 78
-38 89 -46 140 -94 57 -54 142 -183 142 -215 0 -5 7 -33 16 -63 l15 -54 417 2
417 3 -1 42 c-2 104 -52 312 -99 418 -50 110 -59 127 -107 203 -16 24 -28 46
-28 50 0 12 -152 183 -216 242 -67 62 -139 120 -149 120 -3 0 -21 11 -38 24
-30 23 -148 84 -212 111 -16 7 -47 20 -68 29 -21 9 -45 16 -55 16 -9 0 -37 6
-62 14 -96 30 -219 46 -351 45 -74 0 -148 -5 -165 -10z"
        />
        <path
          d="M1380 1767 c-108 -42 -190 -162 -190 -277 0 -61 33 -148 75 -198 18
-21 59 -51 91 -67 50 -25 71 -30 134 -30 63 0 84 5 130 28 72 37 101 66 135
135 122 245 -121 509 -375 409z"
        />
        <path
          d="M114 1416 c-3 -8 -1 -46 6 -83 6 -37 15 -93 20 -124 4 -32 13 -66 19
-77 6 -12 11 -30 11 -41 0 -11 7 -37 16 -58 9 -21 23 -51 30 -68 42 -97 96
-200 119 -225 8 -9 15 -21 15 -26 0 -17 154 -187 234 -259 151 -136 332 -234
536 -292 297 -83 630 -64 895 52 96 42 200 98 225 120 9 8 20 15 24 15 39 0
299 264 368 372 80 125 84 134 133 243 48 110 97 315 99 418 l1 42 -417 3
-417 2 -15 -54 c-9 -30 -16 -58 -16 -63 0 -32 -85 -161 -142 -215 -51 -48 -62
-56 -140 -94 -143 -70 -305 -72 -448 -5 -87 40 -207 142 -231 196 -5 11 -21
40 -34 64 -14 24 -25 48 -25 54 0 5 -7 33 -16 63 l-15 54 -415 0 c-353 0 -415
-2 -420 -14z"
        />
      </g>
    </svg>
  );
};

export const Logo = () => {
  const logoSprite =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/137.png";

  return (
    <div className="flex items-center">
      {/* <PokeballSVG width={48} height={48} className="fill-porygon-blue mr-2" /> */}
      <img className="sprite translate-x-2" src={logoSprite}></img>
      <h1 className=" font-sans text-lg font-extrabold italic text-porygon-pink">
        Porygon Dex
      </h1>
    </div>
  );
};
