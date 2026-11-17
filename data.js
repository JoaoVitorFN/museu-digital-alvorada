/* =====================================================================
   MUSEU DIGITAL DE ALVORADA D’OESTE — DADOS EDITÁVEIS
   ---------------------------------------------------------------------
   Este é o ÚNICO arquivo que precisa ser editado para acrescentar ou
   corrigir conteúdo. O script.js apenas lê estes dados e desenha a página.

   COMO FUNCIONA
   - O ACERVO guarda cada fotografia e cada documento UMA única vez.
   - A linha do tempo e o Antes × Depois apontam para itens do
     acervo pelo  id  (campo  midia  ou  antes / depois).
   - A galeria mostra o acervo, com filtros Todos / Fotografias /
     Documentos. Itens com  galeria: false  aparecem só na linha do tempo
     (ou no Antes × Depois), sem repetir na galeria.
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
       galeria: false,                 // opcional: tira o item da galeria
       paginas: ['images/...-1.jpg', 'images/...-2.jpg'] // opcional: documento com várias páginas
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
    {"id": "foto-rua-terra-chuva", "tipo": "fotografia", "titulo": "Rua de terra em período chuvoso", "descricao": "Rua de terra em período chuvoso. A data ainda não foi confirmada. As fontes descrevem as ruas do povoado, nos primeiros anos, como de terra, empoeiradas na seca e enlameadas na chuva (Museu Virtual de Rondônia), mas não indicam a data desta foto.", "imagem": "images/acervo/14-rua-terra-chuva.jpg", "alt": "Fotografia antiga: Rua de terra em período chuvoso", "credito": "", "fonte": ""},
    {"id": "foto-registro-antigo", "tipo": "fotografia", "titulo": "Registro antigo", "descricao": "Fotografia antiga. Local, data e contexto ainda não foram confirmados.", "imagem": "images/acervo/16-registro-antigo.jpg", "alt": "Fotografia antiga: Registro antigo", "credito": "", "fonte": ""},
    {"id": "foto-joao-tavora-acervo", "tipo": "fotografia", "titulo": "João Távora e seu acervo", "descricao": "Registro recente de João Távora e de seu acervo.", "imagem": "images/acervo/20-joao-tavora-acervo.jpg", "alt": "Fotografia antiga: João Távora e seu acervo", "credito": "", "fonte": ""},
    {"id": "foto-atividades-economicas", "tipo": "fotografia", "titulo": "Atividades econômicas", "descricao": "Registro de atividades econômicas. Local e data ainda não confirmados.", "imagem": "images/acervo/21-atividades-economicas.jpg", "alt": "Fotografia antiga: Atividades econômicas", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-ponte-rio-muqui", "tipo": "fotografia", "titulo": "Ponte sobre o Rio Muqui", "descricao": "Ponte sobre o Rio Muqui. A data ainda não foi confirmada. O Rio Muqui aparece nos relatos da ocupação da região.", "imagem": "images/acervo/26-ponte-rio-muqui.jpg", "alt": "Fotografia antiga: Ponte sobre o Rio Muqui", "credito": "", "fonte": ""},
    {"id": "foto-igreja-assembleia-de-deus", "tipo": "fotografia", "titulo": "Igreja Assembleia de Deus", "descricao": "Fotografia da Igreja Assembleia de Deus. A data ainda não foi confirmada.", "imagem": "images/acervo/27-igreja-assembleia-de-deus.jpg", "alt": "Fotografia antiga: Igreja Assembleia de Deus", "credito": "", "fonte": ""},
    {"id": "foto-travessia-balsa", "tipo": "fotografia", "titulo": "Travessia de balsa", "descricao": "Travessia de balsa entre Presidente Médici e Alvorada d’Oeste. A data exata ainda não foi confirmada.", "imagem": "images/acervo/29-travessia-balsa.jpg", "alt": "Fotografia antiga: Travessia de balsa", "credito": "", "fonte": ""},
    {"id": "foto-estudantes-santa-ana", "tipo": "fotografia", "titulo": "Estudantes da Escola Santa Ana", "descricao": "Estudantes da Escola Santa Ana, provavelmente nos anos 1990. A Escola Santa Ana teve início em 1979, segundo as fontes consultadas.", "ano": "Provavelmente anos 1990", "imagem": "images/acervo/30-estudantes-santa-ana.jpg", "alt": "Fotografia antiga: Estudantes da Escola Santa Ana", "credito": "", "fonte": ""},
    {"id": "foto-br-429-castanheiras", "tipo": "fotografia", "titulo": "BR-429 entre castanheiras", "descricao": "Trecho da BR-429 entre castanheiras. A data exata ainda não foi confirmada. A BR-429 aparece nos relatos de 1980, quando João Távora pediu a estrada ao governador Jorge Teixeira (Museu Virtual de Rondônia), e no recorte de jornal de 1998 sobre a sua pavimentação.", "imagem": "images/acervo/32-br-429-castanheiras.jpg", "alt": "Fotografia antiga: BR-429 entre castanheiras", "credito": "", "fonte": ""},
    {"id": "foto-antiga-biblioteca", "tipo": "fotografia", "titulo": "Antiga biblioteca municipal", "descricao": "Antiga biblioteca municipal de Alvorada d’Oeste.", "imagem": "images/acervo/34-antiga-biblioteca.jpg", "alt": "Fotografia antiga: Antiga biblioteca municipal", "credito": "", "fonte": ""},
    {"id": "foto-centro-anos-1990", "tipo": "fotografia", "titulo": "Centro da cidade nos anos 1990", "descricao": "Vista do centro da cidade nos anos 1990.", "ano": "Anos 1990", "imagem": "images/acervo/36-centro-anos-1990.jpg", "alt": "Fotografia antiga: Centro da cidade nos anos 1990", "credito": "", "fonte": ""},
    {"id": "foto-br-364-fim-anos-1970", "tipo": "fotografia", "titulo": "BR-364 no final dos anos 1970", "descricao": "Registro da BR-364 no final dos anos 1970. Segundo o Museu Virtual de Rondônia, a abertura da BR-364, no fim dos anos 1960, trouxe colonos do Sul, do Sudeste e do Centro-Oeste para a região.", "ano": "Final dos anos 1970", "imagem": "images/acervo/38-br-364-fim-anos-1970.jpg", "alt": "Fotografia antiga: BR-364 no final dos anos 1970", "credito": "", "fonte": ""},
    {"id": "foto-escola-santa-ana-anos-2000", "tipo": "fotografia", "titulo": "Escola Santa Ana nos anos 2000", "descricao": "Escola Santa Ana nos anos 2000. A Escola Santa Ana teve início em 1979, segundo as fontes consultadas.", "ano": "Anos 2000", "imagem": "images/acervo/40-escola-santa-ana-anos-2000.jpg", "alt": "Fotografia antiga: Escola Santa Ana nos anos 2000", "credito": "", "fonte": ""},
    {"id": "foto-vista-decadas-passadas", "tipo": "fotografia", "titulo": "Vista de Alvorada em décadas passadas", "descricao": "Vista de Alvorada d’Oeste em décadas passadas. A data exata ainda não foi confirmada.", "imagem": "images/acervo/41-vista-decadas-passadas.jpg", "alt": "Fotografia antiga: Vista de Alvorada em décadas passadas", "credito": "", "fonte": ""},
    {"id": "foto-comicio-1982", "tipo": "fotografia", "titulo": "Comício em Alvorada d’Oeste", "descricao": "Registro de um comício, identificado com o ano de 1982.", "ano": "1982", "imagem": "images/acervo/15-comicio-1982.jpg", "alt": "Fotografia antiga: Comício em Alvorada d’Oeste", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-igreja-antiga-a", "tipo": "fotografia", "titulo": "Antiga igreja católica", "descricao": "Antiga igreja católica de Alvorada d’Oeste, em data aproximada (por volta de 1980). A primeira missa campal do povoado foi em 21 de janeiro de 1980; a relação com esta construção não está confirmada.", "ano": "c. 1980", "imagem": "images/acervo/23-igreja-antiga-a.jpg", "alt": "Fotografia antiga: Antiga igreja católica", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-igreja-antiga-b", "tipo": "fotografia", "titulo": "Antiga igreja católica", "descricao": "Outro registro da antiga igreja católica, em data aproximada (por volta de 1980). A primeira missa campal do povoado foi em 21 de janeiro de 1980; a relação com esta construção não está confirmada.", "ano": "c. 1980", "imagem": "images/acervo/24-igreja-antiga-b.jpg", "alt": "Fotografia antiga: Antiga igreja católica", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-mis-estudantil-1989", "tipo": "fotografia", "titulo": "Mis Estudantil", "descricao": "Registro do concurso Mis Estudantil, de 1989.", "ano": "1989", "imagem": "images/acervo/25-mis-estudantil-1989.jpg", "alt": "Fotografia antiga: Mis Estudantil", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-escola-santa-ana-anos-1980", "tipo": "fotografia", "titulo": "Escola Santa Ana (ilustração)", "descricao": "Fotografia provavelmente dos anos 1980 (data aproximada). Serve como ilustração histórica da escola, não como registro de 1979.", "ano": "Provavelmente anos 1980", "imagem": "images/acervo/31-escola-santa-ana-anos-1980.jpg", "alt": "Fotografia antiga: Escola Santa Ana", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-extracao-madeira", "tipo": "fotografia", "titulo": "Extração de madeira", "descricao": "Registro da extração de madeira na região, em data aproximada (entre o início dos anos 1980 e os anos 1990).", "ano": "Anos 1980–90 (aprox.)", "imagem": "images/acervo/33-extracao-madeira.jpg", "alt": "Fotografia antiga: Extração de madeira", "credito": "", "fonte": "", "galeria": false},
    {"id": "doc-jornal-o-alvorada-1998", "tipo": "documento", "titulo": "Jornal “O Alvorada”, maio de 1998", "descricao": "Recorte do jornal “O Alvorada” (Ano I, nº 2, 2ª quinzena de maio de 1998) sobre os 12 anos do município. O texto menciona a pavimentação da BR-429.", "ano": "1998", "imagem": "images/acervo/35-jornal-o-alvorada-1998.jpg", "alt": "Recorte de jornal: Jornal “O Alvorada”, maio de 1998", "credito": "", "fonte": ""},
    {"id": "foto-desfile-7-setembro-1984", "tipo": "fotografia", "titulo": "Desfile de 7 de Setembro", "descricao": "Desfile de 7 de Setembro de 1984. Outra fonte cita um desfile de 7 de Setembro de 1985; o ano ainda precisa ser conferido.", "ano": "1984", "imagem": "images/acervo/37-desfile-7-de-setembro-1984.jpg", "alt": "Fotografia antiga: Desfile de 7 de Setembro", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-professor-didi-1984", "tipo": "fotografia", "titulo": "Professor Geraldo Didi França", "descricao": "O professor Geraldo Didi França na Escola Monte Alegre, em 1984.", "ano": "1984", "imagem": "images/acervo/39-professor-didi-1984.jpg", "alt": "Fotografia antiga: Professor Geraldo Didi França", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-satelite-2007", "tipo": "fotografia", "titulo": "Imagem de satélite de Alvorada d’Oeste", "descricao": "Imagem de satélite da área urbana de Alvorada d’Oeste e do entorno.", "ano": "2007", "data": "26 de maio de 2007", "imagem": "images/antes-depois/satelite-2007-05-26.png", "alt": "Imagem de satélite de Alvorada d’Oeste em 26 de maio de 2007: área urbana em quadras, cortada por uma avenida em diagonal, cercada por pastos, lavouras e matas", "credito": "", "fonte": "", "galeria": false},
    {"id": "foto-satelite-2024", "tipo": "fotografia", "titulo": "Imagem de satélite de Alvorada d’Oeste", "descricao": "Imagem de satélite da mesma área, com enquadramento e orientação semelhantes aos da imagem de 2007.", "ano": "2024", "data": "16 de julho de 2024", "imagem": "images/antes-depois/satelite-2024-07-16.png", "alt": "Imagem de satélite de Alvorada d’Oeste em 16 de julho de 2024: a mesma área urbana em quadras, cortada por uma avenida em diagonal, cercada por pastos, lavouras e matas", "credito": "", "fonte": "", "galeria": false},
    {"id": "doc-lei-103-1986", "tipo": "documento", "titulo": "Lei Estadual nº 103, de 20 de maio de 1986", "descricao": "Lei do Governo do Estado de Rondônia que criou o município de Alvorada d’Oeste, com sede na cidade do mesmo nome, por desmembramento do território de Presidente Médici. Digitalização do documento original, em três páginas.", "ano": "1986", "data": "20 de maio de 1986", "imagem": "images/acervo/lei-103-1986-pagina-1.jpg", "paginas": ["images/acervo/lei-103-1986-pagina-1.jpg", "images/acervo/lei-103-1986-pagina-2.jpg", "images/acervo/lei-103-1986-pagina-3.jpg"], "arquivo": "documents/lei-103-1986.pdf", "alt": "Primeira página da Lei Estadual nº 103, de 20 de maio de 1986, datilografada em papel timbrado do Governo do Estado de Rondônia", "autor": "Governo do Estado de Rondônia", "credito": "", "fonte": "Casa Civil de Rondônia — Lei nº 103/1986", "fonteUrl": "https://ditel.casacivil.ro.gov.br/COTEL/Livros/Files/L103-PL.pdf"},
    {"id": "foto-subestacao-energisa", "tipo": "fotografia", "titulo": "Subestação da Energisa", "descricao": "Vista aérea da subestação da Energisa. A data da fotografia não foi informada.", "imagem": "images/acervo/42-subestacao-energisa.jpg", "alt": "Vista aérea de uma subestação de energia cercada por mureta, ao lado de uma avenida e de casas da cidade", "credito": "", "fonte": "", "galeria": false}
  ],

  /* ===================================================================
     LINHA DO TEMPO
     Os eventos são ordenados pelo  ano  automaticamente: pode acrescentar
     em qualquer posição. Copie um bloco e mude  id  e  ano.
     Campos opcionais: data, local, midia (lista de ids do acervo), fonte, fonteUrl,
     fontes (lista de { fonte, fonteUrl } quando há mais de uma),
     atalho ({ texto, item }: botão que abre um item do acervo na galeria),
     verificar (nota “A verificar” sobre divergências entre fontes),
     rotulo (subtítulo na trilha, útil quando há vários eventos no mesmo ano),
     aproximado: true (mostra "data aproximada"), destaque: true (marco principal),
     ordem (número usado só para ordenar quando  ano  é um texto, ex.: 'Anos 1980–90').
     Parágrafos do texto podem ser separados com \n\n.
     Os textos abaixo são marcos iniciais de pesquisa e só dizem o que já
     foi levantado; ampliar cada um depende do material pesquisado.
     =================================================================== */
  linhaDoTempo: [
    {
      id: "ev-1974",
      ano: "1974",
      rotulo: "Chegada de Távora",
      titulo: "Chegada de João Távora Filho à região",
      texto: "João Távora Filho chega a Presidente Médici, então distrito de Ji-Paraná, com a família. Segundo o relato publicado no blog Zekatraca, a chegada foi em 13 de agosto de 1974, e ele abriu uma bicicletaria na localidade.\n\nA chegada faz parte do movimento de ocupação da região: a abertura da BR-364, no fim dos anos 1960, atraiu migrantes do Sul, do Sudeste e do Centro-Oeste, e, a partir de meados dos anos 1970, colonos passaram a ocupar as terras entre os rios Muqui e Urupá, segundo o Museu Virtual de Rondônia. No mesmo relato, Távora conta que sonhava, desde menino, ter um sítio que um dia se tornaria uma cidade chamada Alvorada.",
      verificar: "o Museu Virtual de Rondônia indica 1976, e não 1974, como o ano da chegada de Távora e da demarcação do sítio Alvorada. Mantém-se 1974, que consta no relato do próprio Távora, até a confirmação.",
      midia: [],
      fontes: [
        { fonte: "Entrevista de João Távora Filho (blog Zekatraca)", fonteUrl: "https://silviozekatraca.blogspot.com/2014/05/alvorad-doeste-o-sonho-de-um-pia.html" },
        { fonte: "Museu Virtual de Rondônia", fonteUrl: "https://museuvirtualrondonia.com/alvorada-doeste" }
      ]
    },
    {
      id: "ev-1976",
      ano: "1976",
      rotulo: "Colonos na Linha 52",
      titulo: "Colonos se estabelecem na Linha 52",
      texto: "Em 1976, segundo a Rondônia Dinâmica, colonos se estabelecem em uma área da Linha 52. É a ocupação que antecede o povoado: foi nessa região que, nos anos seguintes, os moradores se reuniram para escolher a área e abrir as primeiras quadras.\n\nEm 1977, de acordo com a entrevista de João Távora Filho, a região passa por um levantamento do INCRA. Ele afirma ter pressionado o órgão a vistoriar a área, serviço que, segundo o relato, o INCRA dizia não ter realizado.",
      verificar: "as fontes divergem sobre quando a Linha 52 passou a ser ocupada: 1976 (Rondônia Dinâmica), 1977 (Museu Virtual de Rondônia) e 1978 (histórico da Prefeitura). Mantém-se 1976, data já validada no projeto.",
      midia: [],
      fontes: [
        { fonte: "Rondônia Dinâmica, 20 de maio de 2024", fonteUrl: "" },
        { fonte: "Entrevista de João Távora Filho (blog Zekatraca)", fonteUrl: "https://silviozekatraca.blogspot.com/2014/05/alvorad-doeste-o-sonho-de-um-pia.html" },
        { fonte: "Museu Virtual de Rondônia", fonteUrl: "https://museuvirtualrondonia.com/alvorada-doeste" },
        { fonte: "Histórico da Prefeitura de Alvorada do Oeste", fonteUrl: "https://alvoradadooeste.ro.gov.br/municipio/historico" }
      ]
    },
    {
      id: "ev-1979",
      ano: "1979",
      rotulo: "Formação do povoado",
      titulo: "Formação do povoado",
      texto: "Em 1979, os moradores se organizam para formar o povoado. Segundo o Museu Virtual de Rondônia, em julho o administrador do distrito de Presidente Médici, Antônio Geraldo da Silva, o Toninho, visita o sítio Alvorada a convite de João Távora, e uma reunião em 13 de julho aprova a área do povoado.\n\nEm agosto a organização avança. Em 5 de agosto, são definidos quem coordena o desmatamento (Arinaldo Alexandre dos Santos), a alimentação do grupo (Sebastião Alves Neves) e a demarcação provisória (Satílio José dos Reis). No relato de Távora, a reunião foi registrada em ata e decidiu abrir uma clareira em quatro quadras iniciais, para atrair comerciantes. Em 10 de agosto começa o desmatamento das primeiras quadras, e em 5 de outubro a área limpa é queimada.",
      verificar: "as fontes citam duas datas de agosto, 5 de agosto (reunião e definição de tarefas) e 10 de agosto (início da abertura das quadras), e ainda não está definido qual marca o início. O Museu Virtual traz também uma menção a “8 de agosto” que parece erro de data, e os números de trabalhadores no desmatamento não foram conferidos.",
      midia: [],
      fontes: [
        { fonte: "Rondônia Dinâmica, 20 de maio de 2024", fonteUrl: "" },
        { fonte: "Museu Virtual de Rondônia", fonteUrl: "https://museuvirtualrondonia.com/alvorada-doeste" },
        { fonte: "Entrevista de João Távora Filho (blog Zekatraca)", fonteUrl: "https://silviozekatraca.blogspot.com/2014/05/alvorad-doeste-o-sonho-de-um-pia.html" }
      ]
    },
    {
      id: "ev-1979-escola",
      ano: "1979",
      rotulo: "Escola Santa Ana",
      titulo: "Início das atividades da Escola Santa Ana",
      texto: "A escola começa antes de o povoado ser demarcado. Segundo o Museu Virtual de Rondônia e o histórico da Prefeitura, em 20 de abril de 1979 os moradores decidem construir uma escola para cerca de 20 crianças, em terreno de Antônio dos Santos, no km 47,5 da BR-429. Pelo Museu Virtual, as aulas começam em 2 de maio, com Zenaide Távora como primeira professora, e em 2 de agosto o administrador autoriza a Escola Santa Ana, de pau a pique. O blog da Escola Santa Ana registra o início das atividades em 1979, com 22 alunos, ensino multisseriado e instalações simples.\n\nAtenção: a fotografia ao lado é provavelmente dos anos 1980. Ela serve apenas como ilustração histórica da escola e não é um registro de 1979.",
      verificar: "o relato de Távora (blog Zekatraca) situa a fundação da escola em 1981, e os detalhes do relato de Zenaide Távora, como datas e locais, ainda estão sendo conferidos. Mantém-se 1979. O número de alunos também varia: cerca de 20 crianças previstas e 22 no registro da escola.",
      midia: ["foto-escola-santa-ana-anos-1980"],
      fontes: [
        { fonte: "Blog da Escola Santa Ana (eeefmsantaana.blogspot.com)", fonteUrl: "https://eeefmsantaana.blogspot.com" },
        { fonte: "Entrevista com Zenaide Távora", fonteUrl: "" },
        { fonte: "Museu Virtual de Rondônia", fonteUrl: "https://museuvirtualrondonia.com/alvorada-doeste" },
        { fonte: "Histórico da Prefeitura de Alvorada do Oeste", fonteUrl: "https://alvoradadooeste.ro.gov.br/municipio/historico" }
      ]
    },
    {
      id: "ev-1980",
      ano: "1980",
      data: "21 de janeiro de 1980",
      rotulo: "Primeira missa campal",
      titulo: "Primeira missa campal e a antiga igreja",
      texto: "Em 21 de janeiro de 1980, o Padre Romano celebra a primeira missa campal do povoado. Segundo o relato publicado no blog Zekatraca, na ocasião também foram realizados um casamento e batizados, e lançada a pedra fundamental da futura Matriz.\n\nAs fotografias ao lado mostram a antiga igreja católica de Alvorada d’Oeste, em registros de data aproximada (por volta de 1980). Ainda não está confirmado se ela corresponde ao templo cuja pedra fundamental foi lançada na missa.",
      midia: ["foto-igreja-antiga-a", "foto-igreja-antiga-b"],
      fontes: [
        { fonte: "Entrevista de João Távora Filho (blog Zekatraca)", fonteUrl: "https://silviozekatraca.blogspot.com/2014/05/alvorad-doeste-o-sonho-de-um-pia.html" }
      ]
    },
    {
      id: "ev-1980-organizacao",
      ano: "1980",
      rotulo: "Organização inicial",
      titulo: "Organização inicial do povoado",
      texto: "Em abril de 1980, o administrador Toninho volta ao povoado e reúne os pioneiros. Pelo Museu Virtual de Rondônia (2 e 3 de abril) e pelo relato de Távora (3 de abril), são aprovados o sistema de distribuição dos lotes urbanos e a abertura manual das primeiras ruas, e Satílio José dos Reis fica responsável por distribuir os lotes.\n\nEm 22 de abril, o governador Jorge Teixeira de Oliveira, o Teixeirão, visita o povoado. João Távora pede um posto médico e a estrada BR-429; segundo o Museu Virtual, em 24 horas o helicóptero do governador volta com o médico Manoel Lamego.\n\nOs relatos também explicam o nome: “Alvorada” teria sido proposto por João Távora e confirmado por Toninho, e “D’Oeste” acrescentado por Assis Canuto, prefeito de Ji-Paraná. As fontes não indicam a data.",
      verificar: "a visita do governador aparece com o ano de 1980 no Museu Virtual; no relato de Távora o ano não está claro. A data de abril (2–3 ou 3) e a grafia do sobrenome de Assis (Canuto ou Canudo) variam entre as fontes.",
      midia: [],
      fontes: [
        { fonte: "Museu Virtual de Rondônia", fonteUrl: "https://museuvirtualrondonia.com/alvorada-doeste" },
        { fonte: "Entrevista de João Távora Filho (blog Zekatraca)", fonteUrl: "https://silviozekatraca.blogspot.com/2014/05/alvorad-doeste-o-sonho-de-um-pia.html" }
      ]
    },
    {
      id: "ev-madeira",
      ano: "Anos 1980–90",
      ordem: 1980,
      rotulo: "Extração de madeira",
      aproximado: true,
      titulo: "Extração de madeira",
      texto: "A fotografia registra a extração de madeira na região, atividade presente na história de Alvorada d’Oeste. A data é aproximada, entre o início dos anos 1980 e os anos 1990.",
      midia: ["foto-extracao-madeira"],
      fontes: [

      ]
    },
    {
      id: "ev-1982",
      ano: "1982",
      titulo: "Comício em Alvorada d’Oeste",
      texto: "Registro fotográfico de um comício em Alvorada d’Oeste, identificado com este ano no acervo de Ovídio Amélio.",
      midia: ["foto-comicio-1982"],
      fontes: [
        { fonte: "Acervo de Ovídio Amélio", fonteUrl: "" }
      ]
    },
    {
      id: "ev-1984",
      ano: "1984",
      rotulo: "Vida no povoado",
      titulo: "A vida no povoado em 1984",
      texto: "Em 1984, o povoado já se movimentava. As fotografias registram o desfile cívico de 7 de Setembro e o professor Geraldo Didi França na Escola Monte Alegre. O Museu Virtual de Rondônia descreve o povoado desse período como em crescimento, com ruas de terra, empoeiradas na seca e enlameadas na chuva.",
      verificar: "o Museu Virtual de Rondônia cita um desfile de 7 de Setembro de 1985 que reuniu muita gente. O ano de 1984 da fotografia vem da identificação do acervo e ainda não foi cruzado com essa informação.",
      midia: ["foto-desfile-7-setembro-1984", "foto-professor-didi-1984"],
      fontes: [
        { fonte: "Museu Virtual de Rondônia", fonteUrl: "https://museuvirtualrondonia.com/alvorada-doeste" }
      ]
    },
    {
      id: "ev-1986",
      ano: "1986",
      data: "20 de maio de 1986",
      rotulo: "Criação do município",
      destaque: true,
      titulo: "Criação oficial do município",
      texto: "Em 20 de maio de 1986, a Lei Estadual nº 103, assinada pelo governador Ângelo Angelin, cria o município de Alvorada d’Oeste, com sede na cidade do mesmo nome, desmembrado da área territorial de Presidente Médici. A lei define os limites do novo município e mantém como sua comarca a de Presidente Médici. A emancipação dá ao povoado governo e administração próprios. O projeto é do deputado estadual Gersi Badocha, segundo o Museu Virtual de Rondônia.\n\nO processo começa em 1985, com uma comissão de moradores. No plebiscito de 23 de fevereiro de 1986, de 1.402 eleitores inscritos, 790 votaram: 766 a favor, 9 contra, 1 em branco e 14 nulos (Museu Virtual de Rondônia).\n\nO artigo 4º da lei determina que o município seja instalado em 1.º de janeiro de 1989, com a posse de prefeito, vice-prefeito e vereadores a serem eleitos em 15 de novembro de 1988.",
      verificar: "o Museu Virtual de Rondônia cita um prefeito interino nomeado em 1986 e vereadores eleitos em 15 de novembro e empossados em 31 de dezembro de 1986, o que não coincide com as datas do artigo 4º da lei (eleição em 1988 e instalação em 1989). A diferença entre as fontes ainda precisa ser verificada.",
      atalho: { texto: 'Ver o documento completo na galeria', item: 'doc-lei-103-1986' },
      midia: ["doc-lei-103-1986"],
      fontes: [
        { fonte: "Lei Estadual nº 103, de 20 de maio de 1986", fonteUrl: "https://sapl.al.ro.leg.br/norma/626" },
        { fonte: "Museu Virtual de Rondônia", fonteUrl: "https://museuvirtualrondonia.com/alvorada-doeste" }
      ]
    },
    {
      id: "ev-1989",
      ano: "1989",
      rotulo: "Mis Estudantil",
      titulo: "Mis Estudantil",
      texto: "Registro do concurso Mis Estudantil realizado em 1989.",
      midia: ["foto-mis-estudantil-1989"],
      fontes: [

      ]
    },
    {
      id: "ev-1998",
      ano: "1998",
      rotulo: "12 anos do município",
      titulo: "Os 12 anos do município no jornal “O Alvorada”",
      texto: "Um recorte do jornal “O Alvorada” (Ano I, nº 2, 2ª quinzena de maio de 1998) trata dos 12 anos do município e cita a pavimentação da BR-429.",
      midia: ["doc-jornal-o-alvorada-1998"],
      fontes: [

      ]
    },
    {
      id: "ev-2020",
      ano: "2020",
      data: "17 de abril de 2020",
      rotulo: "Energia elétrica",
      titulo: "Subestação da Energisa entra em operação",
      texto: "Segundo reportagem de 17 de abril de 2020, a subestação da Energisa entra em operação e conecta o município ao sistema de transmissão. A fotografia ao lado mostra a subestação em vista aérea; a data do registro não foi informada.",
      midia: ["foto-subestacao-energisa"],
      fontes: [
        { fonte: "Expressão Rondônia, 17 de abril de 2020", fonteUrl: "" }
      ]
    }
  ],

  /* ===================================================================
     ANTES × DEPOIS
     Cada comparação junta DUAS fotografias do mesmo lugar, já cadastradas
     no acervo, de preferência com o mesmo enquadramento. O período, o
     crédito e a fonte de cada lado vêm do cadastro no acervo.
     Enquanto a lista estiver vazia, a seção mostra apenas o título.

     Campos opcionais da comparação: titulo (no lugar de "Local: ..."),
     intervalo (frase sobre o tempo entre os registros), creditos ([{rotulo, texto}]) e observacao (atribuição das imagens, logo abaixo da comparação) e dados
     ({ titulo, aberto, grafico: {imagem, alt, link}, tabela: [{ano, populacao, tipo}], notas: [], fontes: [{titulo, url}] }),
     mostrados num bloco recolhível sob a comparação (aberto: true = já aberto);
     o gráfico aparece ao lado da tabela.

     Modelo:
       { id: 'ad-praca', local: 'Nome do lugar', descricao: 'Texto opcional.',
         antes: 'foto-1982-praca', depois: 'foto-2025-praca' }
     =================================================================== */
  antesDepois: [
    {
      id: 'ad-satelite-2007-2024',
      titulo: 'Alvorada d’Oeste: 17 anos de transformações',
      intervalo: 'Intervalo entre os registros: aproximadamente 17 anos.',
      // Atribuição de cada imagem, conforme informada pelo Google Earth, exibida logo abaixo da comparação.
      creditos: [
        { rotulo: 'Antes', texto: 'Google Earth · CNES / Airbus.' },
        { rotulo: 'Depois', texto: 'Google Earth · Airbus.' }
      ],
      observacao: 'As datas indicadas identificam os registros selecionados para comparação. As atribuições do Google Earth informam as datas disponíveis dos dados de imagem, que podem incluir imagens de datas desconhecidas.',
      antes: 'foto-satelite-2007',
      depois: 'foto-satelite-2024',
      descricao: 'Entre maio de 2007 e julho de 2024, Alvorada d’Oeste passou por transformações que podem ser observadas nas imagens de satélite. O traçado geral das ruas e quadras permaneceu relativamente parecido, enquanto algumas vias receberam pavimentação, novas construções surgiram e a paisagem ao redor da área urbana se modificou.\n\nApesar dessas mudanças, a expansão da área urbanizada parece ter sido limitada quando comparada ao intervalo de 17 anos. Esse cenário também pode ser observado junto à redução da população municipal: segundo o IBGE, Alvorada d’Oeste passou de 16.853 habitantes em 2010 para 13.117 em 2022.\n\nA migração ajuda a compreender parte desse cenário. Entre 2017 e 2022, o município registrou mais pessoas saindo do que chegando, segundo estimativas elaboradas a partir dos dados do Censo 2022. A comparação revela não apenas as mudanças na paisagem, mas também os desafios de desenvolvimento e permanência da população no município.',
      dados: {
        titulo: 'Dados populacionais e fontes',
        aberto: true,
        grafico: {
          imagem: 'images/antes-depois/grafico-populacao-alvorada.png',
          alt: 'Gráfico de linha da população de Alvorada d’Oeste, com dados do IBGE: 19.820 habitantes em 2000, 16.485 em 2007 (contagem populacional), 16.853 em 2010 e 13.117 em 2022.',
          link: 'Abrir o gráfico em tamanho maior (nova aba)'
        },
        tabela: [
          { ano: '2000', populacao: '19.820', tipo: 'Censo demográfico' },
          { ano: '2007', populacao: '16.485', tipo: 'Contagem populacional do IBGE' },
          { ano: '2010', populacao: '16.853', tipo: 'Censo demográfico' },
          { ano: '2022', populacao: '13.117', tipo: 'Censo demográfico' }
        ],
        notas: [
          'Os valores de 2000, 2010 e 2022 vêm de censos demográficos; o de 2007 vem da contagem populacional do IBGE, que não é um censo.',
          'Migração (estimativa): entre 2017 e 2022, cerca de 1.505 pessoas saíram do município e 900 chegaram, com saldo migratório estimado em −605. São estimativas do Atlas da Migração Interna no Brasil, elaboradas a partir dos dados do Censo 2022, e não indicam os motivos das saídas.'
        ],
        fontes: [
          { titulo: 'IBGE — Cidades e Estados: Alvorada d’Oeste', url: 'https://www.ibge.gov.br/cidades-e-estados/ro/alvorada-doeste.html' },
          { titulo: 'IBGE — Sinopse preliminar do Censo Demográfico 2000', url: 'https://biblioteca.ibge.gov.br/visualizacao/periodicos/308/cd_2000_v7.pdf' },
          { titulo: 'Governo de Rondônia — Indicadores Municipais 2011', url: 'https://observatorio.sepog.ro.gov.br/Uploads/IndicadoresMunicipais/2011/Alvorada%20do%20Oeste.pdf' },
          { titulo: 'Atlas da Migração Interna no Brasil — Alvorada d’Oeste', url: 'https://atlas-da-migracao.github.io/municipio/alvorada-d-oeste-ro-1100346/' }
        ]
      }
    }
  ],

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
      { titulo: 'Entrevista publicada no blog Zekatraca', detalhe: 'Relato de João Távora Filho (2014)', url: 'https://silviozekatraca.blogspot.com/2014/05/alvorad-doeste-o-sonho-de-um-pia.html' },
      { titulo: 'Museu Virtual de Rondônia — Alvorada d’Oeste', detalhe: 'Fonte complementar: ocupação da região, formação do povoado e emancipação. Informações a conferir com outras fontes.', url: 'https://museuvirtualrondonia.com/alvorada-doeste' },
      { titulo: 'Prefeitura de Alvorada do Oeste — Histórico', detalhe: 'Histórico institucional do município', url: 'https://alvoradadooeste.ro.gov.br/municipio/historico' },
      { titulo: 'Blog da Escola Santa Ana', detalhe: 'Início das atividades escolares', url: 'https://eeefmsantaana.blogspot.com' },
      { titulo: 'Google — Diretrizes de uso de Google Maps, Google Earth e Street View', detalhe: 'Diretrizes oficiais sobre utilização de imagens, atribuição de créditos e condições de uso do conteúdo do Google Earth.', url: 'https://about.google/brand-resource-center/products-and-services/geo-guidelines/' },
      { titulo: 'Expressão Rondônia, 17 de abril de 2020', detalhe: 'Subestação da Energisa', url: '' },
      { titulo: 'Lei Estadual nº 103, de 20 de maio de 1986', detalhe: 'Criação do município', url: 'https://sapl.al.ro.leg.br/norma/626' }
    ],
    /* { item: 'Fotografia de 1982', credito: 'Acervo de Ovídio Amélio' } */
    creditos: [],
    /* { nome: 'Nome de pessoa ou instituição' } */
    agradecimentos: []
  }
};
