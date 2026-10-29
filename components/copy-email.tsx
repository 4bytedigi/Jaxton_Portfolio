'use client';
import {useEffect,useRef,useState} from 'react';
import {Check,Copy} from 'lucide-react';
export function CopyEmail(){
  const [status,setStatus]=useState<'idle'|'copied'|'error'>('idle');
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current)},[]);
  async function copy(){
    try{await navigator.clipboard.writeText('teohjazton@gmail.com');setStatus('copied')}
    catch{setStatus('error')}
    if(timer.current)clearTimeout(timer.current);
    timer.current=setTimeout(()=>setStatus('idle'),3500);
  }
  return <div className="copy-email"><button type="button" onClick={copy}>{status==='copied'?<Check size={15}/>:<Copy size={15}/>} {status==='copied'?'Email copied':'Copy email'}</button><span role="status" aria-live="polite">{status==='error'?'Copy unavailable. Select teohjazton@gmail.com above.':status==='copied'?'Copied to clipboard.':''}</span></div>;
}
