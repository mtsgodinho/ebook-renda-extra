
import React, { useState, useEffect } from 'react';

// --- CONFIGURAÇÃO ---
const KIWIFY_LINK = "https://pay.kiwify.com.br/raCQcNq";

// --- Sub-components ---

const CountdownTimer: React.FC<{ className?: string }> = ({ className }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 27, seconds: 44 });

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
    <div className={`flex items-center space-x-2 font-mono ${className}`}>
      <div className="bg-amber-500 text-slate-950 px-2 py-1 rounded text-sm font-bold">
        {format(timeLeft.hours)}h {format(timeLeft.minutes)}m {format(timeLeft.seconds)}s
      </div>
    </div>
  );
};

const Header: React.FC = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-900">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <div className="font-black text-xl tracking-tighter uppercase">Master<span className="text-amber-500">CLT</span></div>
      <div className="flex items-center space-x-4">
        <CountdownTimer className="hidden sm:flex" />
        <a href="#checkout" className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-2 rounded-full text-xs font-black transition-all transform active:scale-95">
          OBTER AGORA
        </a>
      </div>
    </div>
  </header>
);

const ModuleItem: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
  <div className="flex gap-6 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-amber-500/30 transition-all group">
    <div className="text-3xl font-black text-amber-500/20 group-hover:text-amber-500 transition-colors">{number}</div>
    <div>
      <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const BonusCard: React.FC<{ title: string; value: string; icon: string }> = ({ title, value, icon }) => (
  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/20 overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-5xl">{icon}</div>
    <span className="inline-block bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded mb-4">BÔNUS EXCLUSIVO</span>
    <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
    <p className="text-amber-500 text-sm font-bold italic">Valor Individual: {value}</p>
    <p className="text-slate-400 text-xs mt-2 uppercase tracking-widest font-bold text-green-500">Grátis para você hoje</p>
  </div>
);

const VslSection: React.FC = () => (
  <section className="py-12 md:py-20 bg-slate-950">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-amber-500 font-bold text-sm tracking-[0.3em] uppercase mb-4">Apresentação Exclusiva</h2>
      <h3 className="text-3xl md:text-5xl font-black mb-8 max-w-4xl mx-auto leading-tight">
        Assista ao vídeo abaixo e descubra como <span className="text-amber-500 italic">hackear</span> o sistema.
      </h3>
      <div className="max-w-4xl mx-auto aspect-video bg-slate-900 rounded-[2rem] border-4 border-slate-800 shadow-[0_0_50px_rgba(245,158,11,0.1)] overflow-hidden relative group cursor-pointer">
        {/* Placeholder para VSL - O usuário pode colocar o iframe aqui */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 group-hover:bg-black/40 transition-all">
          <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
            <svg className="w-10 h-10 text-slate-950 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4.5 3.5v13l11-6.5-11-6.5z"/></svg>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-40" alt="Video Background" />
      </div>
      <p className="mt-8 text-slate-500 text-sm animate-pulse flex items-center justify-center gap-2">
        <span className="w-2 h-2 bg-red-500 rounded-full"></span> 
        Verifique se o seu áudio está ligado
      </p>
    </div>
  </section>
);

const PurchaseBox: React.FC = () => (
  <div id="checkout" className="max-w-xl mx-auto bg-slate-900 rounded-3xl border-2 border-amber-500 overflow-hidden shadow-[0_0_80px_rgba(245,158,11,0.15)] transform hover:scale-[1.01] transition-all">
    <div className="bg-amber-500 p-4 text-slate-950 text-center font-black uppercase tracking-tighter text-lg">
      Oferta Especial de Lançamento
    </div>
    <div className="p-8 md:p-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h4 className="text-2xl font-black text-white">Guia MasterCLT</h4>
          <p className="text-slate-400 text-sm">Acesso vitalício + Atualizações</p>
        </div>
        <div className="text-right">
          <p className="text-slate-500 line-through text-sm">De R$ 97,00</p>
          <p className="text-amber-500 text-4xl font-black">R$ 9,90</p>
        </div>
      </div>
      
      <div className="space-y-4 mb-8">
        {[
          "Checklist de Transição Segura",
          "Planilha de Blindagem Financeira",
          "Modelos de Demissão Amigável",
          "Bônus: Guia de Networking 2.0"
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-slate-200 text-sm font-medium">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            {item}
          </div>
        ))}
      </div>

      <a href={KIWIFY_LINK} className="block w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-center py-5 rounded-2xl font-black text-xl shadow-xl transition-all hover:shadow-amber-500/20 active:scale-95 animate-pulse-gold">
        QUERO MINHA LIBERDADE AGORA
      </a>
      
      <div className="mt-6 text-center space-y-4">
        <div className="flex items-center justify-center gap-4 opacity-40 grayscale">
          <img src="https://logodownload.org/wp-content/uploads/2014/07/visa-logo-1.png" className="h-4" alt="Visa" />
          <img src="https://logodownload.org/wp-content/uploads/2020/02/pix-logo-1.png" className="h-4" alt="Pix" />
          <img src="https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo.png" className="h-4" alt="Master" />
        </div>
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
          🔒 Pagamento processado pela Kiwify • Ambiente 100% Seguro
        </p>
      </div>
    </div>
  </div>
);

export default function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent -z-10 opacity-50"></div>
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-500 text-xs font-bold mb-8 uppercase tracking-[0.2em]">
            O Segredo que seu chefe não quer que você saiba
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-8 max-w-5xl mx-auto">
            A ESTABILIDADE É UMA <span className="gradient-text italic">ILUSÃO</span> QUE TE MANTÉM PRESO.
          </h1>
          <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10 font-medium">
            O mapa definitivo para sair do CLT com segurança, estratégia e um plano de fuga que realmente funciona.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#checkout" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-2xl hover:scale-105 active:scale-95">
              GARANTIR MEU ACESSO R$ 9,90
            </a>
            <div className="flex -space-x-3 overflow-hidden py-1">
              {[1, 2, 3, 4].map(i => (
                <img key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-950" src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
              ))}
              <div className="flex items-center justify-center h-10 px-4 rounded-full bg-slate-900 ring-2 ring-slate-950 text-[10px] font-bold text-slate-400 uppercase">
                +1,200 alunos
              </div>
            </div>
          </div>
        </div>
      </section>

      <VslSection />

      {/* Pain Section */}
      <section className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                Você está trocando sua <span className="text-red-500">vida</span> por um salário que mal paga suas contas?
              </h2>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-900 border-l-4 border-red-500">
                  <h4 className="font-bold mb-2">A Crise do Estresse</h4>
                  <p className="text-slate-400 text-sm italic">"Burnout não é falta de resiliência, é excesso de ambiente tóxico."</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900 border-l-4 border-amber-500">
                  <h4 className="font-bold mb-2">A Falsa Segurança</h4>
                  <p className="text-slate-400 text-sm">O maior risco não é tentar algo novo, é ficar onde você está e ser descartado na próxima "reestruturação".</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-[100px] -z-10"></div>
              <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800" className="rounded-[3rem] shadow-2xl border border-slate-800 transform rotate-2" alt="Realidade" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">O QUE VOCÊ VAI DOMINAR</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Tudo o que você precisa para arquitetar sua saída estratégica sem dar um passo no escuro.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <ModuleItem number="01" title="Mindset de Transição" desc="Como reprogramar sua mente para parar de pensar como empregado e começar a ver oportunidades como dono do seu tempo." />
            <ModuleItem number="02" title="Cálculo da Alforria" desc="Método exato para calcular sua reserva de emergência e quanto você realmente precisa para viver com dignidade." />
            <ModuleItem number="03" title="A Saída Blindada" desc="A estratégia legal e ética para sair do emprego atual mantendo as portas abertas e garantindo seus direitos." />
            <ModuleItem number="04" title="Monetização Imediata" desc="Técnicas para gerar seus primeiros R$ 2.000,00 extras enquanto ainda está no CLT para validar sua nova jornada." />
            <ModuleItem number="05" title="Gestão de Rotina Solo" desc="Como não surtar com a liberdade: O guia de produtividade para quem agora é o próprio chefe." />
            <ModuleItem number="06" title="Escalando o Futuro" desc="O roadmap dos próximos 12 meses após a demissão para nunca mais precisar atualizar um currículo na vida." />
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-24 bg-amber-500/5 border-y border-amber-500/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">Presentes Exclusivos</h2>
            <p className="text-slate-400">Ao garantir o eBook hoje, você leva ferramentas que custariam R$ 197,00 separadamente.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <BonusCard title="Planilha de Blindagem Financeira" value="R$ 47,00" icon="📊" />
            <BonusCard title="Manual de Networking Estratégico" value="R$ 67,00" icon="🤝" />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-900 p-12 rounded-[3rem] border border-slate-800 relative">
            <div className="absolute -top-6 -left-6 text-amber-500 text-8xl opacity-20">“</div>
            <p className="text-xl md:text-3xl font-medium text-slate-200 mb-8 italic leading-relaxed">
              "Eu achava que precisava de 50 mil reais guardados para sair. O MasterCLT me mostrou que com estratégia e 4 meses de reserva eu já poderia voar. Hoje sou consultor e trabalho metade do tempo faturando o dobro."
            </p>
            <div className="flex items-center gap-4">
              <img src="https://i.pravatar.cc/100?u=lucas" className="w-16 h-16 rounded-full border-2 border-amber-500" alt="avatar" />
              <div>
                <p className="font-bold text-white text-lg">Lucas Menezes</p>
                <p className="text-amber-500 text-xs font-bold uppercase">Ex-Gerente Comercial</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Offer */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-none">
              DECIDA PELO SEU <span className="text-amber-500">FUTURO</span> AGORA.
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Você pode ignorar esta página e continuar na mesma rotina, ou investir o preço de um café para mudar sua trajetória para sempre.
            </p>
          </div>
          <PurchaseBox />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-black mb-12 text-center tracking-tighter">PERGUNTAS FREQUENTES</h2>
            <div className="space-y-4">
              {[
                {q: "O acesso é imediato?", a: "Sim! Assim que o pagamento for aprovado, você recebe o link de download no seu e-mail cadastrado."},
                {q: "Mesmo se eu não tiver nada guardado serve?", a: "Principalmente para você. O guia ensina exatamente como começar a construir sua reserva do zero enquanto ainda trabalha."},
                {q: "Tenho garantia?", a: "Sim, risco zero. Se em 7 dias você achar que o conteúdo não agregou valor, devolvemos 100% do seu dinheiro via Kiwify."}
              ].map((faq, i) => (
                <div key={i} className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <h4 className="font-bold text-white mb-2">{faq.q}</h4>
                  <p className="text-slate-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-900 text-center opacity-40">
        <p className="text-[10px] uppercase font-bold tracking-[0.4em] mb-4">MasterCLT • 2024</p>
        <p className="text-[8px] max-w-xs mx-auto text-slate-500">
          Este site não faz parte do Google ou Facebook. Os resultados podem variar de pessoa para pessoa.
        </p>
      </footer>
    </div>
  );
}
