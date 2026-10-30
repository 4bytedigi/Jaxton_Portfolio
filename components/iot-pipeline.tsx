import {AnimatedProjectArtwork} from './animated-project-artwork';

// Trace the connections in the supplied 1774 × 887 artwork.
const connections = [
  'M423 438 Q449 455 492 475',
  'M576 513 C603 521 619 560 654 548',
  'M830 503 C869 506 842 478 876 462 Q890 452 906 453',
  'M1023 461 C1045 463 1057 499 1092 482',
  'M1272 411 C1301 393 1322 365 1354 365 S1411 392 1448 394',
];

export function IotPipeline({controls = false}: {controls?: boolean}) {
  return (
    <AnimatedProjectArtwork
      className="iot-pipeline"
      src="/projects/iot-first-aid-pipeline.png"
      width={1774}
      height={887}
      alt="First-aid kit connected through a reed switch and ESP32 over Wi-Fi to a Raspberry Pi and web dashboard."
      controls={controls}
    >
      <svg className="project-artwork-signals" viewBox="0 0 1774 887" fill="none" aria-hidden="true">
        {connections.map((path, index) => (
          <path key={path} className="iot-signal project-artwork-motion" d={path} pathLength="1" style={{animationDelay: `${index * 0.55}s`}} />
        ))}
        <g className="iot-wifi-origin">
          <ellipse className="iot-wifi-ring project-artwork-motion" cx="0" cy="0" rx="67" ry="31" />
          <ellipse className="iot-wifi-ring iot-wifi-ring-late project-artwork-motion" cx="0" cy="0" rx="67" ry="31" />
        </g>
        <circle className="iot-led project-artwork-motion" cx="418" cy="302" r="6" />
      </svg>
    </AnimatedProjectArtwork>
  );
}
