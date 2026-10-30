'use client';

import {useRef, useState} from 'react';
import {useInView} from 'framer-motion';
import {skills} from '@/lib/data';
import {Cpu, Code2, CircuitBoard, Wrench, ArrowUpRight} from 'lucide-react';

const icons = [Code2, Cpu, CircuitBoard, Wrench];

export function Skills() {
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const visible = useInView(panel, {once: true, amount: 0.2});

  return (
    <div className="skills-layout">
      <div className="skill-tabs" role="tablist" aria-orientation="vertical" aria-label="Skill categories">
        {skills.map((skill, index) => {
          const Icon = icons[index];
          return (
            <button
              key={skill.name}
              id={`skill-tab-${index}`}
              role="tab"
              aria-selected={active === index}
              aria-controls="skill-panel"
              onClick={() => setActive(index)}
              onKeyDown={event => {
                if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
                  event.preventDefault();
                  const next = event.key === 'Home' ? 0 : event.key === 'End' ? skills.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : skills.length - 1)) % skills.length;
                  setActive(next);
                  document.getElementById(`skill-tab-${next}`)?.focus();
                }
              }}
              tabIndex={active === index ? 0 : -1}
            >
              <Icon size={22}/>{skill.name}<ArrowUpRight size={18}/>
            </button>
          );
        })}
      </div>
      <div ref={panel} className="skill-panel" role="tabpanel" id="skill-panel" aria-labelledby={`skill-tab-${active}`} tabIndex={0} data-visible={visible}>
        <div className="skill-nodes" key={active}>
          {skills[active].items.map((item, index) => (
            <span key={item} style={{animationDelay: `${index * 0.045}s`}}>{item}</span>
          ))}
        </div>
        <p>{skills[active].context}</p>
      </div>
    </div>
  );
}
