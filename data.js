/* =====================================================================
   MUSEU DIGITAL DE ALVORADA D’OESTE — DADOS EDITÁVEIS
   ---------------------------------------------------------------------
   Este é o ÚNICO arquivo que precisa ser editado para acrescentar ou
   corrigir conteúdo. O script.js apenas lê estes dados e desenha a página.

   COMO FUNCIONA
   - O ACERVO guarda cada fotografia e cada documento UMA única vez.
   - A linha do tempo, o mapa e o Antes × Depois apontam para itens do
     acervo pelo  id  (campo  midia  ou  antes / depois).
   - A galeria mostra o acervo, com filtros Todos / Fotografias /
     Documentos. Itens com  galeria: false  aparecem só na linha do tempo
     (ou no mapa / Antes × Depois), sem repetir na galeria.
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
       fonteUrl: 'https://...',        // opcional
       galeria: false                  // opcional: tira o item da galeria
     }
     Itens com  galeria: false  e sem uso na linha do tempo ficam guardados
     aqui, sem aparecer no site, até que a relação com Alvorada d’Oeste
     seja confirmada (fotos 3, 3 (2), 4, 5, 6, 7 e 21).
     Credito e fonte das fotos ainda estão vazios: preencher quando a
     origem de cada foto for confirmada.
     =================================================================== */
  acervo: [
    {"id": "foto-desfile-centro", "tipo": "fotografia", "titulo": "Desfile no centro da cidade", "descricao": "Registro de um desfile no centro da cidade. O ano ainda não foi confirmado.", "imagem": "images/acervo/01-desfile-centro.jpg", "alt": "Fotografia antiga: Desfile no centro da cidade", "credito": "", "fonte": ""},
    {"id": "foto-vista-aerea", "tipo": "fotografia", "titulo": "Vista aérea da cidade", "descricao": "Vista aérea de Alvorada d’Oeste, provavelmente do início dos anos 2000.", "ano": "Início dos anos 2000 (aprox.)", "imagem": "images/acervo/02-vista-aerea.jpg", "alt": "Fotografia antiga: Vista aérea da cidade", "credito": "", "fonte": ""},
    {"id": "foto-transporte-estrada-terra", "tipo": "fotografia", "titulo": "Transporte em estrada de terra", "descricao": "Registro de um transporte em estrada de terra. Data e local ainda não confirmados.", "imagem": "images/acervo/03-transporte-estrada-de-terra.jpg", "alt": "Fotografia antiga: Transporte em estrada de terra", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-registro-encontro", "tipo": "fotografia", "titulo": "Registro de um encontro", "descricao": "Registro de um encontro entre pessoas. Data e local ainda não confirmados.", "imagem": "images/acervo/03-registro-encontro.jpg", "alt": "Fotografia antiga: Registro de um encontro", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-encontro-moradores", "tipo": "fotografia", "titulo": "Encontro de moradores", "descricao": "Registro de um encontro de moradores. Data e local ainda não confirmados.", "imagem": "images/acervo/04-encontro-moradores.jpg", "alt": "Fotografia antiga: Encontro de moradores", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-travessia-rio", "tipo": "fotografia", "titulo": "Travessia pelo rio", "descricao": "Registro de uma travessia pelo rio. Data e local ainda não confirmados.", "imagem": "images/acervo/05-travessia-rio.jpg", "alt": "Fotografia antiga: Travessia pelo rio", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-area-rural", "tipo": "fotografia", "titulo": "Registro em área rural", "descricao": "Fotografia feita em área rural. Data e local ainda não confirmados.", "imagem": "images/acervo/06-area-rural.jpg", "alt": "Fotografia antiga: Registro em área rural", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-registro-estrada", "tipo": "fotografia", "titulo": "Registro de uma estrada", "descricao": "A própria imagem traz uma legenda que menciona a abertura e o patrolamento de uma rodovia e a data de 5 de setembro de 1980, mas essa informação ainda não foi confirmada.", "imagem": "images/acervo/07-registro-estrada.jpg", "alt": "Fotografia antiga: Registro de uma estrada", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-alvorada-crescimento", "tipo": "fotografia", "titulo": "Alvorada em crescimento", "descricao": "Vista da cidade em crescimento, provavelmente entre os anos 1990 e 2000.", "ano": "Entre 1990 e 2000 (aprox.)", "imagem": "images/acervo/08-alvorada-crescimento.jpg", "alt": "Fotografia antiga: Alvorada em crescimento", "credito": "", "fonte": ""},
    {"id": "foto-vista-antiga", "tipo": "fotografia", "titulo": "Vista antiga de Alvorada", "descricao": "Vista antiga de Alvorada d’Oeste. A data ainda não foi confirmada.", "imagem": "images/acervo/09-vista-antiga.jpg", "alt": "Fotografia antiga: Vista antiga de Alvorada", "credito": "", "fonte": ""},
    {"id": "foto-panorama-cidade", "tipo": "fotografia", "titulo": "Panorama da cidade", "descricao": "Panorama da cidade, provavelmente do início dos anos 2000.", "ano": "Início dos anos 2000 (aprox.)", "imagem": "images/acervo/10-panorama-cidade.jpg", "alt": "Fotografia antiga: Panorama da cidade", "credito": "", "fonte": ""},
    {"id": "foto-rua-centro", "tipo": "fotografia", "titulo": "Rua do centro", "descricao": "Registro de uma rua do centro da cidade. A data ainda não foi confirmada.", "imagem": "images/acervo/12-rua-centro.jpg", "alt": "Fotografia antiga: Rua do centro", "credito": "", "fonte": ""},
    {"id": "foto-centro-alvorada", "tipo": "fotografia", "titulo": "Centro de Alvorada", "descricao": "Registro do centro de Alvorada d’Oeste. A data ainda não foi confirmada.", "imagem": "images/acervo/13-centro-alvorada.jpg", "alt": "Fotografia antiga: Centro de Alvorada", "credito": "", "fonte": ""},
    {"id": "foto-rua-terra-chuva", "tipo": "fotografia", "titulo": "Rua de terra em período chuvoso", "descricao": "Rua de terra em período chuvoso. A data ainda não foi confirmada.", "imagem": "images/acervo/14-rua-terra-chuva.jpg", "alt": "Fotografia antiga: Rua de terra em período chuvoso", "credito": "", "fonte": ""},
    {"id": "foto-registro-antigo", "tipo": "fotografia", "titulo": "Registro antigo", "descricao": "Fotografia antiga. Local, data e contexto ainda não foram confirmados.", "imagem": "images/acervo/16-registro-antigo.jpg", "alt": "Fotografia antiga: Registro antigo", "credito": "", "fonte": ""},
    {"id": "foto-joao-tavora-acervo", "tipo": "fotografia", "titulo": "João Távora e seu acervo", "descricao": "Registro recente de João Távora e de seu acervo.", "imagem": "images/acervo/20-joao-tavora-acervo.jpg", "alt": "Fotografia antiga: João Távora e seu acervo", "credito": "", "fonte": ""},
    {"id": "foto-atividades-economicas", "tipo": "fotografia", "titulo": "Atividades econômicas", "descricao": "Registro de atividades econômicas. Local e data ainda não confirmados.", "imagem": "images/acervo/21-atividades-economicas.jpg", "alt": "Fotografia antiga: Atividades econômicas", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-ponte-rio-muqui", "tipo": "fotografia", "titulo": "Ponte sobre o Rio Muqui", "descricao": "Ponte sobre o Rio Muqui. A data ainda não foi confirmada.", "imagem": "images/acervo/26-ponte-rio-muqui.jpg", "alt": "Fotografia antiga: Ponte sobre o Rio Muqui", "credito": "", "fonte": ""},
    {"id": "foto-igreja-assembleia-de-deus", "tipo": "fotografia", "titulo": "Igreja Assembleia de Deus", "descricao": "Fotografia da Igreja Assembleia de Deus. A data ainda não foi confirmada.", "imagem": "images/acervo/27-igreja-assembleia-de-deus.jpg", "alt": "Fotografia antiga: Igreja Assembleia de Deus", "credito": "", "fonte": ""},
    {"id": "foto-travessia-balsa", "tipo": "fotografia", "titulo": "Travessia de balsa", "descricao": "Travessia de balsa entre Presidente Médici e Alvorada d’Oeste. A data exata ainda não foi confirmada.", "imagem": "images/acervo/29-travessia-balsa.jpg", "alt": "Fotografia antiga: Travessia de balsa", "credito": "", "fonte": ""},
    {"id": "foto-estudantes-santa-ana", "tipo": "fotografia", "titulo": "Estudantes da Escola Santa Ana", "descricao": "Estudantes da Escola Santa Ana, provavelmente nos anos 1990.", "ano": "Provavelmente anos 1990", "imagem": "images/acervo/30-estudantes-santa-ana.jpg", "alt": "Fotografia antiga: Estudantes da Escola Santa Ana", "credito": "", "fonte": ""},
    {"id": "foto-br-429-castanheiras", "tipo": "fotografia", "titulo": "BR-429 entre castanheiras", "descricao": "Trecho da BR-429 entre castanheiras. A data exata ainda não foi confirmada.", "imagem": "images/acervo/32-br-429-castanheiras.jpg", "alt": "Fotografia antiga: BR-429 entre castanheiras", "credito": "", "fonte": ""},
    {"id": "foto-antiga-biblioteca", "tipo": "fotografia", "titulo": "Antiga biblioteca municipal", "descricao": "Antiga biblioteca municipal de Alvorada d’Oeste.", "imagem": "images/acervo/34-antiga-biblioteca.jpg", "alt": "Fotografia antiga: Antiga biblioteca municipal", "credito": "", "fonte": ""},
    {"id": "foto-centro-anos-1990", "tipo": "fotografia", "titulo": "Centro da cidade nos anos 1990", "descricao": "Vista do centro da cidade nos anos 1990.", "ano": "Anos 1990", "imagem": "images/acervo/36-centro-anos-1990.jpg", "alt": "Fotografia antiga: Centro da cidade nos anos 1990", "credito": "", "fonte": ""},
    {"id": "foto-br-364-fim-anos-1970", "tipo": "fotografia", "titulo": "BR-364 no final dos anos 1970", "descricao": "Registro da BR-364 no final dos anos 1970.", "ano": "Final dos anos 1970", "imagem": "images/acervo/38-br-364-fim-anos-1970.jpg", "alt": "Fotografia antiga: BR-364 no final dos anos 1970", "credito": "", "fonte": ""},
    {"id": "foto-escola-santa-ana-anos-2000", "tipo": "fotografia", "titulo": "Escola Santa Ana nos anos 2000", "descricao": "Escola Santa Ana nos anos 2000.", "ano": "Anos 2000", "imagem": "images/acervo/40-escola-santa-ana-anos-2000.jpg", "alt": "Fotografia antiga: Escola Santa Ana nos anos 2000", "credito": "", "fonte": ""},
    {"id": "foto-vista-decadas-passadas", "tipo": "fotografia", "titulo": "Vista de Alvorada em décadas passadas", "descricao": "Vista de Alvorada d’Oeste em décadas passadas. A data exata ainda não foi confirmada.", "imagem": "images/acervo/41-vista-decadas-passadas.jpg", "alt": "Fotografia antiga: Vista de Alvorada em décadas passadas", "credito": "", "fonte": ""},
    {"id": "foto-comicio-1982", "tipo": "fotografia", "titulo": "Comício em Alvorada d’Oeste", "descricao": "Registro de um comício, identificado com o ano de 1982.", "ano": "1982", "imagem": "images/acervo/15-comicio-1982.jpg", "alt": "Fotografia antiga: Comício em Alvorada d’Oeste", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-igreja-antiga-a", "tipo": "fotografia", "titulo": "Antiga igreja católica", "descricao": "Antiga igreja católica de Alvorada d’Oeste, em data aproximada (por volta de 1980).", "ano": "c. 1980", "imagem": "images/acervo/23-igreja-antiga-a.jpg", "alt": "Fotografia antiga: Antiga igreja católica", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-igreja-antiga-b", "tipo": "fotografia", "titulo": "Antiga igreja católica", "descricao": "Outro registro da antiga igreja católica, em data aproximada (por volta de 1980).", "ano": "c. 1980", "imagem": "images/acervo/24-igreja-antiga-b.jpg", "alt": "Fotografia antiga: Antiga igreja católica", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-mis-estudantil-1989", "tipo": "fotografia", "titulo": "Mis Estudantil", "descricao": "Registro do concurso Mis Estudantil, de 1989.", "ano": "1989", "imagem": "images/acervo/25-mis-estudantil-1989.jpg", "alt": "Fotografia antiga: Mis Estudantil", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-escola-santa-ana-anos-1980", "tipo": "fotografia", "titulo": "Escola Santa Ana (ilustração)", "descricao": "Fotografia provavelmente dos anos 1980 (data aproximada). Serve como ilustração histórica da escola, não como registro de 1979.", "ano": "Provavelmente anos 1980", "imagem": "images/acervo/31-escola-santa-ana-anos-1980.jpg", "alt": "Fotografia antiga: Escola Santa Ana", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-extracao-madeira", "tipo": "fotografia", "titulo": "Extração de madeira", "descricao": "Registro da extração de madeira na região, em data aproximada (entre o início dos anos 1980 e os anos 1990).", "ano": "Anos 1980–90 (aprox.)", "imagem": "images/acervo/33-extracao-madeira.jpg", "alt": "Fotografia antiga: Extração de madeira", "credito": "", "fonte": "", "galeria": false},
    {"id": "doc-jornal-o-alvorada-1998", "tipo": "documento", "titulo": "Jornal “O Alvorada”, maio de 1998", "descricao": "Recorte do jornal “O Alvorada” (Ano I, nº 2, 2ª quinzena de maio de 1998) sobre os 12 anos do município. O texto menciona a pavimentação da BR-429.", "ano": "1998", "imagem": "images/acervo/35-jornal-o-alvorada-1998.jpg", "alt": "Recorte de jornal: Jornal “O Alvorada”, maio de 1998", "credito": "", "fonte": ""},
    {"id": "foto-desfile-7-setembro-1984", "tipo": "fotografia", "titulo": "Desfile de 7 de Setembro", "descricao": "Desfile de 7 de Setembro de 1984.", "ano": "1984", "imagem": "images/acervo/37-desfile-7-de-setembro-1984.jpg", "alt": "Fotografia antiga: Desfile de 7 de Setembro", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-professor-didi-1984", "tipo": "fotografia", "titulo": "Professor Geraldo Didi França", "descricao": "O professor Geraldo Didi França na Escola Monte Alegre, em 1984.", "ano": "1984", "imagem": "images/acervo/39-professor-didi-1984.jpg", "alt": "Fotografia antiga: Professor Geraldo Didi França", "credito": "", "fonte": "", "galeria": false}
  ],

  /* ===================================================================
     LINHA DO TEMPO
     Os eventos são ordenados pelo  ano  automaticamente: pode acrescentar
     em qualquer posição. Copie um bloco e mude  id  e  ano.
     Campos opcionais: data, local, midia (lista de ids do acervo), fonte, fonteUrl,
     fontes (lista de { fonte, fonteUrl } quando há mais de uma),
     rotulo (subtítulo na trilha, útil quando há vários eventos no mesmo ano),
     aproximado: true (mostra "data aproximada"), destaque: true (marco principal),
     ordem (número usado só para ordenar quando  ano  é um texto, ex.: 'Anos 1980–90').
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
      texto: 'Colonos se estabelecem em uma área da Linha 52, antes da formação do povoado.',
      midia: [],
      fonte: 'Rondônia Dinâmica, 20 de maio de 2024',
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
      rotulo: 'Organização dos colonos',
      titulo: 'Organização dos colonos e abertura da área',
      texto: 'Em 1979, os colonos se organizam e tem início o processo de abertura da área para a formação do povoado.\n\nAs fontes consultadas citam duas datas de agosto: uma reunião em 5 de agosto de 1979, para iniciar a abertura, e a abertura da área para os primeiros lotes em 10 de agosto de 1979. Elas podem corresponder a etapas diferentes do mesmo processo, e a pesquisa ainda não definiu qual delas marca o início.',
      midia: [],
      fontes: [
        { fonte: 'Rondônia Dinâmica, 20 de maio de 2024', fonteUrl: '' },
        { fonte: 'Entrevista publicada no blog Zekatraca', fonteUrl: '' }
      ]
    },
    {
      id: 'ev-1979-escola',
      ano: '1979',
      rotulo: 'Escola Santa Ana',
      titulo: 'Início das atividades da Escola Santa Ana',
      texto: 'As atividades da Escola Santa Ana começam em 1979, com 22 alunos, em ensino multisseriado e em instalações simples. Zenaide Távora é lembrada como a primeira professora.\n\nOs detalhes do relato de Zenaide Távora, como datas e locais, ainda estão sendo conferidos. Atenção: a fotografia ao lado é provavelmente dos anos 1980. Ela serve apenas como ilustração histórica da escola e não é um registro de 1979.',
      midia: ['foto-escola-santa-ana-anos-1980'],
      fontes: [
        { fonte: 'Blog da Escola Santa Ana (eeefmsantaana.blogspot.com)', fonteUrl: '' },
        { fonte: 'Entrevista com Zenaide Távora', fonteUrl: '' }
      ]
    },
    {
      id: 'ev-1980',
      ano: '1980',
      data: '21 de janeiro de 1980',
      rotulo: 'Primeira missa campal',
      titulo: 'Primeira missa campal',
      texto: 'Em 21 de janeiro é celebrada a primeira missa campal, pelo Padre Romano.',
      midia: [],
      fonte: '',
      fonteUrl: ''
    },
    {
      id: 'ev-1980-igreja',
      ano: '1980',
      rotulo: 'Antiga igreja católica',
      aproximado: true,
      titulo: 'A antiga igreja católica',
      texto: 'As fotografias mostram a antiga igreja católica de Alvorada d’Oeste. A data é aproximada: os registros são datados por volta de 1980.',
      midia: ['foto-igreja-antiga-a', 'foto-igreja-antiga-b'],
      fonte: '',
      fonteUrl: ''
    },
    {
      id: 'ev-madeira',
      ano: 'Anos 1980–90',
      ordem: 1980,
      rotulo: 'Extração de madeira',
      aproximado: true,
      titulo: 'Extração de madeira',
      texto: 'A fotografia registra a extração de madeira na região, atividade presente na história de Alvorada d’Oeste. A data é aproximada, entre o início dos anos 1980 e os anos 1990.',
      midia: ['foto-extracao-madeira'],
      fonte: '',
      fonteUrl: ''
    },
    {
      id: 'ev-1982',
      ano: '1982',
      titulo: 'Comício em Alvorada d’Oeste',
      texto: 'Registro fotográfico de um comício em Alvorada d’Oeste, identificado com este ano no acervo de Ovídio Amélio.',
      midia: ['foto-comicio-1982'],
      fonte: 'Acervo de Ovídio Amélio',
      fonteUrl: ''
    },
    {
      id: 'ev-1984-desfile',
      ano: '1984',
      rotulo: 'Desfile de 7 de Setembro',
      titulo: 'Desfile de 7 de Setembro',
      texto: 'Registro do desfile cívico de 7 de Setembro de 1984 em Alvorada d’Oeste.',
      midia: ['foto-desfile-7-setembro-1984'],
      fonte: '',
      fonteUrl: ''
    },
    {
      id: 'ev-1984-escola',
      ano: '1984',
      rotulo: 'Escola Monte Alegre',
      titulo: 'Professor Geraldo Didi França na Escola Monte Alegre',
      texto: 'Em 1984, o professor Geraldo Didi França aparece em registro na Escola Monte Alegre.',
      midia: ['foto-professor-didi-1984'],
      fonte: '',
      fonteUrl: ''
    },
    {
      id: 'ev-1986',
      ano: '1986',
      data: '20 de maio de 1986',
      rotulo: 'Criação do município',
      destaque: true,
      titulo: 'Criação oficial do município',
      texto: 'O município de Alvorada d’Oeste é criado pela Lei Estadual nº 103, de 20 de maio de 1986, por desmembramento de Presidente Médici.',
      midia: [],
      fonte: 'Lei Estadual nº 103, de 20 de maio de 1986',
      fonteUrl: 'https://sapl.al.ro.leg.br/norma/626'
    },
    {
      id: 'ev-1989',
      ano: '1989',
      rotulo: 'Mis Estudantil',
      titulo: 'Mis Estudantil',
      texto: 'Registro do concurso Mis Estudantil realizado em 1989.',
      midia: ['foto-mis-estudantil-1989'],
      fonte: '',
      fonteUrl: ''
    },
    {
      id: 'ev-1998',
      ano: '1998',
      rotulo: '12 anos do município',
      titulo: 'Os 12 anos do município no jornal “O Alvorada”',
      texto: 'Um recorte do jornal “O Alvorada” (Ano I, nº 2, 2ª quinzena de maio de 1998) trata dos 12 anos do município e cita a pavimentação da BR-429.',
      midia: ['doc-jornal-o-alvorada-1998'],
      fonte: '',
      fonteUrl: ''
    },
    {
      id: 'ev-2020',
      ano: '2020',
      data: '17 de abril de 2020',
      rotulo: 'Energia elétrica',
      titulo: 'Subestação da Energisa entra em operação',
      texto: 'Segundo reportagem de 17 de abril de 2020, a subestação da Energisa entra em operação e conecta o município ao sistema de transmissão.',
      midia: [],
      fonte: 'Expressão Rondônia, 17 de abril de 2020',
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
      { titulo: 'Rondônia Dinâmica, 20 de maio de 2024', detalhe: 'Linha 52 e formação do povoado', url: '' },
      { titulo: 'Entrevista publicada no blog Zekatraca', detalhe: 'Reunião de 5 de agosto de 1979', url: '' },
      { titulo: 'Blog da Escola Santa Ana', detalhe: 'Início das atividades escolares', url: 'https://eeefmsantaana.blogspot.com' },
      { titulo: 'Expressão Rondônia, 17 de abril de 2020', detalhe: 'Subestação da Energisa', url: '' },
      { titulo: 'Lei Estadual nº 103, de 20 de maio de 1986', detalhe: 'Criação do município', url: 'https://sapl.al.ro.leg.br/norma/626' }
    ],
    /* { item: 'Fotografia de 1982', credito: 'Acervo de Ovídio Amélio' } */
    creditos: [],
    /* { nome: 'Nome de pessoa ou instituição' } */
    agradecimentos: []
  }
};
