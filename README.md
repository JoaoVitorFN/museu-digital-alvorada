# Museu Digital de Alvorada d’Oeste

Site estático (HTML, CSS e JavaScript puros), sem framework, sem banco de dados e sem chaves de API.
Funciona abrindo o `index.html` e publica direto no Netlify.

## Arquivos

```
museu-digital-alvorada/
├── index.html      estrutura do site (abertura, menu, seções, visualizador)
├── style.css       visual, responsividade, animações e movimento reduzido
├── script.js       interações (lê os dados do data.js)
├── data.js         TODO o conteúdo editável (acervo, linha do tempo, comparações, sobre)
├── images/         imagens do acervo, comparações etc. (crie as subpastas que precisar, ex.: images/acervo/)
└── documents/      PDFs de documentos
```

## Rodar no computador

- Mais simples: dê dois cliques no `index.html`.
- Ou, com servidor local (recomendado): `python3 -m http.server 8000` dentro da pasta e abra `http://localhost:8000`.
- Para pular a abertura durante os testes: `http://localhost:8000/?pular`. Links com `#seção` também pulam a abertura.

## Como o conteúdo é organizado

O site só mostra o que tem conteúdo. Campo vazio não aparece, e uma seção sem nada cadastrado fica reduzida ao título e à descrição.
Não há textos nem imagens de preenchimento.

Fotografias e documentos são cadastrados **uma única vez**, no `acervo` do `data.js`. As outras seções apontam para eles pelo `id`:

| Seção | O que mostra | Como se liga ao acervo |
|---|---|---|
| Galeria | todo o acervo, com filtros **Todos / Fotografias / Documentos** | automático |
| Linha do tempo | um evento por ano, em ordem cronológica | `midia: ['id-1', 'id-2']` no evento |
| Antes × Depois | divisor entre duas fotografias do mesmo lugar | `antes: 'id'` e `depois: 'id'` |

"Lugar", "Evento" etc. não são mais filtros: entram como `etiquetas` do item (ex.: `etiquetas: ['Lugar']`).

## Como acrescentar conteúdo (só edite o `data.js`)

| Quero... | Onde |
|---|---|
| Cadastrar uma fotografia ou documento | `acervo`: copie o modelo comentado no topo da lista (`tipo`: `'fotografia'` ou `'documento'`) e coloque o arquivo em `images/` ou `documents/` |
| Acrescentar ou ampliar um evento | `linhaDoTempo`: copie um bloco e mude `id` e `ano` (a ordem é automática). Campos opcionais: `data`, `local`, `midia`, `fonte`, `fonteUrl` |
| Ligar uma foto a um evento | cadastre a foto no `acervo` e escreva o `id` dela em `midia` do evento |
| Ativar uma comparação Antes × Depois | cadastre as duas fotos no `acervo` e acrescente `{ id, local, antes, depois }` em `antesDepois` |
| Referências, créditos e agradecimentos | `sobre` (cartões vazios não aparecem) |

Regras:
- Não escreva fato sem fonte, e preencha sempre `credito` e `fonte` de fotografias e documentos.
- Use fotos só com autorização de uso.
- Fotos em JPG ou WebP, com no máximo uns 1600 px de largura, para carregar rápido no celular.
- Ao acrescentar um item, confira no navegador (computador e celular) antes de salvar no GitHub.

## Salvar no GitHub

```
git add .
git commit -m "Adiciona fotografia ao evento de 1986"
git push
```

Uma alteração por vez, com uma mensagem clara por commit.
Para desfazer uma alteração que deu problema: `git log --oneline`, ache o commit e rode `git revert <código>`.

## Publicar no Netlify

1. Em netlify.com: **Add new site → Import an existing project** e escolha o repositório do GitHub.
2. **Build command:** deixe vazio. **Publish directory:** `.` (a raiz).
3. Cada `git push` na branch publicada gera uma nova versão automaticamente.

## Testes

Testado de forma automática no Chromium (computador, 375 px e 320 px): abertura, menu e menu móvel, linha do tempo
(clique, setas, teclado, ordem cronológica, textos longos), seções sem conteúdo, comparador (mouse, toque e teclado),
filtros e visualizador da galeria, voltar ao topo, imagens ausentes, movimento reduzido, ausência de rolagem horizontal
e de erros no console. Os recursos que dependem de conteúdo (comparador, galeria, fotos nos eventos) foram testados
com dados de teste temporários, que não fazem parte do site.

Falta testar à mão: celular de verdade (Android/Chrome e iPhone/Safari), Firefox e Safari no computador,
leitor de tela (NVDA/TalkBack/VoiceOver) e a velocidade em internet lenta.
