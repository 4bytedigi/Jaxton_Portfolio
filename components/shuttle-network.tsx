import {AnimatedProjectArtwork} from './animated-project-artwork';

// Trace the roads and server links in the supplied 1602 × 982 image.
const routes = [
  'M163 438 L209 468 M252 490 L378 565 M378 616 L567 533 L490 486',
  'M369 342 L334 366 L393 402 M496 457 L531 471 L588 438 L557 385',
  'M574 322 C640 257 677 292 709 305 S784 363 815 371',
  'M966 366 C1003 351 1031 276 1076 286 Q1102 292 1122 305',
  'M635 570 L707 596 L823 649',
  'M1087 755 L1160 787 M1371 709 L1427 670 L1524 616',
];
const stops = [[163, 438], [369, 342], [557, 385], [378, 616], [1524, 616]];

export function ShuttleNetwork({controls = false}: {controls?: boolean}) {
  return (
    <AnimatedProjectArtwork
      className="shuttle-network"
      src="/projects/shuttle-route-network.png"
      width={1602}
      height={982}
      alt="Driverless shuttles on a connected city route, with location markers, a cloud server and a route-planning dashboard."
      controls={controls}
    >
      <svg className="project-artwork-signals" viewBox="0 0 1602 982" fill="none" aria-hidden="true">
        {routes.map((path, index) => (
          <path key={path} d={path} pathLength="1" className="shuttle-signal project-artwork-motion" style={{animationDelay: `${index * 0.6}s`}} />
        ))}
        {stops.map(([x, y], index) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            <ellipse className="shuttle-stop-ring project-artwork-motion" rx="24" ry="10" style={{animationDelay: `${index * 0.7}s`}} />
          </g>
        ))}
        {[866, 890, 913].map((x, index) => (
          <path key={x} d={`M${x} 306 V347`} pathLength="1" className="shuttle-cloud-signal project-artwork-motion" style={{animationDelay: `${index * 0.45}s`}} />
        ))}
      </svg>
    </AnimatedProjectArtwork>
  );
}
