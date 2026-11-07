/* =====================================================================
   MUSEU DIGITAL DE ALVORADA D’OESTE — DADOS EDITÁVEIS
   ---------------------------------------------------------------------
   Este é o ÚNICO arquivo que precisa ser editado para acrescentar ou
   corrigir conteúdo. O script.js apenas lê estes dados e desenha a página.

   COMO FUNCIONA
   - O ACERVO guarda cada fotografia e cada documento UMA única vez.
   - A linha do tempo, o mapa e o Antes × Depois apontam para itens do
     acervo pelo  id  (campo  midia  ou  antes / depois).
   - A galeria mostra todo o acervo, com filtros Todos / Fotografias /
     Documentos.
   Assim, uma mesma fotografia pode aparecer em várias seções sem ser
   cadastrada de novo.

   REGRAS
   1. Só escreva fatos históricos que tenham fonte.
   2. Campos vazios ('' ou []) simplesmente não aparecem no site.
      Seção sem conteúdo fica reduzida ao título e à descrição.
   3. Arquivos de imagem vão em  images/  e PDFs em  documents/.
      Use caminhos relativos, por exemplo:  'images/acervo/foto-1982.jpg'
   4. Preencha sempre  credito  e  fonte  das fotografias e documentos,
      e respeite os direitos de uso.
   5. Fotos: JPG ou WebP, com no máximo uns 1600 px de largura.
   ===================================================================== */

window.MUSEU_DATA = {

  /* ===================================================================
     ACERVO — fotografias e documentos
     -------------------------------------------------------------------
     Modelo de um item (copie, descomente e preencha):

     {
       id: 'foto-1982-praca',          // único, sem espaços nem acentos
       tipo: 'fotografia',             // 'fotografia' ou 'documento'
       titulo: 'Título do item',
       descricao: 'Descrição. Parágrafos separados por \n\n.',
       ano: '1982',                    // ou data completa em  data: '21 de janeiro de 1980'
       local: 'Nome do lugar',
       etiquetas: ['Lugar'],           // ex.: 'Lugar', 'Evento', 'Pessoa'. Aparecem como etiquetas.
       imagem: 'images/acervo/foto-1982-praca.jpg',
       alt: 'Descrição da imagem para quem não enxerga',
       arquivo: 'documents/lei-103.pdf', // opcional: PDF do documento
       autor: 'Quem produziu',
       credito: 'Quem cedeu ou fotografou',
       fonte: 'Acervo, livro, entrevista...',
       fonteUrl: 'https://...'         // opcional
     }
     =================================================================== */
  acervo: [],

  /* ===================================================================
     LINHA DO TEMPO
     Os eventos são ordenados pelo  ano  automaticamente: pode acrescentar
     em qualquer posição. Copie um bloco e mude  id  e  ano.
     Campos opcionais: data, local, midia (lista de ids do acervo), fonte, fonteUrl.
     Parágrafos do texto podem ser separados com \n\n.
     Os textos abaixo são marcos iniciais de pesquisa e só dizem o que já
     foi levantado; ampliar cada um depende do material pesquisado.
     =================================================================== */
  linhaDoTempo: [
    {
      id: 'ev-1974',
      ano: '1974',
      titulo: 'Chegada de João Távora Filho à região',
      texto: 'João Távora Filho chega à região de Presidente Médici.',
      midia: [],
      fonte: '',
      fonteUrl: ''
    },
    {
      id: 'ev-1976',
      ano: '1976',
      titulo: 'Colonos se estabelecem na Linha 52',
      texto: 'Colonos se estabelecem em uma área da Linha 52.',
      midia: [],
      fonte: '',
      fonteUrl: ''
    },
    {
      id: 'ev-1977',
      ano: '1977',
      titulo: 'Levantamento do INCRA',
      texto: 'Um levantamento do INCRA é mencionado em entrevista de João Távora Filho.',
      midia: [],
      fonte: 'Entrevista de João Távora Filho',
      fonteUrl: ''
    },
    {
      id: 'ev-1979',
      ano: '1979',
      titulo: 'Organização dos colonos',
      texto: 'Os colonos se organizam e tem início o processo de abertura da área para a formação do povoado.',
      midia: [],
      fonte: '',
      fonteUrl: ''
    },
    {
      id: 'ev-1980',
      ano: '1980',
      data: '21 de janeiro de 1980',
      titulo: 'Primeira missa campal',
      texto: 'Em 21 de janeiro é celebrada a primeira missa campal, pelo Padre Romano.',
      midia: [],
      fonte: '',
      fonteUrl: ''
    },
    {
      id: 'ev-1981',
      ano: '1981',
      titulo: 'Escola Santa Ana',
      texto: 'A história da Escola Santa Ana e a atuação de Zenaide Távora como primeira professora.',
      midia: [],
      fonte: '',
      fonteUrl: ''
    },
    {
      id: 'ev-1982',
      ano: '1982',
      titulo: 'Registro fotográfico de Alvorada d’Oeste',
      texto: 'Registro fotográfico de Alvorada d’Oeste identificado com este ano no acervo de Ovídio Amélio.',
      midia: [],
      fonte: 'Acervo de Ovídio Amélio',
      fonteUrl: ''
    },
    {
      id: 'ev-1986',
      ano: '1986',
      data: '20 de maio de 1986',
      titulo: 'Criação oficial do município',
      texto: 'O município é criado oficialmente pela Lei Estadual nº 103, de 20 de maio.',
      midia: [],
      fonte: 'Lei Estadual nº 103, de 20 de maio de 1986',
      fonteUrl: ''
    }
  ],

  /* ===================================================================
     MAPA HISTÓRICO
     Enquanto  imagem  estiver vazia, a seção mostra apenas o título.
     Para ativar: coloque o mapa cartográfico ou a fotografia aérea em
     images/maps/ e preencha  imagem  e  alt. Em seguida, cadastre os
     pontos sobre a imagem real.
     x e y são a posição do ponto em % da largura e da altura da imagem
     (0 = canto esquerdo/superior, 100 = canto direito/inferior).
     midia: lista de ids do acervo. eventoId: liga o ponto a um evento
     da linha do tempo.

     Modelo de ponto:
       { id: 'pt-igreja', nome: 'Nome do lugar', x: 42, y: 61, periodo: '1980',
         descricao: 'Texto.', midia: ['foto-1980-missa'], eventoId: 'ev-1980',
         fonte: '', fonteUrl: '' }
     =================================================================== */
  mapa: {
    imagem: '',
    alt: '',
    credito: '',
    fonte: '',
    fonteUrl: '',
    pontos: []
  },

  /* ===================================================================
     ANTES × DEPOIS
     Cada comparação junta DUAS fotografias do mesmo lugar, já cadastradas
     no acervo, de preferência com o mesmo enquadramento. O período, o
     crédito e a fonte de cada lado vêm do cadastro no acervo.
     Enquanto a lista estiver vazia, a seção mostra apenas o título.

     Modelo:
       { id: 'ad-praca', local: 'Nome do lugar', descricao: 'Texto opcional.',
         antes: 'foto-1982-praca', depois: 'foto-2025-praca' }
     =================================================================== */
  antesDepois: [],

  /* ===================================================================
     SOBRE, REFERÊNCIAS E CRÉDITOS
     Cartões sem conteúdo não aparecem.
     =================================================================== */
  sobre: {
    paragrafos: [
      'O Museu Digital de Alvorada d’Oeste é um projeto escolar de pesquisa histórica, desenvolvimento web e preservação da memória municipal.',
      'Seu objetivo é reunir, organizar e divulgar a história de Alvorada d’Oeste, em Rondônia, em um espaço de consulta aberto a estudantes, moradores e visitantes.'
    ],
    metodo: 'As informações apresentadas vêm de pesquisa histórica, entrevistas, documentos oficiais e acervos consultados.',
    referencias: [
      { titulo: 'Entrevista de João Távora Filho', detalhe: '', url: '' },
      { titulo: 'Acervo de Ovídio Amélio', detalhe: '', url: '' },
      { titulo: 'Lei Estadual nº 103, de 20 de maio de 1986', detalhe: 'Criação do município', url: '' }
    ],
    /* { item: 'Fotografia de 1982', credito: 'Acervo de Ovídio Amélio' } */
    creditos: [],
    /* { nome: 'Nome de pessoa ou instituição' } */
    agradecimentos: []
  }
};
