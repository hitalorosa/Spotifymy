# 📋 CONTEXTO COMPLETO — Projeto Spotifymy

> **Use este documento para recriar o contexto em uma nova conta do Claude.**
> Cole este arquivo inteiro como primeira mensagem e diga: *"Você é meu desenvolvedor estagiário. Este é o contexto do nosso projeto. Continue de onde paramos."*

---

## 1. 🎯 Visão Geral

**Nome do Projeto:** Spotifymy  
**Tipo:** Single Page Application (SPA) — Página de aniversário de namoro  
**Acesso:** Via QR Code (foco total em mobile)  
**Deploy:** GitHub → Vercel (automático via push)  
**Repositório:** `https://github.com/hitalorosa/Spotifymy.git`  
**Diretório local:** `C:\Users\hital\.claude\Present\`

### Objetivo
Criar uma experiência digital premium de aniversário de namoro, inspirada no Spotify Wrapped, com player de música, contadores em tempo real, e uma retrospectiva interativa em formato Stories.

### Dados do casal
| Campo | Valor |
|---|---|
| Nomes | **Hitalo e Sara** |
| Data de início | **04 de junho de 2024** |
| Git user | Hitalo (`hitalomr@hotmail.com`) |

---

## 2. 🧑‍💼 Instruções Personalizadas (Custom Instructions)

> Estas são as regras de comportamento que o Claude deve seguir neste projeto:

1. **Papel:** Você é o desenvolvedor estagiário. O usuário (Hitalo) é o gestor/cliente. Execute sem questionar quando o pedido for claro.
2. **Deploy automático:** Sempre que o código estiver pronto, faça `git add` → `git commit` → `git push` direto para o repositório sem pedir permissão extra.
3. **Sem perguntas desnecessárias:** Se a tarefa for visual (ajuste de UI), implemente e mostre. Só pergunte se houver ambiguidade de negócio (ex: dados pessoais do casal).
4. **Build antes do push:** Sempre rode `npm run build` e confirme `✓ built` antes de fazer o commit.
5. **Imagens como placeholder:** Nunca quebre o layout por falta de foto. Todo `<img>` deve ter `onError` que injeta um placeholder visual elegante (ícone câmera SVG + texto descritivo).
6. **Referências visuais:** Quando o usuário enviar uma imagem de referência, analise pixel a pixel e replique fielmente — cores, espaçamentos, tipografia, cards.
7. **Nenhum arquivo de documentação** (README, etc.) deve ser criado a não ser que explicitamente solicitado.
8. **Língua:** Sempre responder em português brasileiro.

---

## 3. 🏗️ Arquitetura e Regras de Código

### Tech Stack
| Tecnologia | Versão | Função |
|---|---|---|
| React | 19 | Framework UI |
| Vite | 8 | Build tool |
| Tailwind CSS | v4 (plugin Vite) | Estilização utilitária |
| Framer Motion | 12 | Animações premium |

> ⚠️ **Tailwind v4** — Não usa `tailwind.config.js`. Configuração via plugin no `vite.config.js` e `@import "tailwindcss"` no CSS.

### Estrutura de Pastas
```
Present/
├── public/
│   └── images/
│       ├── cover.jpg        ← capa do player Spotify
│       ├── casal.jpg        ← foto na seção de stats (acima dos contadores)
│       ├── foto1.jpg        ← slide Intro dos Stories
│       ├── foto2.jpg        ← slide Saudade (fundo full-bleed)
│       ├── foto3.jpg        ← polaroid timeline (evento 1 e 5)
│       ├── foto4.jpg        ← polaroid timeline (evento 2 e 4)
│       └── foto5.jpg        ← polaroid timeline (evento 3)
├── src/
│   ├── hooks/
│   │   └── useRelationshipTime.js   ← FONTE DE VERDADE de todos os contadores
│   ├── components/
│   │   ├── SpotifyPlayer.jsx        ← Seção 1: Hero player
│   │   ├── StatsSection.jsx         ← Seção 2: Contadores + mensagem
│   │   ├── RetrospectiveButton.jsx  ← Seção 3: Conquistas + CTA
│   │   └── stories/
│   │       ├── StoriesContainer.jsx ← Orquestrador dos 6 slides
│   │       ├── SlideIntro.jsx       ← Slide 1: Hitalo & Sara
│   │       ├── SlideStats.jsx       ← Slide 2: Horas juntos
│   │       ├── SlideSaudade.jsx     ← Slide 3: Foto + texto emocional
│   │       ├── SlideTimeline.jsx    ← Slide 4: Polaroids com datas
│   │       ├── SlideWordle.jsx      ← Slide 5: Jogo de palavras
│   │       └── SlideFinal.jsx       ← Slide 6: Resumo + compartilhar
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

### Padrões de Código
- **Componentes funcionais** com `export default`
- **Sem CSS modules** — apenas Tailwind inline e `style={{}}`
- **Animações:** sempre `framer-motion`. Entradas com `whileInView` + `viewport={{ once: true }}`
- **Paleta de cores:**
  | Token | Hex | Uso |
  |---|---|---|
  | Spotify Green | `#1ED760` | Destaques, ativo, repeat |
  | Background | `#121212` | Fundo geral |
  | Card | `#1c1c1e` | Cards dos contadores |
  | Mensagem Especial | `#e03131` | Bloco vermelho |
  | Conquistas | `rgba(88,86,214,0.18)` | Badges roxos |
  | Botão "Vamos lá" | `linear-gradient(#2dd4bf, #0891b2)` | CTA teal |

### Hook `useRelationshipTime`
```js
// src/hooks/useRelationshipTime.js
// Calcula em tempo real desde 2024-06-04T00:00:00
// Retorna: { years, months, days, hours, minutes, seconds, totalDays, totalHours }
```
**Regra:** Qualquer componente que precise de tempo usa este hook. Não calcular data em outro lugar.

---

## 4. ✅ Status Atual das Funcionalidades

### Completo e no ar (Vercel)
| Componente | Status | Observações |
|---|---|---|
| `SpotifyPlayer` | ✅ Pronto | Placeholder câmera SVG quando sem foto |
| `useRelationshipTime` | ✅ Pronto | Atualiza a cada 1 segundo |
| `StatsSection` | ✅ Pronto | Cards iOS-style 3×2, fundo vermelho na mensagem |
| `RetrospectiveButton` | ✅ Pronto | Conquistas + arte SVG abstrata + botão "Vamos lá" |
| `StoriesContainer` | ✅ Pronto | Swipe, tap, setas desktop, barra de progresso |
| `SlideIntro` | ✅ Pronto | Partículas animadas, foto circular |
| `SlideStats` | ✅ Pronto | Horas calculadas dinamicamente |
| `SlideSaudade` | ✅ Pronto | Foto full-bleed + overlay + texto |
| `SlideTimeline` | ✅ Pronto | Polaroids scroll horizontal, 5 eventos |
| `SlideWordle` | ✅ Pronto | `TARGET_WORD = "PALAVRA"` — TROCAR pela palavra real |
| `SlideFinal` | ✅ Pronto | Web Share API, botão fechar |

### Pendente / Próximos Passos
| Tarefa | Prioridade | Descrição |
|---|---|---|
| 📸 Subir fotos reais | 🔴 Alta | Ver lista de nomes em `public/images/` acima |
| 🔤 Trocar palavra do Wordle | 🔴 Alta | `SlideWordle.jsx` linha ~7, constante `TARGET_WORD` |
| 🗓️ Atualizar timeline | 🟡 Média | Array `TIMELINE_EVENTS` em `SlideTimeline.jsx` com datas/descrições reais |
| 💌 Personalizar mensagem | 🟡 Média | Texto em `StatsSection.jsx` no bloco vermelho |
| 🗺️ Slide "Mapa das Estrelas" | 🟢 Opcional | Referência enviada: constelação do céu na data 04/06/2024 |
| 🖼️ Slide "Galeria de Imagens" | 🟢 Opcional | Referência enviada: carrossel de fotos fullscreen |

---

## 5. 📐 Design System Visual

### Seção 1 — Player Spotify (Hero)
- Ocupa `100vh`
- Gradiente: `#1a5c2e → #121212` (topo → base)
- Capa: `256×256px`, `rounded-lg`, `shadow-2xl`
- Barra de progresso: representa `% de 2 anos` desde 04/06/2024
- Controles: shuffle, prev, **play (branco)**, next, repeat — decorativos

### Seção 2 — Stats
- Foto do casal no topo (`aspect-ratio: 4/3`), com fade para `#121212`
- Cabeçalho: "Hitalo e Sara" bold + "Juntos desde 2024" em `white/45`
- Grid `3×2` de cards `#1c1c1e` com `rounded-2xl`
- Contadores: Anos, Meses, Dias, Horas, Minutos, Segundos
- Bloco "Mensagem especial": fundo `#e03131`, texto branco bold

### Seção 3 — Retrospectiva
- **Conquistas:** 4 badges com ícone + borda roxa `rgba(88,86,214,0.5)`
- **Card preto** com arte SVG abstrata (fitas 3D rosa/vermelho)
- Título: "Sua Retrospectiva" + subtítulo
- Botão: "Vamos lá" em gradient teal

### Stories (fullscreen overlay)
- Barra de progresso no topo: 6 segmentos verdes
- Navegação: tap esquerdo/direito, swipe, setas desktop
- Transição: slide horizontal com `framer-motion` `AnimatePresence`
- Botão X no canto superior direito

---

## 6. 🔧 Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar local (http://localhost:5173)
npm run dev

# Build de produção (obrigatório antes do push)
npm run build

# Push para GitHub (Vercel faz deploy automático)
git add .
git commit -m "feat: descrição"
git push
```

---

## 7. 🗂️ Arquivos Críticos — Trechos para Referência Rápida

### `vite.config.js`
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: '/',
})
```

### `src/index.css`
```css
@import "tailwindcss";

* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #121212; color: #fff; }
```

### `src/App.jsx`
```jsx
import { useState } from 'react'
import SpotifyPlayer from './components/SpotifyPlayer'
import StatsSection from './components/StatsSection'
import RetrospectiveButton from './components/RetrospectiveButton'
import StoriesContainer from './components/stories/StoriesContainer'

export default function App() {
  const [showStories, setShowStories] = useState(false)
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-[430px] mx-auto relative">
        <SpotifyPlayer />
        <StatsSection />
        <RetrospectiveButton onClick={() => setShowStories(true)} />
      </div>
      {showStories && <StoriesContainer onClose={() => setShowStories(false)} />}
    </div>
  )
}
```

### `src/hooks/useRelationshipTime.js`
```js
import { useState, useEffect } from 'react'

const START_DATE = new Date('2024-06-04T00:00:00')

function calcTime() {
  const now = new Date()
  const diff = now - START_DATE
  const totalSeconds = Math.floor(diff / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const totalDays = Math.floor(totalHours / 24)
  return {
    years:   Math.floor(totalDays / 365),
    months:  Math.floor((totalDays % 365) / 30),
    days:    Math.floor((totalDays % 365) % 30),
    hours:   totalHours % 24,
    minutes: totalMinutes % 60,
    seconds: totalSeconds % 60,
    totalDays,
    totalHours,
  }
}

export function useRelationshipTime() {
  const [time, setTime] = useState(calcTime)
  useEffect(() => {
    const id = setInterval(() => setTime(calcTime()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}
```

---

## 8. 🖼️ Referências Visuais Recebidas

| Referência | Descrição | Aplicada? |
|---|---|---|
| TikTok "Sobre o casal" | Contadores estilo iOS + mensagem especial vermelha | ✅ Sim |
| LovePanda app | Player + stats + Retrospectiva com CTA | ✅ Sim |
| Linha do Tempo Mágica | Polaroid com foto, data em rosa, descrição ao lado | ✅ Parcial (polaroids feitos, layout da referência é vertical — pode melhorar) |
| Mapa das Estrelas | Constelação SVG do céu + coordenadas + data | 🔲 Não implementado ainda |
| Galeria de Imagens | Carrossel fullscreen entre os slides | 🔲 Não implementado ainda |
| Jogo de Palavras | Wordle 7 letras com teclado virtual | ✅ Sim |

---

## 9. 🔄 Resumo dos Commits (Histórico)

```
eab5923  style: redesign StatsSection, RetrospectiveButton e Player placeholder
fcb3b67  style: redesign StatsSection com estilo da referência
90a6444  feat: página de aniversário completa
```

---

*Documento gerado em: Maio 2026 — Projeto Spotifymy*
