
import React, { useState, useEffect } from 'react';

// --- Sub-components ---

const CountdownTimer: React.FC<{ className?: string }> = ({ className }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className={`flex items-center justify-center space-x-2 font-mono ${className}`}>
      <div className="flex flex-col items-center">
        <div className="bg-slate-800 border border-amber-500/30 text-amber-500 px-2 py-1 rounded text-lg font-bold">
          {format(timeLeft.hours)}
        </div>
        <span className="text-[10px] uppercase text-slate-500 mt-1">Hrs</span>
      </div>
      <div className="text-amber-500 font-bold mb-4 text-xl">:</div>
      <div className="flex flex-col items-center">
        <div className="bg-slate-800 border border-amber-500/30 text-amber-500 px-2 py-1 rounded text-lg font-bold">
          {format(timeLeft.minutes)}
        </div>
        <span className="text-[10px] uppercase text-slate-500 mt-1">Min</span>
      </div>
      <div className="text-amber-500 font-bold mb-4 text-xl">:</div>
      <div className="flex flex-col items-center">
        <div className="bg-slate-800 border border-amber-500/30 text-amber-500 px-2 py-1 rounded text-lg font-bold">
          {format(timeLeft.seconds)}
        </div>
        <span className="text-[10px] uppercase text-slate-500 mt-1">Seg</span>
      </div>
    </div>
  );
};

const Header: React.FC = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
    <div className="container mx-auto px-4 h-20 flex items-center justify-between">
      <div className="font-bold text-2xl tracking-tighter">MASTER<span className="text-amber-500">CLT</span></div>
      <a href="#comprar" className="hidden sm:block bg-amber-500/10 border border-amber-500/30 text-amber-500 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-slate-950 transition-all">
        Garantir Acesso
      </a>
    </div>
  </header>
);

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-amber-500/30 transition-all duration-300 text-left group">
    <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{icon}</div>
    <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-lg font-semibold group-hover:text-amber-500 transition-colors">{question}</span>
        <span className={`transform transition-transform duration-300 text-amber-500 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-slate-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const SocialProofNotification: React.FC = () => {
  const [show, setShow] = useState(false);
  const [notif, setNotif] = useState({ name: 'Marcelo', city: 'São Paulo' });

  useEffect(() => {
    const names = ['Fernanda', 'Carlos', 'Beatriz', 'João', 'Mariana', 'Ricardo'];
    const cities = ['Rio de Janeiro', 'Curitiba', 'Belo Horizonte', 'Porto Alegre', 'Salvador'];
    
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setNotif({
          name: names[Math.floor(Math.random() * names.length)],
          city: cities[Math.floor(Math.random() * cities.length)]
        });
        setShow(true);
      }, 500);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed bottom-24 left-4 z-50 transition-all duration-500 transform ${show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-2xl flex items-center space-x-3 max-w-xs">
        <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-500">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>
        </div>
        <div>
          <p className="text-xs font-bold text-white">{notif.name} de {notif.city}</p>
          <p className="text-[10px] text-slate-400">Acabou de adquirir o guia 🚀</p>
        </div>
      </div>
    </div>
  );
};

const Testimonial: React.FC = () => (
  <section className="py-24 bg-slate-900/20">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 p-10 rounded-[40px] relative overflow-hidden text-center">
        <div className="w-20 h-20 rounded-full border-2 border-amber-500 p-1 mb-6 mx-auto">
          <img src="https://picsum.photos/seed/marcus/80/80" className="w-full h-full rounded-full object-cover" alt="Depoimento" />
        </div>
        <p className="text-xl md:text-2xl font-medium italic text-slate-200 mb-8 leading-relaxed">
          "Eu estava preso em um cargo que sugava minha alma. O guia me deu não só a coragem, mas o plano prático. Hoje faturo 3x mais trabalhando de casa."
        </p>
        <p className="font-bold text-lg text-white">Marcus Vinícius</p>
        <p className="text-amber-500 text-sm font-bold uppercase tracking-widest">Ex-Analista Financeiro</p>
      </div>
    </div>
  </section>
);

const PurchaseBox: React.FC = () => (
  <div id="comprar" className="bg-slate-900 border-2 border-amber-500/30 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
    <div className="flex flex-col items-center text-center mb-8">
      <div className="w-28 mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
        <img src="https://i.imgur.com/wMi53pM.png" alt="Capa Ebook" className="w-full rounded shadow-2xl border border-slate-700" />
      </div>
      <div className="mb-4">
        <p className="text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-2 animate-pulse">A oferta expira em:</p>
        <CountdownTimer className="scale-90" />
      </div>
      <h3 className="text-2xl md:text-3xl font-black mt-2 mb-4 tracking-tight">Comece sua virada hoje</h3>
      <div className="flex items-center justify-center space-x-2 mb-4">
        <span className="text-slate-500 line-through text-lg">R$ 47,00</span>
        <span className="text-amber-500 text-4xl font-black tracking-tighter">R$ 9,90</span>
      </div>
    </div>
    <div className="space-y-4">
      <a href="https://pay.kiwify.com.br/SEU_LINK_AQUI" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-lg py-5 rounded-xl shadow-lg transition-all flex flex-col items-center justify-center group transform hover:scale-[1.02]">
        QUERO MEU ACESSO
      </a>
      <div className="flex items-center justify-center space-x-4 opacity-50">
        <img src="https://logodownload.org/wp-content/uploads/2014/07/visa-logo-1.png" className="h-4" alt="Visa" />
        <img src="https://logodownload.org/wp-content/uploads/2020/02/pix-logo-1.png" className="h-4" alt="Pix" />
      </div>
    </div>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setShowSticky(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <SocialProofNotification />
      
      {/* Mobile Sticky Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-[60] p-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 md:hidden transition-all duration-500 transform ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex items-center justify-between gap-4">
          <p className="text-amber-500 font-black text-xl leading-none">R$ 9,90</p>
          <a href="#comprar" className="flex-1 bg-amber-500 text-slate-950 font-black py-3 rounded-xl text-center text-sm active:scale-95 transition-all">
            GARANTIR MINHA VAGA
          </a>
        </div>
      </div>
      
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative">
        <div className="container mx-auto px-4 relative text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className={`lg:w-7/12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex flex-col items-center lg:items-start mb-6">
                <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4">OFERTA POR TEMPO LIMITADO</div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">O preço sobe em:</span>
                  <CountdownTimer className="scale-75 origin-left" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tighter">
                O guia prático para <span className="gradient-text">dar adeus ao CLT</span> e retomar sua liberdade.
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                O passo a passo seguro para fazer sua transição de carreira e conquistar sua liberdade financeira.
              </p>
              <a href="#comprar" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-10 py-5 rounded-2xl inline-block transition-all shadow-xl text-lg uppercase transform hover:scale-105">
                Quero sair da corrida dos ratos
              </a>
            </div>
            <div className={`lg:w-5/12 transition-all duration-1000 delay-300 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className="relative group">
                <div className="absolute inset-0 bg-amber-500/30 blur-[80px] rounded-full group-hover:bg-amber-500/40 transition-all"></div>
                <div className="relative transform rotate-3 hover:rotate-0 transition-all duration-700">
                  <img src="https://i.imgur.com/wMi53pM.png" alt="Capa Ebook" className="w-full max-w-[420px] mx-auto rounded-lg shadow-2xl border border-slate-700/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-16 tracking-tight">O que você vai descobrir:</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard icon="⚖️" title="Armadilha da Estabilidade" description="A verdade sobre o risco real do CLT nos dias de hoje." />
            <FeatureCard icon="🛡️" title="Reserva de Blindagem" description="Quanto você precisa exatamente para sair com segurança." />
            <FeatureCard icon="🚀" title="Escala Pós-CLT" description="Como faturar nos primeiros 90 dias de jornada solo." />
          </div>
        </div>
      </section>

      <Testimonial />

      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center">Dúvidas Frequentes</h2>
            <FAQItem question="Como recebo o acesso?" answer="Imediatamente por e-mail após a confirmação do pagamento." />
            <FAQItem question="Tem garantia?" answer="Sim! 7 dias de garantia incondicional." />
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950 border-t border-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font