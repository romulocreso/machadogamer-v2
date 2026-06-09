# Machado Gamer — Site Oficial

Site do canal **Machado Gamer** com player da Twitch ao vivo, agenda de lives, galeria e links das redes sociais.

🌐 **Site no ar:** https://romulocreso.github.io/machadogamer

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
| Seguidores Instagram | Manual — edite o campo `followers` em `data/instagram.json` (o Instagram bloqueia leitura automática por servidores). Atual: "29K". Para número exato e automático seria preciso a API oficial (conta Business). |

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
  um botão/link para o perfil.
