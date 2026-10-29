'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { resume } from '@/lib/data';

const sections = ['Projects', 'Experience', 'About', 'Skills', 'Contact'];
export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 25);
      let current = '';
      for (const id of ['projects','about','experience','skills','contact']) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 180) current = id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 40) current = 'contact';
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, {passive:true});
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <header className={`header ${scrolled?'is-scrolled':''}`} onKeyDown={event => {
    if (event.key === 'Escape') { setOpen(false); menuRef.current?.focus(); }
  }}>
    <Link href="/" aria-label="Jazton home" className="brand">
      <Image src="/brand/mark.png" alt="JT" unoptimized width={75} height={27} priority/>
      <Image className="wordmark" src="/brand/wordmark.png" alt="Jazton" unoptimized width={112} height={12} priority/>
    </Link>
    <nav id="main-navigation" aria-label="Main navigation" className={open?'nav open':'nav'}>
      {sections.map(name => <a key={name} href={`/#${name.toLowerCase()}`} aria-current={active===name.toLowerCase()?'location':undefined} onClick={()=>setOpen(false)}>{name}</a>)}
    </nav>
    <a className="resume-link" href={resume} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={15}/></a>
    <button ref={menuRef} className="menu-button" aria-label={open?'Close navigation':'Open navigation'} aria-controls="main-navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
  </header>;
}
