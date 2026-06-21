# Machado Gamer — Site Oficial

Site do canal **Machado Gamer** com player da Twitch ao vivo, agenda de lives, galeria e links das redes sociais.

🌐 **Site no ar:** https://machadogamer.com

---

## Como editar o conteúdo

Tudo que você precisa trocar está marcado no `index.html` com o comentário `<!-- TROCAR -->`.

| O quê | Onde |
|-------|------|
| Bio / tagline | `index.html` → seções Hero e "Sobre" |
| Foto de perfil, logo, banner, galeria | pasta `assets/` (veja `assets/README.txt`) |
| Horários das lives | `index.html` → seção "Agenda" |
| Vídeos/clipes do carrossel | `data/twitch-videos.json` (veja abaixo) |
| Links de redes (YouTube, TikTok, Discord) | `index.html` → seção "Redes" (descomente os blocos) |
| Seguidores Twitch | **Automático** — atualiza sozinho via DecAPI (não precisa mexer) |
| Seguidores Instagram | **Automático** — um GitHub Action (`.github/workflows/instagram.yml`) atualiza sozinho a cada 6h (veja abaixo). Não precisa mexer. |

### Trocar uma imagem
1. Salve sua imagem na pasta `assets/` (ex.: `perfil.jpg`).
2. No `index.html`, ache o `src` correspondente e ajuste (ex.: `src="assets/perfil.jpg"`).

---

## Carrossel de vídeos/clipes da Twitch

Edite `data/twitch-videos.json` e preencha a lista `videos`. Cada item:

```json
{
  "channel": "machadogameroficial",
  "videos": [
    { "type": "video", "id": "2145487646", "title": "Live de ontem" },
    { "type": "clip",  "id": "SlugDoClipe", "title": "Melhor momento" }
  ]
}
```

- `type`: `"video"` para um VOD/destaque, ou `"clip"` para um clipe.
- `id`:
  - VOD → o número no link `twitch.tv/videos/**2145487646**`.
  - Clipe → o slug no link `clips.twitch.tv/**SlugDoClipe**`.
- Se a lista ficar vazia, aparece um card "Ver todos os vídeos" que leva ao canal.

> **Dica:** só me mande os links dos VODs/clipes que eu preencho o JSON pra você.
> **Automático (opcional):** dá pra um GitHub Action buscar os VODs mais recentes
> sozinho usando a API oficial da Twitch (precisa registrar um app grátis em
> dev.twitch.tv e guardar Client ID/Secret nos GitHub Secrets). A API da Twitch
> **não** é bloqueada por servidor, então aqui isso funciona (diferente do Instagram).

---

## Seguidores do Instagram (automático)

O número de seguidores do Instagram atualiza sozinho, sem precisar editar nada.

- **Como funciona:** o workflow `.github/workflows/instagram.yml` roda a cada 6h,
  lê o perfil `@machadogameroficial` e grava o número em `data/instagram.json`,
  fazendo commit sozinho. A página lê esse arquivo e mostra o valor.
- **Dois caminhos de leitura:** primeiro tenta a API interna do Instagram (número
  exato, ex.: `30177` → `30,2K`); se for bloqueada, cai para a meta-descrição que
  o Instagram entrega a robôs (número já abreviado, ex.: `30K`).
- **Rodar na mão:** aba **Actions** do GitHub → workflow *"Atualiza seguidores do
  Instagram"* → **Run workflow**.

> ⚠️ **Limitação:** o Instagram bloqueia acessos de servidor de forma
> imprevisível, então **algumas rodadas podem falhar**. Quando isso acontece, a
> página simplesmente mantém o último número até a próxima leitura bem-sucedida
> (nunca quebra). Se a falha virar crônica, o caminho definitivo é a **API oficial
> (Graph API)**, que exige conta Business/Creator vinculada a uma Página do Facebook.

> 🔧 **Pré-requisito (já configurado):** em *Settings → Actions → General →
> Workflow permissions*, precisa estar marcado **"Read and write permissions"**
> para o robô conseguir commitar o JSON.

---

## Como publicar atualizações

Depois de editar qualquer arquivo, rode na pasta do projeto:

```bash
git add -A
git commit -m "atualiza conteúdo"
git push
```

O GitHub Pages republica sozinho em ~1 minuto.

---

## Estrutura

```
index.html        Página principal (todas as seções)
css/style.css     Estilo (tema escuro, responsivo)
js/main.js        Menu mobile + ano do rodapé
assets/           Imagens (logo, perfil, banner, galeria)
```

## Observações técnicas

- O player/chat da Twitch usa o parâmetro `parent=romulocreso.github.io`.
  Se um dia mudar o domínio do site, atualize esse valor no `index.html`,
  senão o player não carrega.
- O Instagram não permite embutir o feed completo sem API; por isso usamos
  um botão/link para o perfil. O contador de seguidores é atualizado por um
  GitHub Action (veja a seção "Seguidores do Instagram (automático)").
