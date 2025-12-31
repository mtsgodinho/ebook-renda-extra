
import React, { useState, useEffect } from 'react';

// --- CONFIGURAÇÃO ---
const KIWIFY_LINK = "https://pay.kiwify.com.br/raCQcNq";
const EBOOK_MOCKUP = "https://i.imgur.com/wMi53pM.png";

// --- Sub-components ---

const CountdownTimer: React.FC<{ className?: string }> = ({ className }) => {
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

  return (
    <div className={`flex items-center space-x-1 font-mono ${className}`}>
      <span className="text-amber-500 font-bold">{format(timeLeft.hours)}:{format(timeLeft.minutes)}:{format(timeLeft.seconds)}</span>
    </div>
  );
};

const Header: React.FC = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <div className="font-black text-xl tracking-tighter italic">MASTER<span className="text-amber-500">CLT</span></div>
      <a href="#checkout" className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-2 rounded-lg text-xs font-black transition-all uppercase">
        Garantir Vaga
      </a>
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
          <h3 className="text-2xl font-black text-white mb-2 tracking-tight">O MAPA DA SUA LIBERDADE</h3>
          <p className="text-slate-400 text-sm mb-6">Você receberá o Guia Completo + 2 Bônus Exclusivos imediatamente após o pagamento.</p>
          
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30">
      <Header />

      {/* Hero Section - Direct & Clean */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-7/12 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">A oferta expira em: <CountdownTimer className="inline ml-1" /></span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                PEÇA AS CONTAS COM <span className="text-amber-500">ESTRATÉGIA.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
                Pare de ser refém da "segurança" do CLT. Descubra o método validado para fazer sua transição de carreira sem riscos financeiros e com total liberdade.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href="#checkout" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-2xl active:scale-95">
                  PEGAR O MAPA AGORA
                </a>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Acesso vitalício por R$ 9,90</p>
              </div>
            </div>
            <div className="lg:w-5/12 relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-[120px] rounded-full -z-10"></div>
              <img src={EBOOK_MOCKUP} alt="MasterCLT Ebook" className="w-full max-w-[450px] mx-auto drop-shadow-[0_35px_60px_rgba(0,0,0,0.6)] transform rotate-2 hover:rotate-0 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Proof/Authority Bar */}
      <section className="py-10 border-y border-slate-900 bg-slate-900/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all">
            <span className="font-black text-xl italic">ESTRATÉGIA</span>
            <span className="font-black text-xl italic">LIBERDADE</span>
            <span className="font-black text-xl italic">SEGURANÇA</span>
            <span className="font-black text-xl italic">RENDA EXTRA</span>
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">O QUE ESTÁ EM JOGO?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">A diferença entre quem consegue sair do CLT e quem fica preso para sempre não é o dinheiro, é a informação.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <BenefitCard icon="🧱" title="O Fim da Parede" desc="Entenda por que subir na carreira corporativa é como bater em uma parede de vidro que você nunca vai atravessar." />
            <BenefitCard icon="🧮" title="A Matemática do Dono" desc="O cálculo exato que prova que você está perdendo dinheiro todos os meses ao não ter um negócio próprio." />
            <BenefitCard icon="🔑" title="Chaves de Transição" desc="As 3 chaves mestras para sair do emprego atual sem queimar pontes e com os bolsos cheios." />
          </div>
        </div>
      </section>

      {/* Modules - Detailed Value */}
      <section className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-950 p-8 md:p-16 rounded-[3rem] border border-slate-900">
            <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight text-center md:text-left">DENTRO DO GUIA MASTERCLT:</h2>
            <div className="space-y-2">
              <ModuleRow number="01" title="A Anatomia da Escravidão Moderna" tags={["MINDSET", "REPROGRAMAÇÃO"]} />
              <ModuleRow number="02" title="Criando sua Blindagem de 12 Meses" tags={["FINANÇAS", "PLANILHA"]} />
              <ModuleRow number="03" title="O Plano de Fuga Silencioso" tags={["ESTRATÉGIA", "JURÍDICO"]} />
              <ModuleRow number="04" title="Monetizando seu Conhecimento em 30 dias" tags={["RENDA", "NEGÓCIO"]} />
              <ModuleRow number="05" title="Rotina de Alta Performance Solo" tags={["FOCO", "PRODUTIVIDADE"]} />
            </div>
            
            <div className="mt-12 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <h4 className="font-bold text-amber-500 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                BÔNUS INCLUÍDO
              </h4>
              <p className="text-slate-400 text-sm italic">Planilha de Fluxo de Caixa Pessoal para Transição + Checklist "Dia D" de Demissão.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Single Strong Impact */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <p className="text-2xl md:text-3xl font-medium text-slate-200 italic mb-8">
              "Eu achava que liberdade era ganhar mais. O MasterCLT me ensinou que liberdade é ser dono das suas horas. Apliquei o plano e 4 meses depois estava vivendo do meu próprio negócio."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-amber-500 border border-slate-700">RB</div>
              <div className="text-left">
                <p className="font-bold text-white">Rodrigo B.</p>
                <p className="text-amber-500 text-[10px] font-bold uppercase tracking-widest">Ex-Analista de Sistemas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-none">
              O INVESTIMENTO É <span className="text-amber-500 italic">SIMBÓLICO.</span><br />
              O RESULTADO É PARA SEMPRE.
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Menos do que o valor de um lanche para ter acesso ao plano que vai mudar o rumo da sua vida profissional.
            </p>
          </div>
          <PurchaseBox />
        </div>
      </section>

      {/* FAQ - Minimalist */}
      <section className="py-24 bg-slate-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-black mb-12 tracking-tighter uppercase">Dúvidas?</h2>
            <div className="space-y-6 text-left">
              <div>
                <h4 className="font-bold text-white mb-2">Como recebo o guia?</h4>
                <p className="text-slate-400 text-sm">Acesso imediato via e-mail. Você baixa o arquivo PDF e pode ler no celular, tablet ou computador.</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">Tem alguma garantia?</h4>
                <p className="text-slate-400 text-sm">Sim. Se você ler e achar que não agregou nada, tem 7 dias para pedir o reembolso total diretamente na Kiwify.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-900 text-center">
        <div className="font-black text-xl tracking-tighter italic mb-4 opacity-30">MASTER<span className="text-amber-500">CLT</span></div>
        <p className="text-[9px] uppercase font-bold tracking-[0.4em] text-slate-600 mb-2">© 2024 MASTERCLT - Todos os direitos reservados</p>
        <p className="text-[8px] max-w-xs mx-auto text-slate-700">
          Resultados variam de acordo com o esforço individual. Este site não garante ganhos financeiros sem trabalho.
        </p>
      </footer>
    </div>
  );
}
