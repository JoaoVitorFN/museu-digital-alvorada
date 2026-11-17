/* =====================================================================
   MUSEU DIGITAL DE ALVORADA D’OESTE — INTERAÇÕES
   Este arquivo só LÊ os dados de data.js (window.MUSEU_DATA) e monta a
   página. Para acrescentar ou corrigir conteúdo, edite o data.js.

   Regra de exibição: cada seção só mostra o que tem conteúdo. Campo
   vazio não aparece e seção sem conteúdo fica reduzida ao título.

   Índice
   1. Utilitários
   2. Acervo (fotografias e documentos compartilhados entre as seções)
   3. Abertura cinematográfica
   4. Menu responsivo
   5. Linha do tempo
   6. Mapa histórico
   7. Antes × Depois
   8. Galeria e visualizador
   9. Sobre, referências e créditos
   10. Voltar ao topo e animações de entrada
   11. Inicialização
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

  /** Como preencher(), mas esconde o elemento quando não sobra nada. */
  function preencherOuOcultar(container, ...filhos) {
    preencher(container, ...filhos);
    container.hidden = container.childNodes.length === 0;
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

  /** Quebra um texto em parágrafos (separados por linha em branco). */
  function paragrafos(texto) {
    return String(texto || '')
      .split(/\n\s*\n/)
      .filter((p) => p.trim() !== '')
      .map((p) => el('p', null, p.trim()));
  }

  /** "Fonte: ..." (com link quando houver). Sem fonte, não devolve nada. */
  function nosDaFonte(obj) {
    if (!obj || !obj.fonte) return null;
    const url = urlSegura(obj.fonteUrl);
    return ['Fonte: ', url ? el('a', { href: url, target: '_blank', rel: 'noopener noreferrer', text: obj.fonte }) : obj.fonte];
  }

  /** Várias fontes ("fontes": [{fonte, fonteUrl}]) ou uma só ("fonte"). */
  function nosDasFontes(obj) {
    if (!obj) return null;
    if (Array.isArray(obj.fontes) && obj.fontes.length) {
      const nos = [];
      obj.fontes.filter((f) => f && f.fonte).forEach((f, i) => {
        if (i) nos.push(' · ');
        const url = urlSegura(f.fonteUrl);
        nos.push(url ? el('a', { href: url, target: '_blank', rel: 'noopener noreferrer', text: f.fonte }) : f.fonte);
      });
      return nos.length ? [obj.fontes.length > 1 ? 'Fontes: ' : 'Fonte: ', nos] : null;
    }
    return nosDaFonte(obj);
  }

  /** "Crédito: ...". Sem crédito, não devolve nada. */
  const nosDoCredito = (credito) => (credito ? ['Crédito: ', credito] : null);

  /** Junta partes não vazias separando-as por " · ". */
  function juntarPartes(...partes) {
    const nos = [];
    partes.filter(Boolean).forEach((parte, i) => {
      if (i) nos.push(' · ');
      nos.push(parte);
    });
    return nos;
  }

  /** Marca uma seção sem conteúdo: fica só o título, sem espaço sobrando. */
  function secaoSemConteudo(id) {
    const secao = document.getElementById(id);
    if (secao) secao.classList.add('sem-conteudo');
  }

  const ICONES = {
    foto: '<path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="9" cy="10" r="1.7"/><path d="M4 18l5-5 4 4 3-3 4 4"/>',
    documento: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>'
  };

  function iconeSvg(nome) {
    const modelo = document.createElement('template');
    modelo.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONES[nome] || ICONES.foto) + '</svg>';
    return modelo.content.firstElementChild;
  }

  /** Capa discreta (só um ícone) para um documento que não tem imagem de prévia. */
  function capaSemImagem(tipo) {
    return el('div', { class: 'capa', 'aria-hidden': 'true' }, iconeSvg(tipo === 'documento' ? 'documento' : 'foto'));
  }

  /**
   * Cria uma imagem. Se o arquivo não carregar, chama opcoes.aoErro(img);
   * sem essa função, a imagem simplesmente é retirada (nunca fica um ícone quebrado).
   */
  function criarImagem(src, alt, opcoes) {
    const o = opcoes || {};
    const img = document.createElement('img');
    img.alt = alt || '';
    img.decoding = 'async';
    if (!o.imediata) img.loading = 'lazy';
    if (o.classe) img.className = o.classe;
    img.draggable = false;
    img.addEventListener('error', () => { if (o.aoErro) o.aoErro(img); else img.remove(); }, { once: true });
    if (o.aoCarregar) img.addEventListener('load', () => o.aoCarregar(img), { once: true });
    img.src = src;
    return img;
  }

  /* ------------------------------------------------------------------
     2. ACERVO
     Fotografias e documentos são cadastrados uma vez em data.js (acervo)
     e usados pela galeria, pela linha do tempo, pelo mapa e pelo
     Antes × Depois através do id.
     ------------------------------------------------------------------ */
  const TIPOS = [
    { id: 'fotografia', nome: 'Fotografias', singular: 'Fotografia' },
    { id: 'documento', nome: 'Documentos', singular: 'Documento' }
  ];
  const tipoDe = (item) => TIPOS.find((t) => t.id === item.tipo) || TIPOS[0];

  const ACERVO = (Array.isArray(DADOS.acervo) ? DADOS.acervo : [])
    .filter((it) => it && it.id && it.titulo)
    .map((it) => Object.assign({}, it, { tipo: tipoDe(it).id }));
  const ACERVO_POR_ID = new Map(ACERVO.map((it) => [it.id, it]));

  const midiaDe = (ids) => (Array.isArray(ids) ? ids : []).map((id) => ACERVO_POR_ID.get(id)).filter(Boolean);
  const periodoDe = (item) => item.data || item.ano || '';

  // Funções que dependem de outros módulos (preenchidas mais abaixo).
  const api = { irParaEvento: () => {}, abrirAcervo: () => {} };

  /**
   * Monta a mídia ligada a um evento ou ponto do mapa: fotografias viram
   * figuras que abrem ampliadas ao clicar; documentos sem imagem viram botões.
   */
  function nosDeMidia(itens) {
    const figuras = [];
    const documentos = [];
    itens.forEach((item) => {
      if (item.imagem) {
        figuras.push(el('figure', { class: 'fig' },
          el('button', {
            type: 'button', class: 'moldura moldura-botao', 'aria-label': 'Ampliar: ' + item.titulo,
            onclick: () => api.abrirAcervo(item.id, itens)
          }, criarImagem(item.imagem, item.alt || item.titulo, {
            aoErro: (img) => {
              const fig = img.closest('.fig');
              const corpo = fig && fig.closest('.tl-corpo');
              if (fig) fig.remove();
              if (corpo && !corpo.querySelector('.fig')) corpo.classList.remove('com-midia');
            }
          })),
          el('figcaption', null,
            el('span', { class: 'fig-titulo', text: item.titulo }),
            periodoDe(item) || item.local ? el('span', { class: 'fig-meta', text: [periodoDe(item), item.local].filter(Boolean).join(' · ') }) : null,
            item.credito ? el('span', { class: 'cred' }, nosDoCredito(item.credito)) : null,
            item.fonte ? el('span', { class: 'cred' }, nosDaFonte(item)) : null)));
      } else {
        documentos.push(el('button', {
          type: 'button', class: 'btn btn-sec btn-doc',
          onclick: () => api.abrirAcervo(item.id, itens)
        }, 'Ver documento: ' + item.titulo));
      }
    });
    return [figuras, documentos.length ? el('div', { class: 'docs-rel' }, documentos) : null];
  }

  /* ------------------------------------------------------------------
     3. ABERTURA CINEMATOGRÁFICA
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
     4. MENU RESPONSIVO
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
     5. LINHA DO TEMPO
     Os eventos são ordenados pelo ano (ou por  ordem , quando o rótulo de ano não é um número, como “Anos 1980–90”); empates seguem a ordem de data.js.
     ------------------------------------------------------------------ */
  function ordenarEventos(lista) {
    const chave = (ev) => {
      const n = typeof ev.ordem === 'number' ? ev.ordem : parseInt(ev.ano, 10);
      return Number.isNaN(n) ? Infinity : n;
    };
    return lista
      .filter((ev) => ev && ev.id && ev.ano && ev.titulo)
      .map((ev, posicao) => ({ ev, posicao }))
      .sort((a, b) => {
        const ka = chave(a.ev);
        const kb = chave(b.ev);
        if (ka !== kb) return ka < kb ? -1 : 1;
        return a.posicao - b.posicao;
      })
      .map((x) => x.ev);
  }

  const EVENTOS = ordenarEventos(Array.isArray(DADOS.linhaDoTempo) ? DADOS.linhaDoTempo : []);

  function iniciarLinhaDoTempo() {
    const lista = $('#tl-lista');
    const painel = $('#tl-painel');
    if (!lista || !painel) return;
    if (EVENTOS.length === 0) {
      $('.tl').hidden = true;
      secaoSemConteudo('linha-do-tempo');
      return;
    }

    const corpo = $('#tl-corpo');
    const botaoAnterior = $('#tl-ant');
    const botaoProximo = $('#tl-prox');
    const contador = $('#tl-contador');
    const status = $('#tl-status');
    const total = EVENTOS.length;
    let atual = -1;

    const abas = EVENTOS.map((ev, i) => {
      const aba = el('button', {
        type: 'button', role: 'tab', class: 'tl-marco' + (ev.destaque ? ' destaque' : ''), id: 'tl-aba-' + i,
        'aria-selected': 'false', 'aria-controls': 'tl-painel', tabindex: '-1',
        onclick: () => selecionar(i, { anunciar: true, rolar: true })
      },
      el('span', { class: 'tl-ponto', 'aria-hidden': 'true' }),
      el('span', { class: 'tl-txt' },
        el('span', { class: 'tl-ano', text: ev.ano }),
        ev.rotulo ? el('span', { class: 'tl-rotulo', text: ev.rotulo }) : null,
        ev.destaque ? el('span', { class: 'tl-selo', text: 'Marco principal' }) : null));
      lista.append(aba);
      return aba;
    });

    function desenhar(ev) {
      const itens = midiaDe(ev.midia);
      $('#tl-data').textContent = [ev.data || ev.ano, ev.aproximado ? 'data aproximada' : '', ev.local].filter(Boolean).join(' · ');
      $('#tl-titulo-ev').textContent = ev.titulo;
      preencher($('#tl-texto'), paragrafos(ev.texto),
        ev.verificar ? el('p', { class: 'tl-verificar' }, el('strong', { text: 'A verificar: ' }), ev.verificar) : null);
      preencherOuOcultar($('#tl-midia'), nosDeMidia(itens));
      corpo.classList.toggle('com-midia', itens.some((it) => it.imagem));
      preencherOuOcultar($('#tl-fonte'), nosDasFontes(ev));
    }

    function selecionar(i, opcoes) {
      const o = opcoes || {};
      if (i < 0 || i >= total) return;
      atual = i;
      const ev = EVENTOS[i];

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
      if (o.anunciar) status.textContent = 'Acontecimento ' + (i + 1) + ' de ' + total + ': ' + ev.ano + (ev.rotulo ? ', ' + ev.rotulo : '') + '.';
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
      const i = EVENTOS.findIndex((ev) => ev.id === id);
      if (i < 0) return;
      selecionar(i, { anunciar: true });
      $('#linha-do-tempo').scrollIntoView({ behavior: comportamentoRolagem(), block: 'start' });
    };

    selecionar(0);
  }

  /* ------------------------------------------------------------------
     6. MAPA HISTÓRICO
     Sem imagem de mapa em data.js, a seção mostra só o título.
     ------------------------------------------------------------------ */
  function iniciarMapa() {
    const cfg = DADOS.mapa || {};
    const conteudo = $('#mapa-conteudo');
    const layout = $('#mapa-layout');
    const area = $('#mapa-area');
    const info = $('#mapa-info');
    if (!conteudo || !layout || !area || !info) return;

    const semMapa = () => { conteudo.hidden = true; secaoSemConteudo('mapa-historico'); };
    if (!cfg.imagem) { semMapa(); return; }

    const pontos = (Array.isArray(cfg.pontos) ? cfg.pontos : [])
      .filter((p) => p && p.nome && Number.isFinite(parseFloat(p.x)) && Number.isFinite(parseFloat(p.y)));

    area.prepend(criarImagem(cfg.imagem, cfg.alt || 'Mapa de Alvorada d’Oeste', { classe: 'mapa-img', imediata: true, aoErro: semMapa }));
    conteudo.hidden = false;

    preencherOuOcultar($('#mapa-fonte'), juntarPartes(nosDoCredito(cfg.credito), nosDaFonte(cfg)));

    // Sem pontos cadastrados: só o mapa, em largura total.
    if (pontos.length === 0) {
      layout.classList.add('sem-info');
      info.hidden = true;
      return;
    }

    $('#mapa-dica').hidden = false;
    preencherOuOcultar($('#mapa-legenda'),
      el('li', null, el('span', { class: 'leg-simbolo', 'aria-hidden': 'true' }), 'Ponto de interesse'),
      el('li', null, el('span', { class: 'leg-simbolo ativo', 'aria-hidden': 'true' }), 'Ponto selecionado'));

    const botoes = pontos.map((p, i) => {
      const x = Math.min(100, Math.max(0, parseFloat(p.x)));
      const y = Math.min(100, Math.max(0, parseFloat(p.y)));
      const botao = el('button', {
        type: 'button', class: 'marcador',
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
      botoes.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
      const evento = EVENTOS.find((ev) => ev.id === p.eventoId);
      const itens = midiaDe(p.midia);

      preencher(info,
        p.periodo ? el('p', { class: 'periodo', text: p.periodo }) : null,
        el('h3', { text: p.nome }),
        paragrafos(p.descricao),
        itens.length ? el('div', { class: 'info-midia' }, nosDeMidia(itens)) : null,
        p.fonte ? el('p', { class: 'fonte' }, nosDaFonte(p)) : null,
        evento ? el('button', {
          type: 'button', class: 'btn btn-sec link-evento',
          onclick: () => api.irParaEvento(evento.id)
        }, 'Ver na linha do tempo: ' + evento.ano) : null);
      reanimar(info, 'entra');
    }

    preencher(info, el('p', { class: 'vazio', text: 'Selecione um ponto numerado no mapa para ver aqui o local, a descrição e a fonte.' }));
  }

  /* ------------------------------------------------------------------
     7. ANTES × DEPOIS
     Cada comparação usa duas fotografias do acervo (campos antes/depois).
     Sem comparações válidas, a seção mostra só o título.
     ------------------------------------------------------------------ */
  function iniciarComparador() {
    const bloco = $('#comp-bloco');
    const comp = $('#comp');
    const alca = $('#comp-alca');
    if (!bloco || !comp || !alca) return;

    const pares = (Array.isArray(DADOS.antesDepois) ? DADOS.antesDepois : []).map((par) => {
      const antes = par && ACERVO_POR_ID.get(par.antes);
      const depois = par && ACERVO_POR_ID.get(par.depois);
      if (!antes || !depois || !antes.imagem || !depois.imagem) return null;
      return { local: par.local || antes.local || depois.local || '', titulo: par.titulo || '', intervalo: par.intervalo || '', creditos: Array.isArray(par.creditos) ? par.creditos.filter((c) => c && c.texto) : [], observacao: par.observacao || '', descricao: par.descricao || '', dados: par.dados || null, antes, depois };
    }).filter(Boolean);

    if (pares.length === 0) { bloco.hidden = true; secaoSemConteudo('antes-depois'); return; }
    bloco.hidden = false;

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

    // O comparador assume a proporção da fotografia (evita cortar ou esticar).
    function ajustarProporcao(img) {
      if (img.naturalWidth && img.naturalHeight) comp.style.setProperty('--razao', String(img.naturalWidth / img.naturalHeight));
    }

    function cartaoLegenda(rotulo, item) {
      const periodo = periodoDe(item);
      return el('div', { class: 'comp-leg' },
        el('h3', { text: rotulo + (periodo ? ' · ' + periodo : '') }),
        el('p', { class: 'comp-leg-titulo', text: item.titulo }),
        paragrafos(item.descricao),
        item.credito ? el('p', null, nosDoCredito(item.credito)) : null,
        item.fonte ? el('p', { class: 'fonte' }, nosDaFonte(item)) : null);
    }

    /** Bloco discreto e recolhível com tabela de dados, notas e fontes (links). */
    function desenharDados(d) {
      const caixa = $('#comp-dados');
      const linhas = d && Array.isArray(d.tabela) ? d.tabela.filter((l) => l && l.ano) : [];
      const notas = d && Array.isArray(d.notas) ? d.notas.filter(Boolean) : [];
      const fontes = d && Array.isArray(d.fontes) ? d.fontes.filter((f) => f && f.titulo) : [];
      if (!linhas.length && !notas.length && !fontes.length) { caixa.hidden = true; preencher(caixa); return; }
      caixa.hidden = false;
      preencher(caixa,
        el('summary', { text: d.titulo || 'Dados e fontes' }),
        linhas.length ? el('table', { class: 'comp-tabela' },
          el('caption', { text: 'População de Alvorada d’Oeste' }),
          el('thead', null, el('tr', null,
            el('th', { scope: 'col', text: 'Ano' }),
            el('th', { scope: 'col', class: 'num', text: 'População' }),
            el('th', { scope: 'col', text: 'Tipo de dado' }))),
          el('tbody', null, linhas.map((l) => el('tr', null,
            el('th', { scope: 'row', text: l.ano }),
            el('td', { class: 'num', text: l.populacao || '' }),
            el('td', { text: l.tipo || '' }))))) : null,
        notas.map((n) => el('p', { class: 'comp-nota', text: n })),
        fontes.length ? el('div', { class: 'comp-fontes' },
          el('h4', { text: 'Fontes' }),
          el('ul', null, fontes.map((f) => {
            const url = urlSegura(f.url);
            return el('li', null, url ? el('a', { href: url, target: '_blank', rel: 'noopener noreferrer', text: f.titulo }) : f.titulo);
          }))) : null);
    }

    function mostrarPar(i) {
      const par = pares[i];
      preencher($('#comp-antes'), criarImagem(par.antes.imagem, par.antes.alt || par.antes.titulo, { imediata: true, aoCarregar: ajustarProporcao }));
      preencher($('#comp-depois'), criarImagem(par.depois.imagem, par.depois.alt || par.depois.titulo, { imediata: true }));
      const periodoAntes = periodoDe(par.antes);
      const periodoDepois = periodoDe(par.depois);
      $('#comp-rot-antes').textContent = 'Antes' + (periodoAntes ? ' · ' + periodoAntes : '');
      $('#comp-rot-depois').textContent = 'Depois' + (periodoDepois ? ' · ' + periodoDepois : '');
      preencherOuOcultar($('#comp-intervalo'), par.intervalo || null);
      preencherOuOcultar($('#comp-credito'), par.creditos.length
        ? par.creditos.map((c) => el('p', null, c.rotulo ? el('strong', { text: c.rotulo + ': ' }) : null, c.texto)) : null);
      preencherOuOcultar($('#comp-obs'), par.observacao || null);
      preencherOuOcultar($('#comp-local'), par.titulo || (par.local ? ['Local: ', par.local] : null));
      desenharDados(par.dados);
      preencherOuOcultar($('#comp-descricao'), paragrafos(par.descricao));
      preencher($('#comp-legendas'), cartaoLegenda('Antes', par.antes), cartaoLegenda('Depois', par.depois));
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
     8. GALERIA E VISUALIZADOR
     Filtros: Todos, Fotografias e Documentos. Lugar, evento etc. aparecem
     como etiquetas de cada item. Sem itens no acervo, só o título.
     ------------------------------------------------------------------ */
  function iniciarGaleria() {
    const conteudo = $('#gal-conteudo');
    const grade = $('#gal-grade');
    const filtros = $('#gal-filtros');
    const status = $('#gal-status');
    const vis = $('#visualizador');
    if (!conteudo || !grade || !filtros || !vis) return;
    // Itens com  galeria: false  aparecem só onde são citados (linha do tempo, mapa...).
    const GALERIA = ACERVO.filter((it) => it.galeria !== false);
    if (GALERIA.length === 0) { conteudo.hidden = true; secaoSemConteudo('galeria'); return; }
    conteudo.hidden = false;

    let filtro = 'todos';
    let visiveis = [];
    let listaAtual = [];
    let indice = 0;
    let ultimoFoco = null;

    const filtrados = () => (filtro === 'todos' ? GALERIA : GALERIA.filter((it) => it.tipo === filtro));
    const etiquetasDe = (item) => (Array.isArray(item.etiquetas) ? item.etiquetas.filter(Boolean) : []);
    const miniatura = (item) => (item.imagem
      ? criarImagem(item.imagem, item.alt || item.titulo, { aoErro: (img) => img.replaceWith(capaSemImagem(item.tipo)) })
      : capaSemImagem(item.tipo));

    // --- filtros
    [{ id: 'todos', nome: 'Todos' }].concat(TIPOS.filter((t) => GALERIA.some((it) => it.tipo === t.id))).forEach((c) => {
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
            el('div', { class: 'gal-thumb' + (item.tipo === 'documento' ? ' doc' : '') }, miniatura(item)),
            el('div', { class: 'gal-info' },
              el('span', { class: 'chips' },
                el('span', { class: 'chip', text: tipoDe(item).singular }),
                etiquetasDe(item).map((t) => el('span', { class: 'etiqueta', text: t }))),
              el('h3', { text: item.titulo }),
              (item.resumo || item.descricao) && !/\n/.test(item.resumo || item.descricao) ? el('p', { text: item.resumo || item.descricao }) : null,
              periodoDe(item) || item.local ? el('p', { class: 'gal-meta', text: [periodoDe(item), item.local].filter(Boolean).join(' · ') }) : null)))));
      const n = visiveis.length;
      const nome = (TIPOS.find((t) => t.id === filtro) || {}).nome;
      status.textContent = n === 0
        ? 'Nenhum item nesta categoria.'
        : n + (n === 1 ? ' item' : ' itens') + (nome ? ' em “' + nome + '”' : '') + '.';
    }

    // --- visualizador ampliado
    const corpoVis = $('#vis-corpo');
    const colunaMidia = $('#vis-midia-col');
    const midia = $('#vis-midia');
    const botaoZoom = $('#vis-zoom');
    const botaoAnterior = $('#vis-ant');
    const botaoProximo = $('#vis-prox');

    function linhaMeta(dl, rotulo, valor) {
      if (valor) dl.append(el('dt', { text: rotulo }), el('dd', { text: valor }));
    }

    function mostrar() {
      const item = listaAtual[indice];

      midia.classList.remove('ampliada');
      botaoZoom.setAttribute('aria-pressed', 'false');
      botaoZoom.textContent = 'Ampliar imagem';
      const temImagem = Boolean(item.imagem);
      colunaMidia.hidden = !temImagem;
      corpoVis.classList.toggle('sem-midia', !temImagem);
      if (temImagem) {
        preencher(midia, criarImagem(item.imagem, item.alt || item.titulo, {
          imediata: true,
          aoErro: () => { colunaMidia.hidden = true; corpoVis.classList.add('sem-midia'); }
        }));
        midia.scrollTo(0, 0);
      } else {
        preencher(midia);
      }

      $('#vis-cat').textContent = tipoDe(item).singular;
      preencher($('#vis-etiquetas'), etiquetasDe(item).map((t) => el('span', { class: 'etiqueta', text: t })));
      $('#vis-titulo').textContent = item.titulo;
      preencher($('#vis-desc'), paragrafos(item.descricao));

      const meta = $('#vis-meta');
      meta.replaceChildren();
      linhaMeta(meta, 'Data', periodoDe(item));
      linhaMeta(meta, 'Local', item.local);
      linhaMeta(meta, 'Autor ou responsável', item.autor);
      linhaMeta(meta, 'Crédito', item.credito);

      preencherOuOcultar($('#vis-fonte'), nosDaFonte(item));
      const arquivo = caminhoSeguro(item.arquivo);
      preencherOuOcultar($('#vis-arquivo'), arquivo ? el('a', { href: arquivo, target: '_blank', rel: 'noopener noreferrer', text: 'Abrir o arquivo do documento' }) : null);

      const varios = listaAtual.length > 1;
      $('.vis-nav', vis).hidden = !varios;
      botaoAnterior.setAttribute('aria-disabled', String(indice === 0));
      botaoProximo.setAttribute('aria-disabled', String(indice === listaAtual.length - 1));
    }

    // lista: itens pelos quais "Anterior/Próximo" navegam (padrão: a galeria filtrada)
    function abrir(id, lista) {
      listaAtual = Array.isArray(lista) && lista.length ? lista : visiveis;
      const i = listaAtual.findIndex((it) => it.id === id);
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
    api.abrirAcervo = abrir;

    function fechar() {
      if (typeof vis.close === 'function') vis.close();
      else vis.removeAttribute('open');
      aoFechar();
    }

    function aoFechar() {
      document.body.classList.remove('travado');
      if (ultimoFoco && document.contains(ultimoFoco) && ultimoFoco.focus) ultimoFoco.focus({ preventScroll: true });
    }

    $('#vis-fechar').addEventListener('click', fechar);
    vis.addEventListener('close', aoFechar);
    vis.addEventListener('click', (e) => { if (e.target === vis) fechar(); }); // clique fora fecha

    botaoAnterior.addEventListener('click', () => { if (indice > 0) { indice--; mostrar(); } });
    botaoProximo.addEventListener('click', () => { if (indice < listaAtual.length - 1) { indice++; mostrar(); } });
    vis.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && indice > 0) { indice--; mostrar(); }
      else if (e.key === 'ArrowRight' && indice < listaAtual.length - 1) { indice++; mostrar(); }
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
     9. SOBRE, REFERÊNCIAS E CRÉDITOS
     Cartões sem conteúdo ficam escondidos.
     ------------------------------------------------------------------ */
  function iniciarSobre() {
    const sobre = DADOS.sobre;
    if (!sobre) return;

    const lista = (valor) => (Array.isArray(valor) ? valor.filter(Boolean) : []);
    const mostrarCartao = (id, temConteudo) => { $('#' + id).hidden = !temConteudo; };

    preencher($('#sobre-texto'), lista(sobre.paragrafos).map((p) => el('p', { text: p })));

    $('#sobre-metodo').textContent = sobre.metodo || '';
    mostrarCartao('sobre-cartao-metodo', Boolean(sobre.metodo));

    const refs = lista(sobre.referencias).filter((r) => r.titulo);
    preencher($('#sobre-refs'), refs.map((r) => {
      const url = urlSegura(r.url);
      return el('li', null,
        url ? el('a', { href: url, target: '_blank', rel: 'noopener noreferrer', text: r.titulo }) : r.titulo,
        r.detalhe ? ' — ' + r.detalhe : null);
    }));
    mostrarCartao('sobre-cartao-refs', refs.length > 0);

    const creditos = lista(sobre.creditos).filter((c) => c.item && c.credito);
    preencher($('#sobre-creds'), creditos.map((c) => el('li', { text: c.item + ' — ' + c.credito })));
    mostrarCartao('sobre-cartao-creds', creditos.length > 0);

    const agradecimentos = lista(sobre.agradecimentos).filter((a) => a.nome);
    preencher($('#sobre-agrs'), agradecimentos.map((a) => el('li', { text: a.nome })));
    mostrarCartao('sobre-cartao-agrs', agradecimentos.length > 0);
  }

  /* ------------------------------------------------------------------
     10. VOLTAR AO TOPO E ANIMAÇÕES DE ENTRADA
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
    // threshold 0: basta tocar a área visível. Com 0.1, blocos muito altos (galeria no celular,
    // com mais de 9000 px) nunca chegavam a 10% visível e ficavam transparentes.
    }, { threshold: 0, rootMargin: '0px 0px -4% 0px' });
    $$('.reveal').forEach((alvo) => observador.observe(alvo));
  }

  /* ------------------------------------------------------------------
     11. INICIALIZAÇÃO
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
