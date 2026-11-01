import {AnimatedProjectArtwork} from './animated-project-artwork';

// Follow the connections in the supplied 1602 × 982 illustration.
const connections = [
  'M196 422 L264 410',
  'M426 226 Q465 217 465 248 L468 538 Q470 558 450 563 L427 568',
  'M426 394 L499 381',
  'M494 722 V648 Q494 629 515 625 L571 612',
  'M1118 529 Q1134 530 1133 508 V503 Q1134 479 1153 481 L1208 489',
  'M550 788 L617 784',
  'M794 775 L847 771',
  'M1024 763 L1071 757',
];

export function ClassManagementArtwork({controls = false}: {controls?: boolean}) {
  return (
    <AnimatedProjectArtwork
      className="class-management-artwork"
      src="/projects/class-management-system.png"
      width={1602}
      height={982}
      alt="Conceptual Class Management System illustration connecting a C console menu, student records and a database."
      controls={controls}
    >
      <svg className="project-artwork-signals" viewBox="0 0 1602 982" fill="none" aria-hidden="true">
        {connections.map((path, index) => (
          <path key={path} d={path} pathLength="1" className="cms-signal project-artwork-motion" style={{animationDelay: `${index * 0.45}s`}} />
        ))}
        {[[214, 418], [466, 386]].map(([x, y], index) => (
          <circle key={x} cx={x} cy={y} r="4" className="cms-node project-artwork-motion" style={{animationDelay: `${index * 0.8}s`}} />
        ))}
      </svg>
    </AnimatedProjectArtwork>
  );
}
