# Banner LGPD — Clínica Vida

Banner de consentimento de cookies com três categorias (Essenciais, Análise e Marketing). O visitante escolhe o que aceitar, as preferências ficam salvas em cookies por um ano e o banner só reaparece se ele clicar em "Reabrir preferências". O painel de status mostra, em tempo real, quais categorias estão ativas.

## Link do GitHub Pages

> Substitua pelo seu link após publicar:
> `https://seu-usuario.github.io/banner-lgpd/`

## Estrutura

```
banner-lgpd/
├── index.html   # página principal
├── style.css    # estilos
├── script.js    # cookies e lógica do banner
└── README.md    # este arquivo
```

## Como testar

1. Abra o projeto com o **Live Server** (não use `file://`, pois cookies são bloqueados).
2. Na primeira visita, o banner aparece no rodapé e nenhum cookie de consentimento existe.
3. Clique em **"Aceitar todos"**: o banner desaparece e os cookies abaixo são gravados.
4. Recarregue (F5): o banner não aparece e o painel mostra Análise e Marketing como "Ativo".
5. Clique em **"Reabrir preferências"**, desmarque Marketing e use **"Salvar seleção"**.
6. No DevTools (F12 → Application → Storage → Cookies), confira os valores e recarregue para validar o painel.

## Cookies gravados

| Cookie | Valores possíveis | Função |
| --- | --- | --- |
| `consentimento_lgpd` | `todos`, `essenciais`, `custom` | Indica se o usuário já consentiu e de que forma |
| `cat_analise` | `sim`, `nao` | Cookies de análise liberados ou não |
| `cat_marketing` | `sim`, `nao` | Cookies de marketing liberados ou não |

Todos usam `max-age=31536000` (1 ano), `path=/` e `SameSite=Lax`. Os cookies essenciais estão sempre ativos e não dependem de autorização.
