
import React, { useState, useEffect } from 'react';

// --- CONFIGURAÇÃO ---
const KIWIFY_LINK = "https://pay.kiwify.com.br/raCQcNq";
const EBOOK_MOCKUP = "https://i.imgur.com/wMi53pM.png";

// --- Sub-components ---

const CountdownTimer: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 32 });

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
      <div className="flex items-center gap-1 font-mono font-black text-red-500">
        <span>{format(timeLeft.minutes)}</span>
        <span className="animate-pulse text-red-600">:</span>
        <span>{format(timeLeft.seconds)}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center">
        <div className="bg-red-600 text-white px-3 py-1.5 rounded-md text-xl font-black tabular-nums shadow-lg shadow-red-900/20">
          {format(timeLeft.minutes)}
        </div>
        <span className="text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">Minutos</span>
      </div>
      <span className="text-red-600 font-black text-xl animate-pulse">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-red-600 text-white px-3 py-1.5 rounded-md text-xl font-black tabular-nums shadow-lg shadow-red-900/20">
          {format(timeLeft.seconds)}
        </div>
        <span className="text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">Segundos</span>
      </div>
    </div>
  );
};

const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[100] p-4 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
      <div className="container mx-auto max-w-2xl">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-2xl">
          <div className="hidden sm:block">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Acesso Vitalício</p>
            <p className="text-amber-500 font-black text-xl">R$ 9,90</p>
          </div>
          <a href={KIWIFY_LINK} className="flex-1 sm:flex-none bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-3 rounded-xl font-black text-sm uppercase transition-all animate-pulse-gold text-center">
            Garantir Meu Acesso
          </a>
        </div>
      </div>
    </div>
  );
};

const ModuleItem: React.FC<{ cap: string; title: string; desc: string }> = ({ cap, title, desc }) => (
  <div className="p-8 bg-slate-900/40 border border-white/5 rounded-[2rem] hover:border-amber-500/30 transition-all group">
    <span className="text-amber-500/50 font-black text-xs uppercase tracking-[0.3em] mb-4 block group-hover:text-amber-500 transition-colors">{cap}</span>
    <h4 className="text-white font-black mb-3 text-xl tracking-tight leading-tight uppercase">{title}</h4>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const StatCard: React.FC<{ value: string; label: string; desc: string }> = ({ value, label, desc }) => (
  <div className="text-center p-6 border-r border-white/5 last:border-0">
    <div className="text-4xl font-black text-amber-500 mb-2">{value}</div>
    <div className="text-xs font-black uppercase tracking-widest text-white mb-2">{label}</div>
    <p className="text-[10px] text-slate-500 leading-tight">{desc}</p>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30">
      <StickyCTA />
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          <div className="text-2xl font-black italic tracking-tighter">MASTER<span className="text-amber-500">CLT</span></div>
          <div className="flex items-center gap-6">
            <div className="hidden md:block">
              <CountdownTimer compact />
            </div>
            <a href="#checkout" className="bg-amber-500 text-slate-950 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all">Comprar Agora</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-56 md:pb-40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                O Manual que eu gostaria de ter lido
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
                TUDO QUE VOCÊ <br />
                PRECISA <span className="text-amber-500 italic">SABER.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
                Sair do CLT não é uma fuga, é uma direção. Este é o guia definitivo para quem busca liberdade real, baseada em planejamento técnico e não em sorte.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <a href="#checkout" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-amber-500/20 hover:scale-105 active:scale-95">
                  PEGAR MEU GUIA • R$ 9,90
                </a>
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-[10px] font-black uppercase text-slate-500 mb-2">Preço sobe em:</span>
                  <CountdownTimer />
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-[150px] rounded-full -z-10 animate-pulse"></div>
              <img src={EBOOK_MOCKUP} alt="Ebook MasterCLT" className="w-full max-w-[500px] mx-auto drop-shadow-[0_50px_100px_rgba(0,0,0,0.7)] transform lg:rotate-6 hover:rotate-0 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* The Pain Story Section */}
      <section className="py-24 bg-slate-900/20 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Baseado em fatos reais</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">O DIA EM QUE O MUNDO <br />VIROU DE CABEÇA PRA BAIXO.</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-slate-400 leading-relaxed">
                <p>Eu era fiel. Batia metas, vestia a camisa e acreditava na cultura da empresa. Até que a pandemia veio.</p>
                <div className="p-6 bg-red-600/10 border-l-4 border-red-600 rounded-r-xl">
                  <p className="text-white font-black text-xl">"650 pessoas foram demitidas sem nada."</p>
                  <p className="text-xs mt-2">Em um Zoom. Sem aviso prévio. Frio e corporativo.</p>
                </div>
                <p>Foi ali que eu decidi: <span className="text-white font-bold">nunca mais eu ia depender de ninguém para viver.</span> Construir o sonho de outra pessoa é uma ilusão que pode evaporar da noite pro dia.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <StatCard value="73%" label="Desistem no 1º Ano" desc="Por não aguentarem a pressão sem resultado." />
                <StatCard value="85%" label="Sem Reserva" desc="Percentual que larga o emprego sem planejamento." />
                <StatCard value="3x" label="Mais Trabalho" desc="Você trabalha mais, mas agora é para VOCÊ." />
                <StatCard value="40%" label="Voltam pro CLT" desc="Muitos voltam por falta de direção técnica." />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actual Contents - The Map */}
      <section className="py-32 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic">O Mapa da sua Alforria</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Tudo o que você vai encontrar dentro das páginas do Guia Definitivo MasterCLT.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <ModuleItem 
              cap="Capítulo 1" 
              title="A Mentira da Liberdade" 
              desc="A diferença entre a ilusão de trabalhar na praia e a verdade sobre a disciplina necessária para não ser escravo do caos." 
            />
            <ModuleItem 
              cap="Capítulo 2" 
              title="Planejamento é a nova Coragem" 
              desc="A técnica do paraquedas: Como montar sua reserva de emergência e testar sua fonte de renda ANTES de sair." 
            />
            <ModuleItem 
              cap="Capítulo 3" 
              title="Renda Online: Ilusão?" 
              desc="Venda, psicologia humana e persistência. O mercado digital democratizou as chances, mas a concorrência é brutal." 
            />
            <ModuleItem 
              cap="Capítulo 4" 
              title="O que ninguém te conta" 
              desc="Lidando com a falta de apoio da família, a frieza dos algoritmos e os dias ruins onde você vai querer voltar pro CLT." 
            />
            <ModuleItem 
              cap="Capítulo 5" 
              title="Primeiros Passos" 
              desc="Como escolher UM caminho, criar uma oferta clara e divulgar seu trabalho todos os dias até fechar os primeiros clientes." 
            />
            <ModuleItem 
              cap="Conclusão" 
              title="Direção, não Fuga" 
              desc="Os próximos passos práticos para os próximos 5 anos da sua vida profissional. Risco calculado não é loucura." 
            />
          </div>
        </div>
      </section>

      {/* THE BONUS SECTION - RECURRENCE */}
      <section className="py-32 bg-slate-950 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[120px] -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-20 rounded-[3rem] border border-emerald-500/30 shadow-2xl relative">
            <div className="relative z-10">
              <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-4 py-1 rounded-full mb-6 inline-block uppercase tracking-widest">Bônus Exclusivo de Lançamento</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
                CONSTRUINDO SUA <br />
                <span className="text-emerald-500 italic underline decoration-wavy decoration-emerald-500/40">RECORRÊNCIA.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-2xl leading-relaxed">
                Liberdade sem previsibilidade financeira é apenas desespero adiado. Neste método bônus, eu te ensino a estruturar sua empresa para faturar todos os meses com contratos recorrentes.
                <span className="block mt-4 text-emerald-400 font-bold">Aprenda a criar estabilidade real fora da carteira assinada.</span>
              </p>
              
              <div className="flex flex-wrap gap-6 text-sm font-black uppercase tracking-widest text-emerald-500/80">
                <span>• Modelos de Assinatura</span>
                <span>• Gestão de Cashflow</span>
                <span>• Escala Sustentável</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Offer */}
      <section id="checkout" className="py-32 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-[3rem] border-2 border-amber-500/50 overflow-hidden shadow-[0_0_100px_rgba(245,158,11,0.1)]">
            <div className="p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 flex-shrink-0">
                <img src={EBOOK_MOCKUP} alt="Ebook" className="w-full drop-shadow-2xl -rotate-2" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight uppercase leading-none">Comece sua nova jornada hoje</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">Você não precisa de um milagre. Você precisa de um plano. Leve o Guia MasterCLT + Bônus de Recorrência.</p>
                
                <div className="flex items-baseline justify-center md:justify-start gap-4 mb-10">
                  <span className="text-slate-600 line-through text-xl">R$ 97,00</span>
                  <span className="text-amber-500 text-6xl font-black tracking-tighter">R$ 9,90</span>
                </div>

                <a href={KIWIFY_LINK} className="block w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-center py-6 rounded-2xl font-black text-2xl shadow-xl transition-all active:scale-95 animate-pulse-gold uppercase tracking-tighter">
                  Acessar Guia Agora
                </a>
                
                <div className="mt-8 flex items-center justify-center md:justify-start gap-4 opacity-30 grayscale">
                   <img src="https://logodownload.org/wp-content/uploads/2014/07/visa-logo-1.png" className="h-3" alt="Visa" />
                   <img src="https://logodownload.org/wp-content/uploads/2020/02/pix-logo-1.png" className="h-3" alt="Pix" />
                   <img src="https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo.png" className="h-4" alt="Master" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 bg-slate-900/10">
        <div className="container mx-auto px-4 text-center">
          <div className="text-xl font-black italic tracking-tighter mb-8 opacity-20">MASTER<span className="text-amber-500">CLT</span></div>
          <p className="text-[10px] text-slate-700 uppercase font-bold tracking-[0.4em] mb-4">© 2024 MASTERCLT - Todos os direitos reservados</p>
          <div className="max-w-2xl mx-auto opacity-20">
            <p className="text-[8px] text-slate-800 uppercase font-bold tracking-widest leading-relaxed">
              ESTE PRODUTO É DESTINADO A PROFISSIONAIS. RISCO CALCULADO NÃO É LOUCURA, É INTELIGÊNCIA APLICADA À CORAGEM. OS RESULTADOS DEPENDEM EXCLUSIVAMENTE DA SUA EXECUÇÃO.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
