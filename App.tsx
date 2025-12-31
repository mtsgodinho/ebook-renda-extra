
import React, { useState, useEffect } from 'react';

// --- CONFIGURAÇÃO ---
const KIWIFY_LINK = "https://pay.kiwify.com.br/raCQcNq";
const EBOOK_MOCKUP = "https://i.imgur.com/wMi53pM.png";

// --- Sub-components ---

const CountdownTimer: React.FC<{ className?: string; compact?: boolean }> = ({ className, compact }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 19, seconds: 54 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  if (compact) {
    return (
      <div className={`flex items-center gap-1 font-mono font-black ${className}`}>
        <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-xs">{format(timeLeft.minutes)}</span>
        <span className="text-red-600 animate-pulse">:</span>
        <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-xs">{format(timeLeft.seconds)}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-2 font-mono ${className}`}>
      <div className="flex flex-col items-center">
        <div className="bg-red-600 text-white px-3 py-2 rounded-lg text-xl md:text-2xl font-black shadow-lg shadow-red-900/20">
          {format(timeLeft.hours)}
        </div>
        <span className="text-[8px] font-bold text-slate-500 mt-1 uppercase">Horas</span>
      </div>
      <span className="text-red-600 font-black text-2xl animate-pulse mb-4">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-red-600 text-white px-3 py-2 rounded-lg text-xl md:text-2xl font-black shadow-lg shadow-red-900/20">
          {format(timeLeft.minutes)}
        </div>
        <span className="text-[8px] font-bold text-slate-500 mt-1 uppercase">Minutos</span>
      </div>
      <span className="text-red-600 font-black text-2xl animate-pulse mb-4">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-red-600 text-white px-3 py-2 rounded-lg text-xl md:text-2xl font-black shadow-lg shadow-red-900/20">
          {format(timeLeft.seconds)}
        </div>
        <span className="text-[8px] font-bold text-slate-500 mt-1 uppercase">Segundos</span>
      </div>
    </div>
  );
};

const StickyCTA: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) setShow(true);
      else setShow(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[100] p-4 transition-all duration-500 transform ${show ? 'translate-y-0' : 'translate-y-full opacity-0'}`}>
      <div className="container mx-auto max-w-4xl">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl md:rounded-full p-3 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_0_40px_rgba(0,0,0,0.6)] border-b-4 border-b-amber-500/30">
          <div className="flex items-center gap-6">
            <div className="hidden sm:block">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Oferta expira em:</p>
              <CountdownTimer compact />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-slate-500 line-through text-xs font-bold">R$ 97</span>
              <span className="text-amber-500 text-2xl font-black">R$ 9,90</span>
            </div>
          </div>
          
          <a href={KIWIFY_LINK} className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-3 rounded-xl md:rounded-full font-black text-sm transition-all shadow-xl hover:scale-105 active:scale-95 animate-pulse-gold uppercase flex items-center justify-center gap-2">
            Quero Minha Liberdade
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const Header: React.FC = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <div className="font-black text-xl tracking-tighter italic">MASTER<span className="text-amber-500">CLT</span></div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Últimas Vagas:</span>
          <CountdownTimer compact />
        </div>
        <a href="#checkout" className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-2 rounded-lg text-xs font-black transition-all uppercase">
          Garantir Vaga
        </a>
      </div>
    </div>
  </header>
);

const BenefitCard: React.FC<{ icon: string; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 group">
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
    <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const ModuleRow: React.FC<{ number: string; title: string; tags: string[] }> = ({ number, title, tags }) => (
  <div className="py-6 border-b border-slate-900 flex flex-col md:flex-row md:items-center gap-4 group">
    <span className="text-amber-500 font-black text-2xl opacity-50 group-hover:opacity-100 transition-opacity">{number}</span>
    <h4 className="text-lg font-bold text-slate-200 flex-1">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <span key={tag} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded font-bold uppercase tracking-widest">{tag}</span>
      ))}
    </div>
  </div>
);

const PurchaseBox: React.FC = () => (
  <div id="checkout" className="max-w-2xl mx-auto bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl relative">
    <div className="absolute top-0 right-0 p-6">
      <div className="bg-green-500/10 text-green-500 text-[10px] font-black px-3 py-1 rounded-full border border-green-500/20 animate-pulse">DISPONÍVEL AGORA</div>
    </div>
    <div className="p-8 md:p-12">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="w-32 md:w-44 flex-shrink-0">
          <img src={EBOOK_MOCKUP} alt="Ebook" className="w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transform -rotate-3" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-black text-white mb-2 tracking-tight uppercase">O Mapa da sua Alforria</h3>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">Você receberá o Guia Completo + Planilha de Reserva + Checklist de Demissão imediatamente.</p>
          
          <div className="flex items-baseline justify-center md:justify-start gap-3 mb-8">
            <span className="text-slate-500 line-through text-lg">R$ 97,00</span>
            <span className="text-amber-500 text-5xl font-black tracking-tighter">R$ 9,90</span>
          </div>

          <a href={KIWIFY_LINK} className="block w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-center py-5 rounded-2xl font-black text-xl shadow-xl transition-all active:scale-95 animate-pulse-gold">
            SIM! QUERO MEU ACESSO AGORA
          </a>
          
          <p className="mt-4 text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] text-center">
            🔒 Pagamento 100% Seguro via Kiwify
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30 pb-20 md:pb-0">
      <Header />
      <StickyCTA />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-7/12 text-center lg:text-left">
              <div className="inline-flex flex-col md:flex-row items-center gap-6 mb-10 bg-slate-900/50 p-6 md:p-4 rounded-3xl border border-slate-800">
                <div className="text-center md:text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 block mb-2">Atenção: Oferta Especial</span>
                  <CountdownTimer />
                </div>
                <div className="hidden md:block w-px h-12 bg-slate-800"></div>
                <div className="text-center md:text-left">
                   <p className="text-xs font-bold text-slate-400">Restam apenas <span className="text-white">14 licenças</span> com o valor promocional de R$ 9,90</p>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                PEÇA AS CONTAS COM <span className="text-amber-500 italic">MÉTODO.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
                Pare de ser refém da falsa segurança corporativa. O MasterCLT é o plano de fuga definitivo para quem busca liberdade sem arriscar a estabilidade financeira.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href="#checkout" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-2xl active:scale-95">
                  PEGAR O MAPA AGORA
                </a>
                <div className="flex items-center gap-2">
                   <div className="flex -space-x-2">
                     {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-8 h-8 rounded-full border-2 border-slate-950" alt="aluno" />)}
                   </div>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">+1.2k alunos livres</p>
                </div>
              </div>
            </div>
            <div className="lg:w-5/12 relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-[120px] rounded-full -z-10 animate-pulse"></div>
              <img src={EBOOK_MOCKUP} alt="MasterCLT Ebook" className="w-full max-w-[450px] mx-auto drop-shadow-[0_35px_60px_rgba(0,0,0,0.6)] transform rotate-2 hover:rotate-0 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections (Simplified for conversion focus) */}
      <section className="py-24 bg-slate-950 border-t border-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase">Por que este guia é Vital?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Não é sobre "pedir as contas", é sobre arquitetar o seu futuro enquanto você ainda tem o salário do mês garantido.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <BenefitCard icon="📉" title="A Armadilha do CLT" desc="Entenda por que economizar dinheiro é a pior forma de tentar sair do emprego e o que você deve fazer no lugar." />
            <BenefitCard icon="💰" title="Renda Extra Validada" desc="Aprenda 3 formas de gerar seus primeiros R$ 2.000,00 fora da empresa atual em menos de 45 dias." />
            <BenefitCard icon="🛡️" title="Blindagem Jurídica" desc="Como negociar sua saída garantindo seu FGTS e seguro desemprego sem brigas ou processos." />
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-950 p-8 md:p-16 rounded-[3rem] border border-slate-800 shadow-2xl">
            <h2 className="text-2xl md:text-4xl font-black mb-12 tracking-tight text-center md:text-left uppercase italic">O que você vai dominar:</h2>
            <div className="space-y-2">
              <ModuleRow number="01" title="Mindset de Dono vs Mindset de Empregado" tags={["REPROGRAMAÇÃO"]} />
              <ModuleRow number="02" title="Planilha Mestre de Reserva Financeira" tags={["CÁLCULO EXATO"]} />
              <ModuleRow number="03" title="O Plano de 90 Dias para a Demissão" tags={["EXECUÇÃO"]} />
              <ModuleRow number="04" title="Modelos de Mensagem para seu Chefe" tags={["COPYWRITING"]} />
              <ModuleRow number="05" title="Como não falir no 1º mês de liberdade" tags={["GESTÃO"]} />
            </div>
          </div>
        </div>
      </section>

      {/* Final Offer */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="bg-red-600/10 border border-red-600/20 text-red-600 inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 animate-pulse">
              Acesso por tempo limitado
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-none">
              É O PREÇO DE UM <span className="text-amber-500 italic">CAFEZINHO.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              O risco é todo nosso. Se em 7 dias você não sentir que esse plano vale 10x o valor pago, devolvemos seu dinheiro na hora.
            </p>
          </div>
          <PurchaseBox />
        </div>
      </section>

      <footer className="py-12 border-t border-slate-900 text-center opacity-30">
        <div className="font-black text-xl tracking-tighter italic mb-4">MASTER<span className="text-amber-500">CLT</span></div>
        <p className="text-[9px] uppercase font-bold tracking-[0.4em] mb-2">© 2024 MASTERCLT - Todos os direitos reservados</p>
        <p className="text-[8px] max-w-xs mx-auto text-slate-600">
          Resultados variam conforme o esforço. Este material é educativo e não substitui aconselhamento jurídico ou financeiro personalizado.
        </p>
      </footer>
    </div>
  );
}
