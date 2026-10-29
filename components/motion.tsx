'use client';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
export function Reveal({children,className=''}:{children:React.ReactNode;className?:string}){const reduce=useReducedMotion();return <motion.div className={className} initial={reduce?false:{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.6}}>{children}</motion.div>}
export function Progress(){const {scrollYProgress}=useScroll();const scaleX=useSpring(scrollYProgress,{stiffness:100,damping:30});return <motion.div className="scroll-progress" style={{scaleX}}/>}
