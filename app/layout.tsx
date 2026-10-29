import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import {WhatsApp} from '@/components/whatsapp';
const aeonik = localFont({
  src: [
    {path:'./fonts/Aeonik-Regular.ttf',weight:'400',style:'normal'},
    {path:'./fonts/Aeonik-Medium.ttf',weight:'500',style:'normal'},
    {path:'./fonts/Aeonik-Bold.ttf',weight:'700',style:'normal'},
  ],
  variable:'--font-aeonik',
  display:'swap',
});
export const metadata:Metadata={title:'Jazton Teoh — Computer Engineering',description:'Engineering ideas into reality. Explore Jazton Teoh’s work in embedded systems, FPGA development and software engineering.',openGraph:{title:'JAZTON — Engineering ideas into reality.',description:'Computer engineering. Hardware meets software.',type:'website'},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" data-scroll-behavior="smooth"><body className={aeonik.variable}>{children}<WhatsApp/></body></html>}
