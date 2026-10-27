/* =====================================================================
   MUSEU DIGITAL DE ALVORADA D’OESTE — INTERAÇÕES
   Este arquivo só LÊ os dados de data.js (window.MUSEU_DATA) e monta a
   página. Para trocar textos, fotos ou pontos do mapa, edite o data.js.

   Índice
   1. Utilitários
   2. Abertura cinematográfica
   3. Menu responsivo
   4. Linha do tempo
   5. Mapa histórico
   6. Antes × Depois
   7. Galeria e visualizador
   8. Sobre, referências e créditos
   9. Voltar ao topo e animações de entrada
   10. Inicialização
   ===================================================================== */
(function () {
  'use strict';

  // Avisa o script de segurança do index.html que o JavaScript carregou.
  window.__museuPronto = true;

  const DADOS = window.MUSEU_DATA || {};
  const mqReduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mqCelular = window.matchMedia('(max-width: 860px)');
  const reduzMovimento = () => mqReduzMovimento.matches;
  const comportamentoRolagem = () => (reduzMovimento() ? 'auto' : 'smooth');

  /* ------------------------------------------------------------------
     1. UTILITÁRIOS
     Todo texto vindo do data.js entra na página por textContent / nós de
     texto (nunca innerHTML), então não há risco de código injetado.
     ------------------------------------------------------------------ */
  const $ = (seletor, raiz) => (raiz || document).querySelector(seletor);
  const $$ = (seletor, raiz) => Array.from((raiz || document).querySelectorAll(seletor));

  /** Cria um elemento: el('p', {class:'x', text:'olá'}, filho1, [filho2, ...]) */
  function el(tag, atributos, ...filhos) {
    const no = document.createElement(tag);
    if (atributos) {
      for (const [chave, valor] of Object.entries(atributos)) {
        if (valor === false || valor == null) continue;
        if (chave === 'class') no.className = valor;
        else if (chave === 'text') no.textContent = valor;
        else if (chave.startsWith('on') && typeof valor === 'function') no.addEventListener(chave.slice(2), valor);
        else no.setAttribute(chave, valor === true ? '' : String(valor));
      }
    }
    // flat(Infinity): aceita listas dentro de listas (ex.: ['Fonte: ', [nó, nó]])
    for (const filho of filhos.flat(Infinity)) {
      if (filho == null || filho === false) continue;
      no.append(filho);
    }
    return no;
  }

  /** Troca todo o conteúdo de um elemento, ignorando valores vazios. */
  function preencher(container, ...filhos) {
    container.replaceChildren(...filhos.flat(Infinity).filter((f) => f != null && f !== false));
  }

  /** Reinicia uma animação CSS de entrada em um elemento. */
  function reanimar(elemento, classe) {
    elemento.classList.remove(classe);
    void elemento.offsetWidth; // força o navegador a recalcular
    elemento.classList.add(classe);
  }

  /** Só aceita links absolutos http(s) como fonte externa. */
  function urlSegura(url) {
    if (!url) return '';
    try {
      const u = new URL(url);
      return u.protocol === 'http:' || u.protocol === 'https:' ? u.href : '';
    } catch (e) {
      return '';
    }
  }

  /** Aceita caminhos relativos simples (documents/...) ou links http(s). */
  function caminhoSeguro(caminho) {
    if (!caminho) return '';
    if (/^https?:\/\//i.test(caminho)) return urlSegura(caminho);
    return /^[\w\-./%]+$/.test(caminho) && !caminho.includes('..') ? caminho : '';
  }

  /** Destaca trechos [ENTRE COLCHETES] como espaço reservado. */
  function textoComMarcadores(texto) {
    return String(texto == null ? '' : texto)
      .split(/(\[[^\]]+\])/g)
      .filter((parte) => parte !== '')
      .map((parte) => (/^\[[^\]]+\]$/.test(parte) ? el('span', { class: 'ph-txt', text: parte }) : document.createTextNode(parte)));
  }

  /** Quebra um texto em parágrafos (separados por linha em branco). */
  function paragrafos(texto) {
    return String(texto || '')
      .split(/\n\s*\n/)
      .filter((p) => p.trim() !== '')
      .map((p) => el('p', null, textoComMarcadores(p.trim())));
  }

  const ICONES = {
    foto: '<path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="9" cy="10" r="1.7"/><path d="M4 18l5-5 4 4 3-3 4 4"/>',
    documento: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
    lugar: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    evento: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    mapa: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>'
  };
  const ICONE_DA_CATEGORIA = { documentos: 'documento', fotos: 'foto', lugares: 'lugar', eventos: 'evento' };

  function iconeSvg(nome) {
    const modelo = document.createElement('template');
    modelo.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONES[nome] || ICONES.foto) + '</svg>';
    return modelo.content.firstElementChild;
  }

  /** Espaço reservado visual quando não há imagem (ou ela falhou ao carregar). */
  function espacoReservado(icone, rotulo) {
    const texto = rotulo || '[IMAGEM A INSERIR]';
    return el('div', { class: 'img-ph', role: 'img', 'aria-label': 'Espaço reservado: ' + texto }, iconeSvg(icone), el('span', { text: texto }));
  }

  /**
   * Cria uma imagem. Sem endereço, ou se o arquivo não carregar, mostra um
   * espaço reservado em vez de uma área quebrada.
   */
  function criarImagem(src, alt, opcoes) {
    const o = opcoes || {};
    if (!src) return espacoReservado(o.icone, o.rotulo);
    const img = document.createElement('img');
    img.alt = alt || '';
    img.decoding = 'async';
    if (!o.imediata) img.loading = 'lazy';
    if (o.classe) img.className = o.classe;
    img.draggable = false;
    img.addEventListener('error', () => {
      if (img.parentNode) img.replaceWith(espacoReservado(o.icone, o.rotulo));
    }, { once: true });
    img.src = src;
    return img;
  }

  function avisoPlaceholder(mensagem) {
    return el('p', { class: 'aviso-ph' },
      el('span', { class: 'aviso-ph-icone', 'aria-hidden': 'true', text: '!' }),
      el('span', null, el('strong', { text: 'Conteúdo em preparação. ' }), mensagem || 'Espaço reservado, não é um registro histórico verificado.'));
  }

  /** "Fonte: ..." com link quando houver; marca como pendente quando faltar. */
  function nosDaFonte(obj, textoSeVazio) {
    const url = urlSegura(obj && obj.fonteUrl);
    const fonte = obj && obj.fonte;
    if (!fonte) return ['Fonte: ', textoSeVazio || el('span', { class: 'pendente', text: '[PENDENTE — inserir fonte]' })];
    return ['Fonte: ', url ? el('a', { href: url, target: '_blank', rel: 'noopener noreferrer', text: fonte }) : textoComMarcadores(fonte)];
  }

  function nosDoCredito(credito, pendenteSeVazio) {
    if (credito) return ['Crédito: ', textoComMarcadores(credito)];
    return pendenteSeVazio ? ['Crédito: ', el('span', { class: 'pendente', text: '[PENDENTE]' })] : [];
  }

  /* ------------------------------------------------------------------
     2. ABERTURA CINEMATOGRÁFICA
     ------------------------------------------------------------------ */
  function iniciarAbertura() {
    const html = document.documentElement;
    const abertura = $('#abertura');
    const site = $('#site');
    const botao = $('#entrar');
    if (!abertura || !site || !botao || !html.classList.contains('com-abertura')) return;

    site.setAttribute('inert', ''); // enquanto a abertura está aberta, o resto da página fica inativo
    botao.focus({ preventScroll: true });

    let entrou = false;
    function concluir() {
      html.classList.remove('com-abertura');
      site.removeAttribute('inert');
      abertura.classList.remove('saindo');
      window.scrollTo(0, 0);
      const titulo = $('#hero-titulo');
      if (titulo) titulo.focus({ preventScroll: true });
    }
    botao.addEventListener('click', () => {
      if (entrou) return;
      entrou = true;
      abertura.classList.add('saindo');
      if (reduzMovimento()) concluir();
      else setTimeout(concluir, 720); // mesma duração da transição no CSS
    });
  }

  /* ------------------------------------------------------------------
     3. MENU RESPONSIVO
     ------------------------------------------------------------------ */
  function iniciarMenu() {
    const botao = $('#menu-btn');
    const menu = $('#menu');
    if (!botao || !menu) return;

    function definir(aberto) {
      menu.classList.toggle('aberto', aberto);
      botao.setAttribute('aria-expanded', String(aberto));
      botao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
      $('.menu-btn-icone', botao).textContent = aberto ? '✕' : '☰';
    }
    botao.addEventListener('click', () => definir(!menu.classList.contains('aberto')));
    // Ao escolher uma seção, o menu fecha SEM animação: se ele encolhesse devagar,
    // a página rolaria até a posição antiga da seção e passaria do ponto certo.
    menu.addEventListener('click', (e) => {
      if (!e.target.closest('a')) return;
      menu.classList.add('sem-transicao');
      definir(false);
      setTimeout(() => menu.classList.remove('sem-transicao'), 80);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('aberto')) { definir(false); botao.focus(); }
    });
    mqCelular.addEventListener('change', () => definir(false));
  }

  /* ------------------------------------------------------------------
     4. LINHA DO TEMPO
     ------------------------------------------------------------------ */
  const api = { irParaEvento: () => {} }; // preenchido pela linha do tempo, usado pelo mapa

  function iniciarLinhaDoTempo() {
    const eventos = DADOS.linhaDoTempo || [];
    const lista = $('#tl-lista');
    const painel = $('#tl-painel');
    if (!lista || !painel || eventos.length === 0) return;

    const corpo = $('#tl-corpo');
    const botaoAnterior = $('#tl-ant');
    const botaoProximo = $('#tl-prox');
    const contador = $('#tl-contador');
    const status = $('#tl-status');
    const total = eventos.length;
    let atual = -1;

    const abas = eventos.map((ev, i) => {
      const aba = el('button', {
        type: 'button', role: 'tab', class: 'tl-marco', id: 'tl-aba-' + i,
        'aria-selected': 'false', 'aria-controls': 'tl-painel', tabindex: '-1',
        onclick: () => selecionar(i, { anunciar: true, rolar: true })
      },
      el('span', { class: 'tl-ponto', 'aria-hidden': 'true' }),
      el('span', { class: 'tl-txt' },
        el('span', { class: 'tl-ano', text: ev.ano }),
        ev.status !== 'verificado' ? el('span', { class: 'tl-etiqueta', text: 'em preparação' }) : null));
      lista.append(aba);
      return aba;
    });

    function desenhar(ev) {
      const emPreparacao = ev.status !== 'verificado';
      $('#tl-aviso').hidden = !emPreparacao;
      $('#tl-data').textContent = ev.data || ev.ano;
      preencher($('#tl-titulo-ev'), textoComMarcadores(ev.titulo));
      preencher($('#tl-texto'), paragrafos(ev.texto));

      const legenda = ev.legenda
        ? textoComMarcadores(ev.legenda)
        : (emPreparacao ? el('span', { class: 'ph-txt', text: '[INSERIR LEGENDA]' }) : null);
      preencher($('#tl-figura'),
        el('div', { class: 'moldura' }, criarImagem(ev.imagem, ev.alt || ev.titulo, { icone: 'foto', rotulo: '[INSERIR FOTOGRAFIA OU ILUSTRAÇÃO]' })),
        el('figcaption', null, legenda, el('span', { class: 'cred' }, nosDoCredito(ev.credito, emPreparacao))));

      preencher($('#tl-fonte'), nosDaFonte(ev));
    }

    function selecionar(i, opcoes) {
      const o = opcoes || {};
      if (i < 0 || i >= total) return;
      atual = i;
      const ev = eventos[i];

      abas.forEach((aba, k) => {
        aba.setAttribute('aria-selected', String(k === i));
        aba.tabIndex = k === i ? 0 : -1;
      });
      painel.setAttribute('aria-labelledby', abas[i].id);
      desenhar(ev);
      reanimar(corpo, 'entra');

      botaoAnterior.setAttribute('aria-disabled', String(i === 0));
      botaoProximo.setAttribute('aria-disabled', String(i === total - 1));
      contador.textContent = (i + 1) + ' / ' + total;
      if (o.anunciar) status.textContent = 'Acontecimento ' + (i + 1) + ' de ' + total + ': ' + ev.ano + '.';
      if (o.foco) abas[i].focus();

      // No celular, o painel fica abaixo da trilha: leva a tela até ele.
      if (o.rolar && mqCelular.matches) {
        const topo = painel.getBoundingClientRect().top;
        if (topo < 0 || topo > window.innerHeight * 0.55) {
          painel.scrollIntoView({ behavior: comportamentoRolagem(), block: 'start' });
        }
      }
    }

    botaoAnterior.addEventListener('click', () => { if (atual > 0) selecionar(atual - 1, { anunciar: true }); });
    botaoProximo.addEventListener('click', () => { if (atual < total - 1) selecionar(atual + 1, { anunciar: true }); });

    // Teclado na trilha: setas, Home e End.
    lista.addEventListener('keydown', (e) => {
      let alvo = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') alvo = atual + 1;
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') alvo = atual - 1;
      else if (e.key === 'Home') alvo = 0;
      else if (e.key === 'End') alvo = total - 1;
      if (alvo === null) return;
      e.preventDefault();
      if (alvo >= 0 && alvo < total) selecionar(alvo, { foco: true, anunciar: true });
    });

    api.irParaEvento = function (id) {
      const i = eventos.findIndex((ev) => ev.id === id);
      if (i < 0) return;
      selecionar(i, { anunciar: true });
      $('#linha-do-tempo').scrollIntoView({ behavior: comportamentoRolagem(), block: 'start' });
    };

    selecionar(0);
  }

  /* ------------------------------------------------------------------
     5. MAPA HISTÓRICO
     ------------------------------------------------------------------ */
  function iniciarMapa() {
    const cfg = DADOS.mapa;
    const area = $('#mapa-area');
    const info = $('#mapa-info');
    if (!cfg || !area || !info) return;

    const pontos = cfg.pontos || [];
    $('#mapa-selo').hidden = !cfg.demonstrativo;

    area.insertBefore(
      criarImagem(cfg.imagem, cfg.alt, { classe: 'mapa-img', icone: 'mapa', rotulo: '[INSERIR IMAGEM DO MAPA]', imediata: true }),
      area.firstChild);

    const tiposDeLegenda = ['ponto', 'ativo', 'espaco'];
    preencher($('#mapa-legenda'), (cfg.legenda || []).map((item) =>
      el('li', null,
        el('span', { class: 'leg-simbolo ' + (tiposDeLegenda.includes(item.tipo) ? item.tipo : 'ponto'), 'aria-hidden': 'true' }),
        item.texto)));

    function estadoVazio() {
      preencher(info, el('p', { class: 'vazio', text: 'Selecione um ponto numerado no mapa para ver aqui o local, a descrição e a fonte.' }));
    }

    const botoes = pontos.map((p, i) => {
      const x = Math.min(100, Math.max(0, Number(p.x) || 0));
      const y = Math.min(100, Math.max(0, Number(p.y) || 0));
      const botao = el('button', {
        type: 'button', class: 'marcador' + (p.status === 'verificado' ? ' verificado' : ''),
        style: 'left:' + x + '%;top:' + y + '%;--atraso:' + (i * 0.45) + 's',
        'aria-pressed': 'false', 'aria-controls': 'mapa-info',
        'aria-label': 'Ponto ' + (i + 1) + ': ' + p.nome,
        onclick: () => selecionar(i)
      }, String(i + 1));
      area.append(botao);
      return botao;
    });

    function selecionar(i) {
      const p = pontos[i];
      const emPreparacao = p.status !== 'verificado';
      botoes.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));

      const indiceEvento = (DADOS.linhaDoTempo || []).findIndex((ev) => ev.id === p.eventoId);
      const evento = indiceEvento >= 0 ? DADOS.linhaDoTempo[indiceEvento] : null;

      preencher(info,
        emPreparacao ? avisoPlaceholder() : null,
        p.periodo
          ? el('p', { class: 'periodo', text: p.periodo })
          : (emPreparacao ? el('p', { class: 'periodo' }, el('span', { class: 'ph-txt', text: '[INSERIR DATA OU PERÍODO]' })) : null),
        el('h3', null, textoComMarcadores(p.nome)),
        paragrafos(p.descricao),
        (p.imagem || emPreparacao)
          ? el('div', { class: 'moldura' }, criarImagem(p.imagem, p.alt || p.nome, { icone: 'lugar', rotulo: '[INSERIR FOTOGRAFIA DO LOCAL]' }))
          : null,
        el('p', { class: 'credito' }, nosDoCredito(p.credito, emPreparacao)),
        el('p', { class: 'fonte' }, nosDaFonte(p)),
        evento ? el('button', {
          type: 'button', class: 'btn btn-sec link-evento',
          onclick: () => api.irParaEvento(evento.id)
        }, 'Ver na linha do tempo: ' + evento.ano) : null);
      reanimar(info, 'entra');
    }

    estadoVazio();
  }

  /* ------------------------------------------------------------------
     6. ANTES × DEPOIS
     ------------------------------------------------------------------ */
  function iniciarComparador() {
    const pares = DADOS.antesDepois || [];
    const comp = $('#comp');
    const alca = $('#comp-alca');
    if (pares.length === 0 || !comp || !alca) return;

    const MIN = 5;
    const MAX = 95;
    let posicao = 50;
    let arrastando = false;

    function definirPosicao(valor) {
      posicao = Math.min(MAX, Math.max(MIN, valor));
      comp.style.setProperty('--pos', posicao + '%');
      const p = Math.round(posicao);
      alca.setAttribute('aria-valuenow', String(p));
      alca.setAttribute('aria-valuetext', 'Imagem de antes visível em ' + p + '% da largura');
    }

    function cartaoLegenda(titulo, lado, demonstrativo) {
      return el('div', { class: 'comp-leg' },
        el('h3', { text: titulo }),
        el('p', null, 'Período: ', textoComMarcadores(lado.periodo || '[INSERIR PERÍODO]')),
        el('p', null, nosDoCredito(lado.credito, true)),
        el('p', { class: 'fonte' },
          nosDaFonte(lado, demonstrativo ? 'não se aplica — ilustração demonstrativa, não é registro histórico.' : null)));
    }

    function mostrarPar(i) {
      const par = pares[i];
      preencher($('#comp-antes'), criarImagem(par.antes.imagem, par.antes.alt, { icone: 'foto', rotulo: '[INSERIR IMAGEM “ANTES”]', imediata: true }));
      preencher($('#comp-depois'), criarImagem(par.depois.imagem, par.depois.alt, { icone: 'foto', rotulo: '[INSERIR IMAGEM “DEPOIS”]', imediata: true }));
      $('#comp-rot-antes').textContent = 'Antes' + (par.antes.periodo ? ' · ' + par.antes.periodo : '');
      $('#comp-rot-depois').textContent = 'Depois' + (par.depois.periodo ? ' · ' + par.depois.periodo : '');
      $('#comp-selo').hidden = !par.demonstrativo;
      preencher($('#comp-local'), 'Local: ', textoComMarcadores(par.local || '[INSERIR NOME DO LOCAL]'));
      preencher($('#comp-legendas'),
        cartaoLegenda('Antes', par.antes, par.demonstrativo),
        cartaoLegenda('Depois', par.depois, par.demonstrativo));
      $$('button', $('#comp-seletor')).forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
      definirPosicao(50);
    }

    // Seletor só aparece se houver mais de uma comparação.
    if (pares.length > 1) {
      const seletor = $('#comp-seletor');
      seletor.hidden = false;
      pares.forEach((par, i) => {
        seletor.append(el('button', { type: 'button', 'aria-pressed': 'false', onclick: () => mostrarPar(i) }, par.local || 'Comparação ' + (i + 1)));
      });
    }

    // Mouse e toque (Pointer Events). touch-action: pan-y no CSS deixa a página rolar na vertical.
    const pontoDoPonteiro = (e) => {
      const r = comp.getBoundingClientRect();
      return ((e.clientX - r.left) / r.width) * 100;
    };
    comp.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      arrastando = true;
      comp.setPointerCapture(e.pointerId);
      comp.classList.add('arrastando');
      definirPosicao(pontoDoPonteiro(e));
      alca.focus({ preventScroll: true });
    });
    comp.addEventListener('pointermove', (e) => { if (arrastando) definirPosicao(pontoDoPonteiro(e)); });
    const soltar = () => { arrastando = false; comp.classList.remove('arrastando'); };
    comp.addEventListener('pointerup', soltar);
    comp.addEventListener('pointercancel', soltar);
    comp.addEventListener('lostpointercapture', soltar);

    // Teclado: setas ajustam, Shift acelera, Home/End vão às pontas.
    alca.addEventListener('keydown', (e) => {
      const passo = e.shiftKey ? 10 : 2;
      let novo = null;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') novo = posicao - passo;
      else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') novo = posicao + passo;
      else if (e.key === 'PageDown') novo = posicao - 10;
      else if (e.key === 'PageUp') novo = posicao + 10;
      else if (e.key === 'Home') novo = MIN;
      else if (e.key === 'End') novo = MAX;
      if (novo === null) return;
      e.preventDefault();
      definirPosicao(novo);
    });

    mostrarPar(0);
  }

  /* ------------------------------------------------------------------
     7. GALERIA E VISUALIZADOR
     ------------------------------------------------------------------ */
  function iniciarGaleria() {
    const cfg = DADOS.galeria;
    const grade = $('#gal-grade');
    const filtros = $('#gal-filtros');
    const status = $('#gal-status');
    const vis = $('#visualizador');
    if (!cfg || !grade || !filtros || !vis) return;

    const categorias = cfg.categorias || [];
    const itens = cfg.itens || [];
    const nomeDaCategoria = (id) => (categorias.find((c) => c.id === id) || {}).nome || id;
    let filtro = 'todos';
    let visiveis = [];
    let indice = 0;
    let ultimoFoco = null;

    const filtrados = () => (filtro === 'todos' ? itens : itens.filter((it) => it.categoria === filtro));

    // --- filtros
    const opcoes = [{ id: 'todos', nome: 'Todos' }].concat(categorias);
    opcoes.forEach((c) => {
      filtros.append(el('button', {
        type: 'button', class: 'filtro', 'data-filtro': c.id, 'aria-pressed': String(c.id === filtro),
        onclick: () => {
          filtro = c.id;
          $$('.filtro', filtros).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtro === filtro)));
          desenharGrade();
        }
      }, c.nome));
    });

    // --- grade
    function desenharGrade() {
      visiveis = filtrados();
      preencher(grade, visiveis.map((item, i) =>
        el('li', { class: 'gal-item', style: '--i:' + i },
          el('button', { type: 'button', class: 'gal-cartao', 'data-id': item.id, onclick: () => abrir(item.id) },
            el('div', { class: 'gal-thumb' },
              criarImagem(item.imagem, item.alt || item.titulo, { icone: ICONE_DA_CATEGORIA[item.categoria], rotulo: '[IMAGEM A INSERIR]' })),
            el('div', { class: 'gal-info' },
              el('span', { class: 'chip' + (item.status !== 'verificado' ? ' chip-ph' : ''), text: nomeDaCategoria(item.categoria) + (item.status !== 'verificado' ? ' · em preparação' : '') }),
              el('h3', null, textoComMarcadores(item.titulo)),
              el('p', null, textoComMarcadores(item.resumo || '')))))));
      const n = visiveis.length;
      status.textContent = n + (n === 1 ? ' item' : ' itens') + (filtro === 'todos' ? '' : ' em “' + nomeDaCategoria(filtro) + '”') + '.';
    }

    // --- visualizador ampliado
    const midia = $('#vis-midia');
    const botaoZoom = $('#vis-zoom');
    const botaoAnterior = $('#vis-ant');
    const botaoProximo = $('#vis-prox');

    function linhaMeta(dl, rotulo, valor, pendenteSeVazio) {
      if (valor) dl.append(el('dt', { text: rotulo }), el('dd', null, textoComMarcadores(valor)));
      else if (pendenteSeVazio) dl.append(el('dt', { text: rotulo }), el('dd', { class: 'pendente', text: '[PENDENTE]' }));
    }

    function mostrar() {
      const item = visiveis[indice];
      const emPreparacao = item.status !== 'verificado';

      midia.classList.remove('ampliada');
      botaoZoom.setAttribute('aria-pressed', 'false');
      botaoZoom.textContent = 'Ampliar imagem';
      botaoZoom.hidden = !item.imagem;
      preencher(midia, criarImagem(item.imagem, item.alt || item.titulo, { icone: ICONE_DA_CATEGORIA[item.categoria], rotulo: '[IMAGEM OU DOCUMENTO A INSERIR]', imediata: true }));
      midia.scrollTo(0, 0);

      $('#vis-aviso').hidden = !emPreparacao;
      $('#vis-cat').textContent = nomeDaCategoria(item.categoria);
      preencher($('#vis-titulo'), textoComMarcadores(item.titulo));
      preencher($('#vis-desc'), paragrafos(item.descricao));

      const meta = $('#vis-meta');
      meta.replaceChildren();
      linhaMeta(meta, 'Data', item.data, emPreparacao);
      linhaMeta(meta, 'Autor ou responsável', item.autor, emPreparacao);
      linhaMeta(meta, 'Crédito', item.credito, emPreparacao);

      preencher($('#vis-fonte'), nosDaFonte(item));
      const arquivo = caminhoSeguro(item.arquivo);
      preencher($('#vis-arquivo'), arquivo ? el('a', { href: arquivo, target: '_blank', rel: 'noopener noreferrer', text: 'Abrir o arquivo do documento' }) : null);

      botaoAnterior.setAttribute('aria-disabled', String(indice === 0));
      botaoProximo.setAttribute('aria-disabled', String(indice === visiveis.length - 1));
    }

    function abrir(id) {
      const i = visiveis.findIndex((it) => it.id === id);
      if (i < 0) return;
      indice = i;
      ultimoFoco = document.activeElement;
      mostrar();
      if (!vis.open) {
        if (typeof vis.showModal === 'function') vis.showModal();
        else vis.setAttribute('open', '');
        document.body.classList.add('travado');
      }
    }

    function fechar() {
      if (typeof vis.close === 'function') vis.close();
      else vis.removeAttribute('open');
      aoFechar();
    }

    function aoFechar() {
      document.body.classList.remove('travado');
      const item = visiveis[indice];
      const cartao = item && $('.gal-cartao[data-id="' + item.id + '"]', grade);
      const alvo = cartao || ultimoFoco;
      if (alvo && alvo.focus) alvo.focus({ preventScroll: true });
    }

    $('#vis-fechar').addEventListener('click', fechar);
    vis.addEventListener('close', aoFechar);
    vis.addEventListener('click', (e) => { if (e.target === vis) fechar(); }); // clique fora fecha

    botaoAnterior.addEventListener('click', () => { if (indice > 0) { indice--; mostrar(); } });
    botaoProximo.addEventListener('click', () => { if (indice < visiveis.length - 1) { indice++; mostrar(); } });
    vis.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && indice > 0) { indice--; mostrar(); }
      else if (e.key === 'ArrowRight' && indice < visiveis.length - 1) { indice++; mostrar(); }
    });

    botaoZoom.addEventListener('click', () => {
      if (!midia.querySelector('img')) return;
      const ativa = midia.classList.toggle('ampliada');
      botaoZoom.setAttribute('aria-pressed', String(ativa));
      botaoZoom.textContent = ativa ? 'Reduzir imagem' : 'Ampliar imagem';
    });

    desenharGrade();
  }

  /* ------------------------------------------------------------------
     8. SOBRE, REFERÊNCIAS E CRÉDITOS
     ------------------------------------------------------------------ */
  function iniciarSobre() {
    const sobre = DADOS.sobre;
    if (!sobre) return;

    preencher($('#sobre-texto'), (sobre.paragrafos || []).map((p) => el('p', null, textoComMarcadores(p))));
    preencher($('#sobre-metodo'), textoComMarcadores(sobre.metodo || '[INSERIR DESCRIÇÃO DO MÉTODO DE PESQUISA]'));

    const marcaPendente = (item) => (item.status === 'pendente' ? [' ', el('span', { class: 'chip chip-ph', text: 'pendente' })] : null);

    preencher($('#sobre-refs'), (sobre.referencias || []).map((r) => {
      const url = urlSegura(r.url);
      return el('li', null,
        url ? el('a', { href: url, target: '_blank', rel: 'noopener noreferrer' }, textoComMarcadores(r.titulo)) : textoComMarcadores(r.titulo),
        r.detalhe ? [' — ', textoComMarcadores(r.detalhe)] : null,
        marcaPendente(r));
    }));
    preencher($('#sobre-creds'), (sobre.creditos || []).map((c) =>
      el('li', null, textoComMarcadores(c.item), ' — ', textoComMarcadores(c.credito), marcaPendente(c))));
    preencher($('#sobre-agrs'), (sobre.agradecimentos || []).map((a) =>
      el('li', null, textoComMarcadores(a.nome), marcaPendente(a))));
  }

  /* ------------------------------------------------------------------
     9. VOLTAR AO TOPO E ANIMAÇÕES DE ENTRADA
     ------------------------------------------------------------------ */
  function iniciarVoltarAoTopo() {
    const botao = $('#voltar-topo');
    if (!botao) return;
    let aguardando = false;
    const atualizar = () => { botao.classList.toggle('visivel', window.scrollY > 500); aguardando = false; };
    window.addEventListener('scroll', () => {
      if (!aguardando) { aguardando = true; requestAnimationFrame(atualizar); }
    }, { passive: true });
    botao.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: comportamentoRolagem() });
      const topo = $('#topo');
      setTimeout(() => { if (topo) topo.focus({ preventScroll: true }); }, reduzMovimento() ? 0 : 500);
    });
    atualizar();
  }

  function iniciarEntradaAoRolar() {
    // Sem IntersectionObserver, nada é escondido: o conteúdo continua visível.
    if (!('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('anim');
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' });
    $$('.reveal').forEach((alvo) => observador.observe(alvo));
  }

  /* ------------------------------------------------------------------
     10. INICIALIZAÇÃO
     Cada módulo é isolado: se um falhar, os outros continuam funcionando.
     ------------------------------------------------------------------ */
  function tentar(nome, funcao) {
    try { funcao(); } catch (erro) { console.error('[Museu] Erro em "' + nome + '":', erro); }
  }

  if (!window.MUSEU_DATA) console.error('[Museu] data.js não foi carregado: as seções de conteúdo ficarão vazias.');

  tentar('abertura', iniciarAbertura);
  tentar('menu', iniciarMenu);
  tentar('linha do tempo', iniciarLinhaDoTempo);
  tentar('mapa', iniciarMapa);
  tentar('antes e depois', iniciarComparador);
  tentar('galeria', iniciarGaleria);
  tentar('sobre', iniciarSobre);
  tentar('voltar ao topo', iniciarVoltarAoTopo);
  tentar('animações de entrada', iniciarEntradaAoRolar);

  const ano = $('#ano-atual');
  if (ano) ano.textContent = String(new Date().getFullYear());
})();
