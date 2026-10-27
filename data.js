/* =====================================================================
   MUSEU DIGITAL DE ALVORADA D’OESTE — DADOS EDITÁVEIS
   ---------------------------------------------------------------------
   Este é o ÚNICO arquivo que precisa ser editado para trocar textos,
   fotografias, documentos, pontos do mapa e referências.
   O script.js apenas lê estes dados e desenha a página.

   REGRAS DE OURO
   1. Só escreva fatos históricos que tenham fonte. Se não tiver fonte,
      deixe o registro com  status: 'placeholder'.
   2. Quando um registro for verificado, troque para  status: 'verificado'
      e preencha  fonte  (e  fonteUrl, se houver link).
   3. Todo texto entre colchetes, como [INSERIR ...], aparece destacado
      no site como espaço reservado.
   4. Imagem vazia ('') mostra um espaço reservado. Para usar uma imagem,
      coloque o arquivo na pasta images/ e escreva o caminho, por exemplo:
      imagem: 'images/timeline/ev-1986.jpg'
   5. Respeite direitos de uso: preencha sempre  credito  e  fonte.

   STATUS POSSÍVEIS
   - 'placeholder' : espaço reservado, NÃO é registro histórico.
   - 'verificado'  : conteúdo pesquisado e com fonte.
   ===================================================================== */

window.MUSEU_DATA = {

  /* ===================================================================
     LINHA DO TEMPO
     Os anos abaixo são apenas a estrutura inicial da interface.
     Revise datas e conteúdos antes da publicação definitiva.
     Para acrescentar um ano, copie um bloco e mude o  id  e o  ano.
     Parágrafos do texto podem ser separados com \n\n.
     =================================================================== */
  linhaDoTempo: [
    {
      id: 'ev-1978',
      ano: '1978',
      data: '',
      titulo: '[INSERIR TÍTULO DO ACONTECIMENTO]',
      texto: '[INSERIR TEXTO HISTÓRICO VERIFICADO]',
      imagem: '',
      alt: '',
      legenda: '',
      credito: '',
      fonte: '',
      fonteUrl: '',
      status: 'placeholder'
    },
    {
      id: 'ev-1979',
      ano: '1979',
      data: '',
      titulo: '[INSERIR TÍTULO DO ACONTECIMENTO]',
      texto: '[INSERIR TEXTO HISTÓRICO VERIFICADO]',
      imagem: '',
      alt: '',
      legenda: '',
      credito: '',
      fonte: '',
      fonteUrl: '',
      status: 'placeholder'
    },
    {
      id: 'ev-1981',
      ano: '1981',
      data: '',
      titulo: '[INSERIR TÍTULO DO ACONTECIMENTO]',
      texto: '[INSERIR TEXTO HISTÓRICO VERIFICADO]',
      imagem: '',
      alt: '',
      legenda: '',
      credito: '',
      fonte: '',
      fonteUrl: '',
      status: 'placeholder'
    },
    {
      id: 'ev-1986',
      ano: '1986',
      data: '',
      titulo: '[INSERIR TÍTULO DO ACONTECIMENTO]',
      texto: '[INSERIR TEXTO HISTÓRICO VERIFICADO]',
      imagem: '',
      alt: '',
      legenda: '',
      credito: '',
      fonte: '',
      fonteUrl: '',
      status: 'placeholder'
    },
    {
      id: 'ev-1989',
      ano: '1989',
      data: '',
      titulo: '[INSERIR TÍTULO DO ACONTECIMENTO]',
      texto: '[INSERIR TEXTO HISTÓRICO VERIFICADO]',
      imagem: '',
      alt: '',
      legenda: '',
      credito: '',
      fonte: '',
      fonteUrl: '',
      status: 'placeholder'
    },
    {
      id: 'ev-hoje',
      ano: 'Hoje',
      data: '',
      titulo: '[INSERIR TÍTULO DO ACONTECIMENTO]',
      texto: '[INSERIR TEXTO SOBRE A ALVORADA D’OESTE DE HOJE]',
      imagem: '',
      alt: '',
      legenda: '',
      credito: '',
      fonte: '',
      fonteUrl: '',
      status: 'placeholder'
    }
  ],

  /* ===================================================================
     MAPA HISTÓRICO
     Na V1 o mapa é DEMONSTRATIVO: a imagem é um esquema ilustrativo e as
     posições (x, y, em % da imagem) NÃO são coordenadas geográficas.
     Quando houver mapas reais, troque  imagem  e  demonstrativo: false,
     e ajuste x/y de cada ponto sobre o mapa verdadeiro.
     eventoId liga o ponto a um acontecimento da linha do tempo.
     =================================================================== */
  mapa: {
    demonstrativo: true,
    imagem: 'images/maps/mapa-demonstrativo.svg',
    alt: 'Mapa esquemático demonstrativo, sem valor geográfico: grade, bússola e áreas ilustrativas.',
    legenda: [
      { tipo: 'ponto',  texto: 'Ponto de interesse (posição ilustrativa)' },
      { tipo: 'ativo',  texto: 'Ponto selecionado' },
      { tipo: 'espaco', texto: 'Contorno tracejado: conteúdo em preparação' }
    ],
    pontos: [
      {
        id: 'pt-1',
        nome: '[LOCAL 1 — A DEFINIR]',
        x: 24, y: 30,
        periodo: '',
        descricao: '[INSERIR DESCRIÇÃO E RELAÇÃO COM A HISTÓRIA MUNICIPAL]',
        imagem: '', alt: '', credito: '', fonte: '', fonteUrl: '',
        eventoId: 'ev-1978',
        status: 'placeholder'
      },
      {
        id: 'pt-2',
        nome: '[LOCAL 2 — A DEFINIR]',
        x: 58, y: 24,
        periodo: '',
        descricao: '[INSERIR DESCRIÇÃO E RELAÇÃO COM A HISTÓRIA MUNICIPAL]',
        imagem: '', alt: '', credito: '', fonte: '', fonteUrl: '',
        eventoId: 'ev-1981',
        status: 'placeholder'
      },
      {
        id: 'pt-3',
        nome: '[LOCAL 3 — A DEFINIR]',
        x: 45, y: 62,
        periodo: '',
        descricao: '[INSERIR DESCRIÇÃO E RELAÇÃO COM A HISTÓRIA MUNICIPAL]',
        imagem: '', alt: '', credito: '', fonte: '', fonteUrl: '',
        eventoId: 'ev-1986',
        status: 'placeholder'
      },
      {
        id: 'pt-4',
        nome: '[LOCAL 4 — A DEFINIR]',
        x: 74, y: 70,
        periodo: '',
        descricao: '[INSERIR DESCRIÇÃO E RELAÇÃO COM A HISTÓRIA MUNICIPAL]',
        imagem: '', alt: '', credito: '', fonte: '', fonteUrl: '',
        eventoId: 'ev-hoje',
        status: 'placeholder'
      }
    ]
  },

  /* ===================================================================
     ANTES × DEPOIS
     Cada item é um par de imagens do MESMO lugar, no mesmo enquadramento.
     Na V1 as imagens são ilustrações demonstrativas (demonstrativo: true).
     Para usar fotos reais: troque os caminhos, preencha período, local,
     crédito e fonte, e coloque demonstrativo: false.
     Se houver mais de um par, o site mostra um seletor.
     =================================================================== */
  antesDepois: [
    {
      id: 'ad-1',
      demonstrativo: true,
      local: '[INSERIR NOME DO LOCAL]',
      antes: {
        imagem: 'images/before-after/antes-demo.svg',
        alt: 'Ilustração demonstrativa em tons de sépia de uma paisagem genérica, com estrada de terra, árvores e uma construção.',
        periodo: '[INSERIR PERÍODO]',
        credito: 'Ilustração demonstrativa criada para o protótipo do site',
        fonte: '',
        fonteUrl: ''
      },
      depois: {
        imagem: 'images/before-after/depois-demo.svg',
        alt: 'Ilustração demonstrativa colorida da mesma paisagem genérica, agora com estrada asfaltada e mais construções.',
        periodo: '[INSERIR PERÍODO]',
        credito: 'Ilustração demonstrativa criada para o protótipo do site',
        fonte: '',
        fonteUrl: ''
      }
    }
  ],

  /* ===================================================================
     GALERIA
     categoria deve ser um dos ids de  categorias.
     arquivo (opcional): caminho de um PDF em documents/ para abrir.
     =================================================================== */
  galeria: {
    categorias: [
      { id: 'documentos', nome: 'Documentos' },
      { id: 'fotos',      nome: 'Fotos' },
      { id: 'lugares',    nome: 'Lugares' },
      { id: 'eventos',    nome: 'Eventos' }
    ],
    itens: [
      {
        id: 'gal-doc-1', categoria: 'documentos',
        titulo: '[INSERIR TÍTULO DO DOCUMENTO]',
        resumo: '[INSERIR RESUMO CURTO]',
        descricao: '[INSERIR DESCRIÇÃO DO DOCUMENTO]',
        data: '', autor: '', credito: '', fonte: '', fonteUrl: '',
        imagem: '', alt: '', arquivo: '', status: 'placeholder'
      },
      {
        id: 'gal-doc-2', categoria: 'documentos',
        titulo: '[INSERIR TÍTULO DO DOCUMENTO]',
        resumo: '[INSERIR RESUMO CURTO]',
        descricao: '[INSERIR DESCRIÇÃO DO DOCUMENTO]',
        data: '', autor: '', credito: '', fonte: '', fonteUrl: '',
        imagem: '', alt: '', arquivo: '', status: 'placeholder'
      },
      {
        id: 'gal-foto-1', categoria: 'fotos',
        titulo: '[INSERIR TÍTULO DA FOTOGRAFIA]',
        resumo: '[INSERIR RESUMO CURTO]',
        descricao: '[INSERIR DESCRIÇÃO DA FOTOGRAFIA]',
        data: '', autor: '', credito: '', fonte: '', fonteUrl: '',
        imagem: '', alt: '', arquivo: '', status: 'placeholder'
      },
      {
        id: 'gal-foto-2', categoria: 'fotos',
        titulo: '[INSERIR TÍTULO DA FOTOGRAFIA]',
        resumo: '[INSERIR RESUMO CURTO]',
        descricao: '[INSERIR DESCRIÇÃO DA FOTOGRAFIA]',
        data: '', autor: '', credito: '', fonte: '', fonteUrl: '',
        imagem: '', alt: '', arquivo: '', status: 'placeholder'
      },
      {
        id: 'gal-lugar-1', categoria: 'lugares',
        titulo: '[INSERIR NOME DO LUGAR]',
        resumo: '[INSERIR RESUMO CURTO]',
        descricao: '[INSERIR DESCRIÇÃO DO LUGAR]',
        data: '', autor: '', credito: '', fonte: '', fonteUrl: '',
        imagem: '', alt: '', arquivo: '', status: 'placeholder'
      },
      {
        id: 'gal-lugar-2', categoria: 'lugares',
        titulo: '[INSERIR NOME DO LUGAR]',
        resumo: '[INSERIR RESUMO CURTO]',
        descricao: '[INSERIR DESCRIÇÃO DO LUGAR]',
        data: '', autor: '', credito: '', fonte: '', fonteUrl: '',
        imagem: '', alt: '', arquivo: '', status: 'placeholder'
      },
      {
        id: 'gal-evento-1', categoria: 'eventos',
        titulo: '[INSERIR NOME DO EVENTO]',
        resumo: '[INSERIR RESUMO CURTO]',
        descricao: '[INSERIR DESCRIÇÃO DO EVENTO]',
        data: '', autor: '', credito: '', fonte: '', fonteUrl: '',
        imagem: '', alt: '', arquivo: '', status: 'placeholder'
      },
      {
        id: 'gal-evento-2', categoria: 'eventos',
        titulo: '[INSERIR NOME DO EVENTO]',
        resumo: '[INSERIR RESUMO CURTO]',
        descricao: '[INSERIR DESCRIÇÃO DO EVENTO]',
        data: '', autor: '', credito: '', fonte: '', fonteUrl: '',
        imagem: '', alt: '', arquivo: '', status: 'placeholder'
      }
    ]
  },

  /* ===================================================================
     SOBRE, REFERÊNCIAS E CRÉDITOS
     Itens com status 'pendente' aparecem marcados como pendentes.
     Não coloque referências que ainda não foram realmente consultadas.
     =================================================================== */
  sobre: {
    paragrafos: [
      'O Museu Digital de Alvorada d’Oeste é um projeto escolar de pesquisa histórica, desenvolvimento web e preservação da memória municipal.',
      'Seu objetivo é reunir, organizar e divulgar a história de Alvorada d’Oeste, em Rondônia, em um espaço de consulta aberto a estudantes, moradores e visitantes.',
      'Todo conteúdo marcado como “em preparação” ou “demonstrativo” é apenas um espaço reservado: ele ainda não é um registro histórico verificado.'
    ],
    metodo: '[INSERIR: como a pesquisa foi feita — por exemplo, arquivos consultados, entrevistas, publicações e visitas]',
    referencias: [
      { id: 'ref-1', titulo: '[INSERIR REFERÊNCIA CONSULTADA]', detalhe: '', url: '', status: 'pendente' },
      { id: 'ref-2', titulo: '[INSERIR REFERÊNCIA CONSULTADA]', detalhe: '', url: '', status: 'pendente' }
    ],
    creditos: [
      { id: 'cred-1', item: '[INSERIR FOTOGRAFIA OU DOCUMENTO]', credito: '[INSERIR AUTORIA, ACERVO OU INSTITUIÇÃO]', status: 'pendente' }
    ],
    agradecimentos: [
      { id: 'agr-1', nome: '[INSERIR NOME DE PESSOA OU INSTITUIÇÃO]', status: 'pendente' }
    ]
  }
};
