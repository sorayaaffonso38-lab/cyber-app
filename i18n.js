/**
 * NeoProtocol / Candy Cyber — i18n (PT ↔ EN)
 * Strategy: text-node replacement. EN is the base; PT replaces on top.
 */

const TRANSLATIONS = {
  // ─── Shared nav & header ───────────────────────────────────────────────
  shared: {
    'Dashboard':   { pt: 'Dashboard' },
    'Payments':    { pt: 'Pagamentos' },
    'Cards':       { pt: 'Cartões' },
    'Vault':       { pt: 'Cofre' },
    'Aura AI':     { pt: 'Aura IA' },
  },

  // ─── Login ──────────────────────────────────────────────────────────────
  login: {
    'KINETIC CIPHER SECURE GATEWAY':   { pt: 'GATEWAY SEGURO CIFRA CINÉTICA' },
    'Access Point':                    { pt: 'Ponto de Acesso' },
    'architect@neo-protocol.io':       { pt: 'arquiteto@neo-protocolo.io' }, // placeholder
    'Encryption Key':                  { pt: 'Chave de Criptografia' },
    'Recovery':                        { pt: 'Recuperar' },
    'Acessar Conta':                   { en: 'Access Account' },
    'Authentication Node':             { pt: 'Nó de Autenticação' },
    'Aura Core':                       { pt: 'Núcleo Aura' },
    'Google':                          { pt: 'Google' },
    'Apple ID':                        { pt: 'Apple ID' },
    'Node initialization failed?':     { pt: 'Falha na inicialização do nó?' },
    'Request System Access':           { pt: 'Solicitar Acesso ao Sistema' },
    'PROTOCOL ACTIVE':                 { pt: 'PROTOCOLO ATIVO' },
    'Node 0x9AF ENCRYPTED':            { pt: 'Nó 0x9AF CRIPTOGRAFADO' },
  },

  // ─── Dashboard ──────────────────────────────────────────────────────────
  dashboard: {
    '01 // QUANTUM PROTOCOL STATUS':   { pt: '01 // STATUS DO PROTOCOLO QUANTUM' },
    'Patrimônio Total':                { en: 'Total Assets' },
    'Liquid Liquidity':                { pt: 'Liquidez' },
    'Risk Index':                      { pt: 'Índice de Risco' },
    'Account Type':                    { pt: 'Tipo de Conta' },
    'Personal (PF)':                   { pt: 'Pessoal (PF)' },
    'Business (PJ)':                   { pt: 'Empresarial (PJ)' },
    'Available across 4 nodes':        { pt: 'Disponível em 4 nós' },
    'Move Assets':                     { pt: 'Mover Ativos' },
    'Statements':                      { pt: 'Extrato' },
    'Candy Cyber Ventures Ltd.':       { pt: 'Candy Cyber Ventures Ltda.' },
    'Capital Injection':               { pt: 'Injeção de Capital' },
    'Tax Report':                      { pt: 'Relatório Fiscal' },
    'Daily Spending Velocity':         { pt: 'Velocidade de Gastos Diários' },
    'Last 24-hour transaction frequency': { pt: 'Frequência de transações nas últimas 24h' },
    'Peak Intensity':                  { pt: 'Pico de Intensidade' },
    'Categorias de Gastos':            { en: 'Spending Categories' },
    'Cloud Infrastructure':            { pt: 'Infraestrutura Cloud' },
    'Cyber Security':                  { pt: 'Segurança Cibernética' },
    'Protocol Research':               { pt: 'Pesquisa de Protocolo' },
    'Dev Tooling':                     { pt: 'Ferramentas Dev' },
    'Aura Insights':                   { pt: 'Insights da Aura' },
    'SYSTEM ANALYSIS // COMPLETE':     { pt: 'ANÁLISE DO SISTEMA // CONCLUÍDA' },
    'Optimize Protocol':               { pt: 'Otimizar Protocolo' },
    '"Your spending in':               { pt: '"Seus gastos em' },
    'has increased by 12% this week. I recommend reviewing idle worker nodes in the East-1 cluster."':
      { pt: 'aumentaram 12% esta semana. Recomendo revisar os nós ociosos no cluster East-1."' },
    'Low':                             { pt: 'Baixo' },
  },

  // ─── Cards ──────────────────────────────────────────────────────────────
  cards: {
    '03 // PROTOCOL ASSETS':           { pt: '03 // ATIVOS DO PROTOCOLO' },
    'Virtual':                         { pt: 'Virtual' },
    'Nodes':                           { pt: 'Nós' },
    'Manage your encrypted payment vectors. High-performance liquidity authorized for cyber-node transactions.':
      { pt: 'Gerencie seus vetores de pagamento criptografados. Liquidez de alto desempenho autorizada para transações em nós.' },
    'GERAR NOVO CARTÃO':               { en: 'GENERATE NEW CARD' },
    'Status':                          { pt: 'Status' },
    'Ativo':                           { en: 'Active' },
    'Atrasado':                        { en: 'Overdue' },
    'Holder Name':                     { pt: 'Nome do Titular' },
    'Spending Constraints':            { pt: 'Limites de Gastos' },
    'Daily Limit':                     { pt: 'Limite Diário' },
    'Weekly Limit':                    { pt: 'Limite Semanal' },
    'Freeze Card Node':                { pt: 'Congelar Cartão' },
    'Security Protocols':              { pt: 'Protocolos de Segurança' },
    'Terminate Session':               { pt: 'Encerrar Sessão' },
    'Transaction Log':                 { pt: 'Histórico de Transações' },
    'View All Signals':                { pt: 'Ver Todos os Sinais' },
    'Target Vector':                   { pt: 'Destino' },
    'Timestamp':                       { pt: 'Data/Hora' },
    'Magnitude':                       { pt: 'Valor' },
    'Verified':                        { pt: 'Verificado' },
    'Pending':                         { pt: 'Pendente' },
    'Failed':                          { pt: 'Falhou' },
  },

  // ─── Payments ───────────────────────────────────────────────────────────
  payments: {
    '01 // SELECT PROTOCOL':           { pt: '01 // SELECIONAR PROTOCOLO' },
    'Account Tier':                    { pt: 'Tipo de Conta' },
    'Personal':                        { pt: 'Pessoal' },
    'Standard Node':                   { pt: 'Nó Padrão' },
    'Business':                        { pt: 'Empresarial' },
    'Executive Core':                  { pt: 'Núcleo Executivo' },
    'Transfer Magnitude':              { pt: 'Valor da Transferência' },
    'Real-time Liquidity Verified':    { pt: 'Liquidez em Tempo Real Verificada' },
    '02 // NODES':                     { pt: '02 // NÓS' },
    'Favoritos':                       { en: 'Favorites' },
    'View All':                        { pt: 'Ver Todos' },
    'New Protocol':                    { pt: 'Novo Protocolo' },
    'Aura Biometrics':                 { pt: 'Biometria Aura' },
    'Quantum heartbeat verification active': { pt: 'Verificação de batimento quântico ativa' },
    'Scanning Bio-Signal...':          { pt: 'Escaneando Bio-Sinal...' },
    'CONFIRMAR PAGAMENTO':             { en: 'CONFIRM PAYMENT' },
    'End-to-End Encryption':           { pt: 'Criptografia Ponta a Ponta' },
    'Cyber Insured':                   { pt: 'Seguro Cibernético' },
  },

  // ─── Vault ──────────────────────────────────────────────────────────────
  vault: {
    '02 // PROTOCOL.STK':              { pt: '02 // PROTOCOLO.STK' },
    'SECURE   VAULT':                  { pt: 'COFRE SEGURO' },
    'Contratos':                       { en: 'Contracts' },
    'Secure Items':                    { pt: 'Itens Seguros' },
    'Fisco':                           { en: 'Tax Records' },
    'Ativos':                          { en: 'Assets' },
    'Seguros':                         { en: 'Insurance' },
    'Recent Syncs':                    { pt: 'Sincronizações Recentes' },
    'View All History':                { pt: 'Ver Todo o Histórico' },
    'Quantum-Resistant':               { pt: 'Resistente a Quantum' },
    'SUBIR ARQUIVO':                   { en: 'UPLOAD FILE' },
  },

  // ─── Statement ──────────────────────────────────────────────────────────
  statement: {
    '02 // TRANSACTIONAL PROTOCOL':    { pt: '02 // PROTOCOLO TRANSACIONAL' },
    'Statement.':                      { pt: 'Extrato.' },
    'Filter':                          { pt: 'Filtrar' },
    'Export CSV':                      { pt: 'Exportar CSV' },
    'Aura Insight':                    { pt: 'Insight da Aura' },
    'Anomalous spending detected in':  { pt: 'Gasto anômalo detectado em' },
    'Monthly Burn':                    { pt: 'Gasto Mensal' },
    'Your business expenditures increased by 12% this cycle. We recommend offloading non-critical nodes to the Cold Vault.':
      { pt: 'Seus gastos empresariais aumentaram 12% neste ciclo. Recomendamos mover nós não críticos para o Cofre Frio.' },
    'Optimize Infrastructure':         { pt: 'Otimizar Infraestrutura' },
    'Allocation Matrix':               { pt: 'Matriz de Alocação' },
    'PJ Operations':                   { pt: 'Operações PJ' },
    'PF Personal':                     { pt: 'PF Pessoal' },
    'Recent Cycles':                   { pt: 'Ciclos Recentes' },
    'October 2024':                    { pt: 'Outubro de 2024' },
    'Oct 24 • 14:02 UTC':              { pt: '24 Out • 14:02 UTC' },
    'Oct 23 • 19:45 UTC':              { pt: '23 Out • 19:45 UTC' },
    'Oct 22 • 09:00 UTC':              { pt: '22 Out • 09:00 UTC' },
    'Oct 21 • 21:12 UTC':              { pt: '21 Out • 21:12 UTC' },
    'Oct 20 • 02:44 UTC':              { pt: '20 Out • 02:44 UTC' },
    'Processed':                       { pt: 'Processado' },
    'Authorized':                      { pt: 'Autorizado' },
    'Settled':                         { pt: 'Liquidado' },
    'Load Previous Cycles':            { pt: 'Carregar Ciclos Anteriores' },
  },

  // ─── Aura ───────────────────────────────────────────────────────────────
  aura: {
    'Protocol':                        { pt: 'Protocolo' },
    'Network':                         { pt: 'Rede' },
    'System Interface':                { pt: 'Interface do Sistema' },
    'Sync: Active':                    { pt: 'Sincronizado: Ativo' },
    'Latency: 0.4ms':                  { pt: 'Latência: 0,4ms' },
    // Mensagem do usuário (PT → EN)
    'Análise o desempenho atual do protocolo Candy Cyber. Foco em vendas de Marketing, Inova Home e Flash Trip.':
      { en: 'Analyze the current Candy Cyber protocol performance. Focus on Marketing, Inova Home and Flash Trip sales.' },
    'Terminal User // 14:02:11':       { pt: 'Usuário Terminal // 14:02:11' },
    'Aura Intelligence Response':      { pt: 'Resposta da Inteligência Aura' },
    // Resposta da IA (EN → PT)
    'Protocols operating at 94.2% efficiency. Analyzing cross-sector sales data for current cycle.':
      { pt: 'Protocolos operando com 94,2% de eficiência. Analisando dados de vendas entre setores para o ciclo atual.' },
    // Resposta parcialmente PT (PT → EN)
    'Detectado um aumento de 12% na conversão orgânica para a vertical de luxo. Os seguintes clusters apresentam anomalias de performance positiva:':
      { en: 'Detected a 12% increase in organic conversion for the luxury vertical. The following clusters show positive performance anomalies:' },
    'Volume Total':                    { en: 'Total Volume' },
    'Estabilização':                   { en: 'Stabilization' },
    'Expansão Viral':                  { en: 'Viral Expansion' },
    'Automatizar Gastos':              { en: 'Automate Expenses' },
    'Otimizar Impostos':               { en: 'Optimize Taxes' },
    'Export Full Report':              { pt: 'Exportar Relatório Completo' },
    'Neural Core v2.1 // Response generated in 214ms':
      { pt: 'Neural Core v2.1 // Resposta gerada em 214ms' },
    'Secure Protocol L-9':             { pt: 'Protocolo Seguro L-9' },
    'Encryption Active':               { pt: 'Criptografia Ativa' },
    'Neural Sync: 99.9%':              { pt: 'Sincronização Neural: 99,9%' },
  },

};

// ─── Engine ─────────────────────────────────────────────────────────────────

const I18N = {
  get lang() {
    return localStorage.getItem('cc-lang') || 'en';
  },
  set lang(v) {
    localStorage.setItem('cc-lang', v);
  },

  /** Walk all text nodes and replace strings */
  apply(lang) {
    const page = document.documentElement.dataset.page || 'shared';
    const dict = { ...TRANSLATIONS.shared, ...(TRANSLATIONS[page] || {}) };

    // Build flat map: current text → target text
    const map = new Map();
    for (const [base, variants] of Object.entries(dict)) {
      if (lang === 'pt') {
        const pt = variants.pt;
        if (pt) map.set(base, pt);
        // Also map EN variant back to PT if it exists
        if (variants.en) map.set(variants.en, pt || base);
      } else {
        // en: restore base, or use explicit 'en' override
        const en = variants.en || base;
        if (variants.pt) map.set(variants.pt, en); // replace PT back to EN
        if (variants.en) map.set(base, en);         // replace PT base to EN override
      }
    }

    // Walk DOM text nodes
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const replacements = [];
    let node;
    while ((node = walker.nextNode())) {
      const text = node.textContent;
      for (const [from, to] of map) {
        if (text.includes(from)) {
          replacements.push([node, text.replace(from, to)]);
          break;
        }
      }
    }
    replacements.forEach(([node, newText]) => node.textContent = newText);

    // Update placeholders
    document.querySelectorAll('input[placeholder]').forEach(input => {
      const ph = input.getAttribute('placeholder');
      for (const [from, to] of map) {
        if (ph === from) { input.setAttribute('placeholder', to); break; }
      }
    });

    // Swap elements with explicit data-i18n-pt attributes (most reliable)
    this.swapDataAttrs(lang);

    // Swap currency values (data-usd / data-brl)
    this.swapCurrency(lang);
  },

  swapDataAttrs(lang) {
    document.querySelectorAll('[data-i18n-pt]').forEach(el => {
      const pt = el.dataset.i18nPt;
      const en = el.dataset.i18nEn || el.dataset._enCache;
      // Cache the original EN text on first run
      if (!el.dataset._enCache) el.dataset._enCache = el.textContent.trim();
      const enText = el.dataset._enCache;
      el.textContent = lang === 'pt' ? pt : enText;
    });
  },

  swapCurrency(lang) {
    document.querySelectorAll('[data-usd][data-brl]').forEach(el => {
      el.innerHTML = lang === 'pt' ? el.dataset.brl : el.dataset.usd;
    });
  },

  toggle() {
    this.lang = this.lang === 'en' ? 'pt' : 'en';
    this.apply(this.lang);
    this.updateBtn();
  },

  updateBtn() {
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = this.lang === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN';
  },

  init() {
    // Inject toggle button into header
    const injectBtn = () => {
      const header = document.querySelector('header');
      if (!header) return;
      if (document.getElementById('lang-toggle')) return;

      const btn = document.createElement('button');
      btn.id = 'lang-toggle';
      btn.style.cssText = [
        'font-family: Space Grotesk, sans-serif',
        'font-size: 11px',
        'font-weight: 700',
        'letter-spacing: 0.1em',
        'text-transform: uppercase',
        'padding: 6px 12px',
        'border: 1px solid rgba(0,255,65,0.3)',
        'background: rgba(0,0,0,0.5)',
        'color: #00FF41',
        'cursor: pointer',
        'border-radius: 4px',
        'transition: all 0.2s',
        'white-space: nowrap',
        'flex-shrink: 0',
      ].join(';');
      btn.addEventListener('mouseenter', () => btn.style.borderColor = '#00FF41');
      btn.addEventListener('mouseleave', () => btn.style.borderColor = 'rgba(0,255,65,0.3)');
      btn.addEventListener('click', () => I18N.toggle());

      // Insert before last child of header (avatar/right side)
      const headerChildren = header.children;
      const lastChild = headerChildren[headerChildren.length - 1];
      header.insertBefore(btn, lastChild);

      this.updateBtn();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', injectBtn);
    } else {
      injectBtn();
    }

    // Apply current lang on load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.apply(this.lang));
    } else {
      this.apply(this.lang);
    }
  }
};

I18N.init();
