# Museu Digital de Alvorada d’Oeste — Versão 1.0 (protótipo)

Site estático (HTML, CSS e JavaScript puros), sem framework, sem banco de dados e sem chaves de API.
Funciona abrindo o `index.html` e publica direto no Netlify.

> **Importante:** esta V1 foi criada do zero. O repositório
> `JoaoVitorFN/museu-digital-alvorada` não estava acessível durante a criação, então **nada do que já existe lá foi lido ou alterado**.
> Antes de copiar estes arquivos para o repositório, compare com o que já existe (veja "Juntar com o repositório").

## Arquivos

```
museu-digital-alvorada/
├── index.html      estrutura do site (abertura, menu, seções, visualizador)
├── style.css       visual, responsividade, animações e movimento reduzido
├── script.js       interações (lê os dados do data.js)
├── data.js         TODO o conteúdo editável (textos, fotos, pontos do mapa, referências)
├── images/         home/ timeline/ gallery/ maps/ before-after/
└── documents/      PDFs e documentos de referência
```

## Rodar no computador

- Mais simples: dê dois cliques no `index.html`.
- Ou, com servidor local (recomendado): `python3 -m http.server 8000` dentro da pasta e abra `http://localhost:8000`.
- Para pular a abertura durante os testes: `http://localhost:8000/?pular`. Links com `#seção` também pulam a abertura.

## Como acrescentar conteúdo (só edite o `data.js`)

| Quero... | Onde |
|---|---|
| Preencher um acontecimento | `linhaDoTempo` → troque os `[INSERIR ...]`, preencha `fonte` e mude `status` para `'verificado'` |
| Acrescentar um ano | copie um bloco de `linhaDoTempo`, mude `id` e `ano` |
| Colocar uma foto num evento | salve em `images/timeline/` e escreva `imagem: 'images/timeline/ev-1986.jpg'` (com `alt`, `legenda`, `credito`) |
| Trocar o mapa demonstrativo | ponha o mapa real em `images/maps/`, mude `mapa.imagem`, `demonstrativo: false` e ajuste `x`/`y` (em %) de cada ponto |
| Acrescentar um ponto no mapa | copie um bloco de `mapa.pontos` (use `eventoId` para ligar à linha do tempo) |
| Usar fotos reais no Antes × Depois | troque os caminhos em `antesDepois`, preencha período, crédito e fonte, `demonstrativo: false` |
| Acrescentar item na galeria | copie um bloco de `galeria.itens` (`categoria`: documentos, fotos, lugares ou eventos; `arquivo` aponta para um PDF em `documents/`) |
| Referências, créditos, agradecimentos | `sobre` |

Regras: não escreva fato sem fonte; texto entre `[colchetes]` aparece destacado como espaço reservado;
preencha sempre `credito` e `fonte`; use as fotos só com autorização de uso.
As fotos devem ser JPG/WebP com no máximo uns 1600 px de largura, para o site carregar rápido no celular.

## Juntar com o repositório

1. Clone o repositório e crie uma branch: `git checkout -b v1-museu`.
2. Compare os arquivos existentes com estes (`git diff --no-index pasta-antiga pasta-nova` ou o VS Code).
3. Copie o que fizer sentido, sem apagar o que já funciona.
4. Teste abrindo o site.

## Salvar no GitHub

```
git add .
git commit -m "Adiciona versão 1.0 do museu digital"
git push
```

Uma alteração por vez, uma mensagem clara por commit (ex.: `Adiciona fotografia ao evento de 1986`).
Para desfazer uma alteração que deu problema: `git log --oneline`, ache o commit e rode `git revert <código>`.

## Publicar no Netlify

1. Em netlify.com: **Add new site → Import an existing project** e escolha o repositório do GitHub.
2. **Build command:** deixe vazio. **Publish directory:** `.` (a raiz).
3. Cada `git push` na branch publicada gera uma nova versão automaticamente.

## O que foi testado e o que falta

Testado de forma automática no Chromium (computador, 375 px e 320 px): abertura, menu e menu móvel, linha do tempo
(clique, setas, teclado), mapa, comparador (mouse, toque e teclado), filtros e visualizador da galeria, voltar ao topo,
imagens ausentes, movimento reduzido, ausência de rolagem horizontal e ausência de erros no console.

Falta testar à mão: celular de verdade (Android/Chrome e iPhone/Safari), Firefox e Safari no computador,
leitor de tela (NVDA/TalkBack/VoiceOver) e a velocidade em internet lenta.

## Limites conhecidos da V1

- O mapa é **demonstrativo**: a imagem é um esquema e as posições dos pontos não são coordenadas reais.
- As imagens do Antes × Depois são **ilustrações genéricas** com marca d’água, não fotografias.
- Os anos 1978, 1979, 1981, 1986, 1989 e Hoje são só a estrutura inicial e precisam ser revisados.
- As fontes de letra são as do sistema (sem download externo). Se quiser, dá para trocar por uma fonte do Google Fonts depois.
