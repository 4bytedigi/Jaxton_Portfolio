import {ArrowRight,Radio,Cpu,Wifi,Server,Monitor,TrafficCone,Timer,PersonStanding,Bus,Users,Route,FileOutput} from 'lucide-react';
const flows={
 iot:[{name:'Reed switch',icon:Radio},{name:'ESP32-C3',icon:Cpu},{name:'Wi-Fi',icon:Wifi},{name:'Raspberry Pi',icon:Server},{name:'Web interface',icon:Monitor}],
 traffic:[{name:'IR detection',icon:TrafficCone},{name:'Four-state FSM',icon:Cpu},{name:'Timed signals',icon:Timer},{name:'Pedestrian controls',icon:PersonStanding}],
 route:[{name:'Passenger requests',icon:Users},{name:'Shuttle capacity',icon:Bus},{name:'Scheduling',icon:Route},{name:'Route plan export',icon:FileOutput}]
};
export function ProjectFlow({kind}:{kind:keyof typeof flows}){return <ol className="project-flow" aria-label="System flow">{flows[kind].map(({name,icon:Icon},i)=><li key={name}><div><Icon size={19}/><span>{name}</span></div>{i<flows[kind].length-1?<ArrowRight className="flow-arrow" size={17}/>:null}</li>)}</ol>}
