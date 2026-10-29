import { MessageCircle, ArrowUpRight } from 'lucide-react';
export const whatsappUrl = 'https://wa.me/6586887220';
export function WhatsApp(){return <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with Jazton on WhatsApp at +65 8688 7220"><MessageCircle size={20}/><span>WhatsApp</span><ArrowUpRight size={14}/></a>}
