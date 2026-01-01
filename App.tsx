
import React, { useState, useEffect } from 'react';

// --- CONFIGURAÇÃO ---
const KIWIFY_LINK = "https://pay.kiwify.com.br/raCQcNq";
const EBOOK_MOCKUP = "https://i.imgur.com/wMi53pM.png";

// --- Custom Hook para Sincronização do Tempo ---
const useCountdown = (initialMin: number, initialSec: number) => {
  const [timeLeft, setTimeLeft] = useState({ min: initialMin, sec: initialSec });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.sec > 0) return { ...prev, sec: prev.sec - 1 };
        if (prev.min > 0) return { min: prev.min - 1, sec: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
};

// --- Sub-components ---

const TopUrgencyBar: React.FC<{ time: { min: number; sec: number } }> = ({ time }) => {
  return (
    <div className="bg-amber-500 text-slate-950 py-2.5 px-4 text-center overflow-hidden relative z-[110]">
      <div className="container mx-auto flex items-center justify-center gap-4 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse"></span>
          OFERTA DE LANÇAMENTO EXPIRA EM:
        </span>
        <span className="bg-slate-950 text-white px-3 py-0.5 rounded-full font-mono font-bold tracking-normal">
          {time.min.toString().padStart(2, '0')}:{time.sec.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

const FloatingClock: React.FC<{ time: { min: number; sec: number } }> = ({ time }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-24 right-6 z-[105] transition-all duration-500 transform ${visible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
      <div className="bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 p-4 rounded-3xl shadow-[0_0_30px_rgba(245,158,11,0.2)] flex flex-col items-center">
        <div className="text-[8px] font-black text-amber-500 uppercase tracking-widest mb-1 text-center leading-none">
          Preço Sobe <br /> em breve
        </div>
        <div className="font-mono text-xl font-black text-white tabular-nums tracking-tighter">
          {time.min.toString().padStart(2, '0')}:{time.sec.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

const UrgencyBanner: React.FC<{ time: { min: number; sec: number }; title?: string }> = ({ time, title = "OFERTA POR TEMPO LIMITADO" }) => {
  return (
    <div className="bg-amber-500 text-slate-950 py-6 px-4 text-center border-y-4 border-slate-950 shadow-[0_0_50px_rgba(245,158,11,0.3)]">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        <span className="text-xs md:text-sm font-black uppercase tracking-[0.3em] flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-slate-950 animate-ping"></span>
          {title}
        </span>
        <div className="flex items-center gap-4">
          <span className="bg-slate-950 text-white px-5 py-2 rounded-xl font-mono text-2xl md:text-3xl font-bold tracking-tight shadow-xl">
            {time.min.toString().padStart(2, '0')}:{time.sec.toString().padStart(2, '0')}
          </span>
          <div className="text-left leading-none">
            <p className="text-[10px] font-black uppercase opacity-60">Segundos para</p>
            <p className="text-sm font-black uppercase">O Próximo Lote</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StickyCTA: React.FC = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-xl transition-all duration-700 transform ${show ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-5 rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.6)] flex items-center justify-between gap-6">
        <div className="hidden sm:block">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">MasterCLT v1.0</p>
          <div className="flex items-baseline gap-2">
            <span className="text-amber-500 font-black text-2xl">R$ 19,90</span>
            <span className="text-slate-600 text-xs line-through">R$ 97</span>
          </div>
        </div>
        <a href={KIWIFY_LINK} className="flex-1 sm:flex-none bg-amber-500 hover:bg-amber-600 text-slate-950 px-10 py-4 rounded-2xl font-black text-sm uppercase transition-all shadow-xl shadow-amber-500/20 text-center">
          Garantir Meu Guia
        </a>
      </div>
    </div>
  );
};

const ContentModule: React.FC<{ chapter: string; title: string; desc: string }> = ({ chapter, title, desc }) => (
  <div className="group relative p-10 rounded-[3rem] bg-slate-900/30 border border-white/5 hover:border-amber-500/30 transition-all duration-700">
    <div className="absolute top-8 right-10 text-white/5 text-6xl font-black group-hover:text-amber-500/10 transition-colors font-serif italic">{chapter}</div>
    <span className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Capítulo {chapter}</span>
    <h4 className="text-white font-black text-2xl mb-5 tracking-tighter uppercase leading-none max-w-[80%]">{title}</h4>
    <p className="text-slate-400 text-sm leading-relaxed font-light">{desc}</p>
  </div>
);

const Statistic: React.FC<{ val: string; label: string; sub: string }> = ({ val, label, sub }) => (
  <div className="flex flex-col items-center text-center p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
    <span className="text-5xl font-black text-white mb-3 tracking-tighter">{val}</span>
    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-2">{label}</span>
    <p className="text-[10px] text-slate-500 leading-relaxed max-w-[140px]">{sub}</p>
  </div>
);

export default function App() {
  const time = useCountdown(14, 21);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-amber-500/30 overflow-x-hidden">
      <TopUrgencyBar time={time} />
      <FloatingClock time={time} />
      <StickyCTA />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-40 md:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent -z-10"></div>
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full -z-10"></div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-10">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              O Guia Definitivo
            </div>
            
            <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.8] text-white mb-12">
              TUDO QUE <br />
              VOCÊ <span className="text-amber-500 italic">PRECISA</span> <br />
              SABER.
            </h1>
            
            <p className="text-xl md:text-3xl text-slate-400 max-w-3xl mx-auto leading-tight mb-14 font-light italic">
              "O manual que eu gostaria de ter lido antes de tomar a decisão mais importante da minha vida profissional."
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <a href="#checkout" className="group w-full md:w-auto bg-white text-slate-950 px-14 py-7 rounded-3xl font-black text-xl transition-all hover:bg-amber-500 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
                GARANTIR ACESSO • R$ 19,90
              </a>
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-widest">Manual Técnico</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Acesso Imediato via PDF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Hook - The Mass Layoff Story (Page 8) */}
      <section className="py-24 border-y border-white/5 relative bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
               <div className="absolute inset-0 bg-blue-500/20 blur-[100px] -z-10 rounded-full"></div>
               <img src={EBOOK_MOCKUP} alt="Manual MasterCLT" className="w-full max-w-lg mx-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] rotate-2 group-hover:rotate-0 transition-transform duration-1000" />
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <span className="text-amber-500 font-black text-xs uppercase tracking-[0.5em]">Relato Técnico 01</span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none uppercase">
                O DIA QUE <br />
                O MUNDO <span className="text-amber-500 italic">PAROU.</span>
              </h2>
              <div className="p-8 bg-red-600/10 border-l-4 border-red-600 rounded-r-3xl">
                <p className="text-white font-black text-2xl tracking-tight leading-tight">"650 pessoas foram demitidas sem nada."</p>
                <p className="text-slate-400 text-sm mt-4 font-light uppercase tracking-widest italic leading-relaxed">
                  Sem aviso prévio. Sem explicação digna. Frio e corporativo. Foi ali que percebi que a segurança do CLT é uma ilusão.
                </p>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed font-light">
                Eu percebi que enquanto eu construía o sonho de alguém, ninguém estava construindo o meu. Este guia nasceu da necessidade brutal de nunca mais depender de ninguém para viver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Statistics (Page 9) */}
      <section className="py-32 bg-[#020617]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-white mb-6 tracking-tighter uppercase italic underline decoration-amber-500 decoration-8 underline-offset-8">Estatísticas da Realidade</h2>
            <p className="text-slate-500 uppercase text-xs font-black tracking-[0.4em]">Os números que ninguém quer te mostrar</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Statistic val="73%" label="Desistem" sub="No primeiro ano por falta de planejamento." />
            <Statistic val="85%" label="Sem Reserva" sub="Largam o emprego sem proteção financeira." />
            <Statistic val="3x" label="Trabalho" sub="Você vai trabalhar mais, mas para você." />
            <Statistic val="40%" label="Retorno" sub="Percentual que volta ao CLT por falha técnica." />
          </div>
        </div>
      </section>

      {/* --- MIDDLE URGENCY ALERT --- */}
      <UrgencyBanner time={time} title="VOCÊ ESTÁ A UM PASSO DA ALFORRIA" />

      {/* Chapters Breakdown (Page 3-7) */}
      <section className="py-32 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-24 max-w-6xl mx-auto">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none mb-6">O MAPA DA <br /><span className="text-amber-500">ALFORRIA.</span></h2>
              <p className="text-slate-500 font-medium text-lg italic leading-relaxed">"Sair do CLT não é fuga, é direção. Este eBook não te dá garantias, te dá consciência e clareza."</p>
            </div>
            <div className="hidden lg:block text-right">
              <span className="text-slate-700 text-8xl font-black tracking-tighter opacity-20">01-05</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <ContentModule 
              chapter="01" 
              title="A Mentira da Liberdade" 
              desc="Liberdade sem renda é prisão com vista. Entenda por que você vai trocar o patrão pelo cliente, e por que o cliente é mais exigente."
            />
            <ContentModule 
              chapter="02" 
              title="Planejamento é o Novo Coragem" 
              desc="Abra o paraquedas antes de pular. As 3 perguntas vitais que você precisa responder antes de pedir demissão."
            />
            <ContentModule 
              chapter="03" 
              title="Oportunidade ou Ilusão?" 
              desc="A verdade nua e crua sobre a renda online. Sem filtros, sem gurus, apenas consistência brutal e entendimento de pessoas."
            />
            <ContentModule 
              chapter="04" 
              title="O Que Ninguém Te Conta" 
              desc="Lidando com a falta de apoio da família, algoritmos impiedosos e os dias ruins onde você vai querer desistir."
            />
            <ContentModule 
              chapter="05" 
              title="Comece Certo: Primeiro Passos" 
              desc="Escolha UM caminho. Crie sua oferta em uma frase. Divulgue todos os dias. A construção da autoridade tijolo por tijolo."
            />
            <div className="flex flex-col justify-center p-10 bg-amber-500 rounded-[3rem] text-slate-950">
               <h4 className="text-3xl font-black uppercase tracking-tighter leading-none mb-6">EXCLUSIVO: <br />O Método da Recorrência</h4>
               <p className="text-sm font-bold leading-tight opacity-80 mb-8">Como bônus, aprenda a transformar seu trabalho em um faturamento mensal previsível.</p>
               <a href="#checkout" className="bg-slate-950 text-white text-center py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">Pegar eBook + Bônus</a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (Page 10) */}
      <section id="checkout" className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-white rounded-[4rem] p-8 md:p-20 text-slate-950 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 blur-[100px] rounded-full"></div>
             
             <div className="lg:w-1/2 relative">
                <div className="absolute -top-10 -left-10 bg-amber-500 text-slate-950 px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest z-10 -rotate-6">Acesso Vitalício</div>
                <img src={EBOOK_MOCKUP} alt="MasterCLT Mockup" className="w-full drop-shadow-[0_50px_100px_rgba(0,0,0,0.3)] -rotate-3 hover:rotate-0 transition-all duration-700" />
             </div>
             
             <div className="lg:w-1/2 text-center lg:text-left">
                <h3 className="text-5xl font-black tracking-tighter uppercase leading-none mb-8 italic">Assuma a direção.</h3>
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-4 text-slate-500 font-bold uppercase text-xs tracking-[0.2em]">
                    <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">✓</span>
                    Guia MasterCLT Completo (PDF)
                  </div>
                  <div className="flex items-center gap-4 text-slate-500 font-bold uppercase text-xs tracking-[0.2em]">
                    <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">✓</span>
                    Bônus: Método de Recorrência
                  </div>
                  <div className="flex items-center gap-4 text-slate-500 font-bold uppercase text-xs tracking-[0.2em]">
                    <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">✓</span>
                    Planilha de Reserva Financeira
                  </div>
                </div>

                <div className="flex items-baseline justify-center lg:justify-start gap-4 mb-10">
                  <span className="text-slate-400 line-through text-2xl font-bold">R$ 97</span>
                  <span className="text-7xl font-black tracking-tighter text-amber-500">R$ 19,90</span>
                </div>

                <a href={KIWIFY_LINK} className="block w-full bg-slate-950 text-white text-center py-7 rounded-[2rem] font-black text-2xl transition-all hover:bg-amber-500 hover:text-slate-950 shadow-2xl active:scale-95 animate-pulse-gold uppercase tracking-tighter">
                   QUERO MINHA LIBERDADE
                </a>
                
                <p className="mt-8 text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] flex items-center justify-center lg:justify-start gap-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                  Checkout 100% Seguro & Acesso Imediato
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Final Reflexion (Page 10) */}
      <section className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-6 text-center">
           <p className="text-3xl md:text-5xl font-serif italic text-white max-w-5xl mx-auto leading-[1.1] mb-12 tracking-tight">
             "Risco calculado não é loucura. É inteligência aplicada à coragem. Daqui a 5 anos, você vai se arrepender mais do que não tentou do que do que deu errado."
           </p>
           <div className="w-32 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* --- END URGENCY ALERT --- */}
      <UrgencyBanner time={time} title="ÚLTIMA OPORTUNIDADE DO VALOR ATUAL" />

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 bg-[#020617]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20 opacity-30">
            <div className="text-3xl font-black italic tracking-tighter">MASTER<span className="text-amber-500">CLT</span></div>
            <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em]">
              <span>Acesso Vitalício</span>
              <span>Manual Técnico</span>
              <span>Garantia de 7 Dias</span>
            </div>
          </div>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-[9px] text-slate-800 uppercase font-black tracking-[0.5em] leading-relaxed">
              ESTE PRODUTO É DESTINADO A PROFISSIONAIS QUE BUSCAM TRANSIÇÃO DE CARREIRA COM PLANEJAMENTO. OS RESULTADOS CITADOS DEPENDEM DA EXECUÇÃO DAS TÉCNICAS APRESENTADAS NO EBOOK. NÃO PROMETEMOS ENRIQUECIMENTO FÁCIL.
            </p>
            <p className="text-[10px] text-slate-900 font-bold uppercase tracking-widest">© 2024 MASTERCLT - TODOS OS DIREITOS RESERVADOS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
