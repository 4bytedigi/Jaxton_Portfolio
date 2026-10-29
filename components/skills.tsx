'use client';
import {useState} from 'react';
import {skills} from '@/lib/data';
import {Cpu,Code2,CircuitBoard,Wrench,ArrowUpRight} from 'lucide-react';
const icons=[Code2,Cpu,CircuitBoard,Wrench];
export function Skills(){const [active,setActive]=useState(0);return <div className="skills-layout"><div className="skill-tabs" role="tablist" aria-orientation="vertical" aria-label="Skill categories">{skills.map((s,i)=>{const Icon=icons[i];return <button key={s.name} id={`skill-tab-${i}`} role="tab" aria-selected={active===i} aria-controls="skill-panel" onClick={()=>setActive(i)} onKeyDown={e=>{if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?3:(i+(e.key==='ArrowDown'?1:3))%4;setActive(next);document.getElementById(`skill-tab-${next}`)?.focus()}}} tabIndex={active===i?0:-1}><Icon size={22}/>{s.name}<ArrowUpRight size={18}/></button>})}</div><div className="skill-panel" role="tabpanel" id="skill-panel" aria-labelledby={`skill-tab-${active}`} tabIndex={0}><div className="skill-nodes">{skills[active].items.map(x=><span key={x}>{x}</span>)}</div><p>{skills[active].context}</p></div></div>}
