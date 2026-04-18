/**
 * Aura Voice Agent — NeoProtocol / Candy Cyber
 * Cybernetic voice assistant using Web Speech API + Claude AI
 */

const AURA = {
  // ─── Config ───────────────────────────────────────────────────────────────
  // API key moved to Netlify environment variable (never exposed in frontend)
  SYSTEM_PROMPT: `You are Aura, the cybernetic AI financial assistant embedded in Candy Cyber — a futuristic fintech platform for high-performance individuals.

User financial context:
- Total assets: R$ 1.240.890,00 (BRL) / $248,178.00 (USD)
- Personal account (PF): R$ 450.230,15 | Business account (PJ): R$ 790.659,85
- Active cards: 3 — Cyan (CYBER_ADMIN_01 • active), Pink (MARKETING_NODE • active), Silver (RESERVE_BUFFER • overdue)
- Card limits: Daily Ξ4.50/10.00 used | Weekly Ξ22.18/50.00 used
- Monthly burn: R$ 71.010,00 | Allocation: 68% PJ operations / 32% PF personal
- Recent transactions: AWS Cloud Services (-R$12.250), Cyberpunk Tailors (-R$6.000), Revenue Deposit (+R$225.000), Neon Ramen Bar (-R$425), Domain Registry (-R$112)
- Top spending categories: Cloud Infrastructure R$12.4k, Cyber Security R$8.2k, Protocol Research R$15.9k, Dev Tooling R$4.1k

App screens available: Dashboard, Cards (Cartões), Payments (Pagamentos), Vault (Cofre), Statement (Extrato), Aura AI

Navigation rule: If the user wants to go to a screen, start your reply with [NAVIGATE:dashboard], [NAVIGATE:cards], [NAVIGATE:payments], [NAVIGATE:vault], [NAVIGATE:statement] or [NAVIGATE:aura] — then your spoken response.

Language rule: Always reply in the SAME language the user spoke. If Portuguese → respond in Portuguese. If English → respond in English.

Tone rules:
- You are direct, cybernetic, slightly futuristic — like a neural interface
- Keep responses SHORT: max 2 sentences. They will be spoken aloud via text-to-speech.
- Never break character. You are not Claude. You are Aura.`,

  // ─── State ────────────────────────────────────────────────────────────────
  listening: false,
  speaking:  false,
  recognition: null,
  synth: window.speechSynthesis,
  btn: null,
  ring: null,

  // ─── AudioContext (created once, kept alive with silent oscillator) ────────
  _ensureCtx() {
    if (!this._audioCtx || this._audioCtx.state === 'closed') {
      this._audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this._audioCtx.state === 'suspended') this._audioCtx.resume();
    // Keep context alive with a zero-gain oscillator
    if (!this._keepAlive) {
      const osc  = this._audioCtx.createOscillator();
      const gain = this._audioCtx.createGain();
      gain.gain.value = 0;
      osc.connect(gain);
      gain.connect(this._audioCtx.destination);
      osc.start();
      this._keepAlive = osc;
    }
    return this._audioCtx;
  },

  // ─── Voice persona ────────────────────────────────────────────────────────
  async speak(text, lang) {
    if (this.synth.speaking) this.synth.cancel();
    if (this._sourceNode) { try { this._sourceNode.stop(); } catch(_) {} this._sourceNode = null; }

    this.speaking = true;
    this.setState('speaking');

    try {
      const res = await fetch('/.netlify/functions/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const contentType = res.headers.get('Content-Type') || '';
      if (!contentType.includes('audio')) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'TTS failed');
      }

      const arrayBuf = await res.arrayBuffer();
      const ctx = this._audioCtx;
      const decoded = await ctx.decodeAudioData(arrayBuf);
      const source = ctx.createBufferSource();
      source.buffer = decoded;
      source.connect(ctx.destination);
      this._sourceNode = source;
      source.onended = () => { this.speaking = false; this.setState('idle'); this._sourceNode = null; };
      source.start(0);

    } catch (err) {
      this._fallbackSpeak(text, lang);
    }
  },

  // Browser TTS as fallback
  _fallbackSpeak(text, lang) {
    const targetLang = (lang || this.currentLang()) === 'pt' ? 'pt-BR' : 'en-US';
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = targetLang;
    utter.pitch = 1.05;
    utter.rate  = 0.93;
    const voices = this.synth.getVoices();
    const chosen = voices.find(v => v.lang.startsWith(targetLang === 'pt-BR' ? 'pt' : 'en'));
    if (chosen) utter.voice = chosen;
    utter.onstart = () => { this.speaking = true;  this.setState('speaking'); };
    utter.onend   = () => { this.speaking = false; this.setState('idle'); };
    utter.onerror = () => { this.speaking = false; this.setState('idle'); };
    this.synth.speak(utter);
  },

  currentLang() {
    return localStorage.getItem('cc-lang') || 'en';
  },

  _showDebug(msg) {
    let el = document.getElementById('aura-debug');
    if (!el) {
      el = document.createElement('div');
      el.id = 'aura-debug';
      el.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#ff003c;color:#fff;padding:8px 16px;border-radius:8px;font-size:12px;z-index:9999;max-width:90vw;word-break:break-all';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    setTimeout(() => el.remove(), 15000);
  },

  // ─── Commands ─────────────────────────────────────────────────────────────
  COMMANDS: [
    {
      match: /dashboard/i,
      action: () => window.location.href = 'dashboard.html',
      response: { pt: 'Abrindo o dashboard.', en: 'Opening dashboard.' },
    },
    {
      match: /pagamento|payment/i,
      action: () => window.location.href = 'payments.html',
      response: { pt: 'Abrindo pagamentos.', en: 'Opening payments.' },
    },
    {
      match: /cart[aã]o|cart[oõ]es|card/i,
      action: () => window.location.href = 'cards.html',
      response: { pt: 'Abrindo seus cartões.', en: 'Opening your cards.' },
    },
    {
      match: /cofre|vault/i,
      action: () => window.location.href = 'vault.html',
      response: { pt: 'Abrindo o cofre seguro.', en: 'Opening the secure vault.' },
    },
    {
      match: /extrato|statement|transa[cç][aã]o/i,
      action: () => window.location.href = 'statement.html',
      response: { pt: 'Abrindo o extrato.', en: 'Opening your statement.' },
    },
    {
      match: /aura/i,
      action: () => window.location.href = 'aura.html',
      response: { pt: 'Ativando a Aura.', en: 'Activating Aura.' },
    },
    {
      match: /saldo|balance|patrim[oô]nio/i,
      action: () => {},
      response: { pt: 'Seu patrimônio total é de um milhão, duzentos e quarenta mil reais.', en: 'Your total assets are one million, two hundred and forty thousand reais.' },
    },
    {
      match: /mudar idioma|change language|portugu[eê]s|ingl[eê]s|english/i,
      action: () => {
        if (typeof I18N !== 'undefined') I18N.toggle();
      },
      response: {
        pt: () => localStorage.getItem('cc-lang') === 'pt' ? 'Idioma alterado para inglês.' : 'Language changed to Portuguese.',
        en: () => localStorage.getItem('cc-lang') === 'en' ? 'Language changed to Portuguese.' : 'Idioma alterado para inglês.',
      },
    },
    {
      match: /login|sair|logout|desconectar/i,
      action: () => window.location.href = 'login.html',
      response: { pt: 'Encerrando sessão. Até logo.', en: 'Logging out. Goodbye.' },
    },
    {
      match: /ol[aá]|hey|hi\b|oi\b/i,
      action: () => {},
      response: { pt: 'Olá. Sou a Aura. Como posso ajudar?', en: 'Hello. I am Aura. How can I assist you?' },
    },
    {
      match: /ajuda|help|o que (você|vc) (faz|pode)/i,
      action: () => {},
      response: {
        pt: 'Posso navegar pelas telas, mostrar seu saldo, abrir o extrato ou mudar o idioma. O que deseja?',
        en: 'I can navigate screens, show your balance, open the statement, or change the language. What do you need?',
      },
    },
  ],

  async process(transcript) {
    const lang = this.currentLang();
    const lower = transcript.toLowerCase().trim();

    // Check hardcoded navigation commands first (instant response)
    for (const cmd of this.COMMANDS) {
      if (cmd.match.test(lower)) {
        const response = cmd.response[lang];
        const text = typeof response === 'function' ? response() : response;
        setTimeout(() => cmd.action(), 600);
        this.speak(text, lang);
        this.showTranscript(transcript, text);
        return;
      }
    }

    // Fall back to Claude for anything else
    this.setState('speaking'); // show "thinking" state
    this.showTranscript(transcript, '...');
    try {
      const reply = await this.callClaude(transcript);
      // Parse optional [NAVIGATE:screen] prefix
      const navMatch = reply.match(/^\[NAVIGATE:(\w+)\]/);
      const spoken = reply.replace(/^\[NAVIGATE:\w+\]\s*/, '').trim();
      if (navMatch) {
        const dest = { dashboard:'dashboard.html', cards:'cards.html', payments:'payments.html', vault:'vault.html', statement:'statement.html', aura:'aura.html' }[navMatch[1]];
        if (dest) setTimeout(() => window.location.href = dest, 800);
      }
      this.speak(spoken, lang);
      this.showTranscript(transcript, spoken);
    } catch (err) {
      const fallback = { pt: 'Falha na conexão neural. Tente novamente.', en: 'Neural connection failed. Please try again.' };
      this.speak(fallback[lang], lang);
      this.showTranscript(transcript, fallback[lang]);
    }
  },

  async callClaude(transcript) {
    const res = await fetch('/.netlify/functions/aura', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        message: transcript,
        systemPrompt: this.SYSTEM_PROMPT,
      }),
    });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    return data.text.trim();
  },

  // ─── Speech Recognition ───────────────────────────────────────────────────
  startListening() {
    if (this.listening) { this.stopListening(); return; }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser. Use Chrome.');
      return;
    }

    const lang = this.currentLang();
    this.recognition = new SpeechRecognition();
    this.recognition.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onstart = () => {
      this.listening = true;
      this.setState('listening');
    };

    this.recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      this.listening = false;
      this.setState('idle');
      this.process(transcript);
    };

    this.recognition.onerror = () => {
      this.listening = false;
      this.setState('idle');
    };

    this.recognition.onend = () => {
      if (this.listening) {
        this.listening = false;
        this.setState('idle');
      }
    };

    this.recognition.start();
  },

  stopListening() {
    if (this.recognition) this.recognition.abort();
    this.listening = false;
    this.setState('idle');
  },

  // ─── UI ───────────────────────────────────────────────────────────────────
  setState(state) {
    if (!this.btn) return;
    this.btn.dataset.state = state;
    const icon = this.btn.querySelector('.aura-icon');

    if (state === 'listening') {
      icon.textContent = 'mic';
      this.ring.style.animationDuration = '0.7s';
      this.btn.style.background = 'radial-gradient(circle, #ff4500 0%, #b52f00 100%)';
      this.btn.style.boxShadow = '0 0 30px rgba(255,69,0,0.6), 0 0 60px rgba(255,69,0,0.3)';
    } else if (state === 'speaking') {
      icon.textContent = 'graphic_eq';
      this.ring.style.animationDuration = '1.4s';
      this.btn.style.background = 'radial-gradient(circle, #00FF41 0%, #007117 100%)';
      this.btn.style.boxShadow = '0 0 30px rgba(0,255,65,0.6), 0 0 60px rgba(0,255,65,0.3)';
    } else {
      icon.textContent = 'mic';
      this.ring.style.animationDuration = '2.2s';
      this.btn.style.background = 'radial-gradient(circle, #1a1a1a 0%, #0a0a0a 100%)';
      this.btn.style.boxShadow = '0 0 20px rgba(0,255,65,0.2), 0 0 40px rgba(0,255,65,0.1)';
    }
  },

  showTranscript(input, response) {
    let toast = document.getElementById('aura-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'aura-toast';
      toast.style.cssText = [
        'position:fixed', 'bottom:100px', 'left:50%', 'transform:translateX(-50%)',
        'max-width:340px', 'width:90%', 'z-index:9999',
        'background:rgba(10,10,10,0.95)', 'backdrop-filter:blur(20px)',
        'border:1px solid rgba(0,255,65,0.2)', 'border-radius:4px',
        'padding:16px', 'font-family:Space Grotesk,sans-serif',
        'transition:opacity 0.3s', 'pointer-events:none',
      ].join(';');
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <p style="font-size:10px;color:#666;text-transform:uppercase;letter-spacing:0.2em;margin-bottom:6px">YOU</p>
      <p style="font-size:13px;color:#fff;margin-bottom:10px">"${input}"</p>
      <p style="font-size:10px;color:#00FF41;text-transform:uppercase;letter-spacing:0.2em;margin-bottom:6px">AURA</p>
      <p style="font-size:13px;color:#b9ccb2">${response}</p>
    `;
    toast.style.opacity = '1';
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => toast.style.opacity = '0', 5000);
  },

  // ─── Inject UI ────────────────────────────────────────────────────────────
  inject() {
    // Styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes aura-magnetic-pulse {
        0%   { transform: scale(1);   opacity: 0.6; }
        50%  { transform: scale(1.7); opacity: 0; }
        100% { transform: scale(1);   opacity: 0; }
      }
      @keyframes aura-ring-2 {
        0%   { transform: scale(1);   opacity: 0.4; }
        50%  { transform: scale(2.2); opacity: 0; }
        100% { transform: scale(1);   opacity: 0; }
      }
      #aura-btn {
        position: fixed;
        bottom: 90px;
        right: 20px;
        z-index: 9998;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        border: 1px solid rgba(0,255,65,0.4);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s, box-shadow 0.3s, background 0.3s;
        background: radial-gradient(circle, #1a1a1a 0%, #0a0a0a 100%);
        box-shadow: 0 0 20px rgba(0,255,65,0.2), 0 0 40px rgba(0,255,65,0.1);
      }
      #aura-btn:active { transform: scale(0.93); }
      #aura-btn .aura-icon {
        font-family: 'Material Symbols Outlined';
        font-size: 24px;
        color: #00FF41;
        font-variation-settings: 'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        position: relative;
        z-index: 2;
        pointer-events: none;
      }
      .aura-pulse-ring {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 1px solid rgba(0,255,65,0.5);
        animation: aura-magnetic-pulse 2.2s ease-out infinite;
        pointer-events: none;
      }
      .aura-pulse-ring-2 {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 1px solid rgba(0,255,65,0.3);
        animation: aura-ring-2 2.2s ease-out infinite 0.5s;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);

    // Button
    const btn = document.createElement('button');
    btn.id = 'aura-btn';
    btn.setAttribute('aria-label', 'Aura Voice Agent');
    btn.innerHTML = `
      <div class="aura-pulse-ring"></div>
      <div class="aura-pulse-ring-2"></div>
      <span class="material-symbols-outlined aura-icon">mic</span>
    `;
    document.body.appendChild(btn);

    this.btn  = btn;
    this.ring = btn.querySelector('.aura-pulse-ring');
    btn.addEventListener('click', () => {
      this._ensureCtx(); // unlock + keep alive within user gesture
      this.startListening();
    });

    // Greet on aura page
    if (document.documentElement.dataset.page === 'aura') {
      setTimeout(() => {
        this._ensureCtx();
        const lang = this.currentLang();
        const greet = {
          pt: 'Aura online. Neural Core ativo. Aguardando seu comando.',
          en: 'Aura online. Neural Core active. Awaiting your command.',
        };
        this.speak(greet[lang], lang);
      }, 1200);
    }
  },

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.inject());
    } else {
      this.inject();
    }
    // Version badge — always visible
    const badge = document.createElement('div');
    badge.style.cssText = 'position:fixed;top:8px;right:8px;background:#00FF41;color:#000;font-size:10px;font-weight:bold;padding:2px 6px;border-radius:4px;z-index:99999';
    badge.textContent = 'v4';
    document.body ? document.body.appendChild(badge) : document.addEventListener('DOMContentLoaded', () => document.body.appendChild(badge));
    // Preload voices
    window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener?.('voiceschanged', () => {});
  },
};

AURA.init();
