# 🧠 Notes AI — Prise de Notes Augmentée par l’IA

> **Une révolution cognitive open-source** : prise de notes intelligente, auto-structurée, interconnectée et évolutive. Propulsée par IA, optimisée pour votre mémoire.

---

## 🚀 À propos du projet

**Neural Notes** est une application de prise de notes nouvelle génération, combinant :
- Structuration automatique par IA (titres, tags, liens, arborescences)
- Graphe sémantique dynamique des idées
- Collaboration assistée par l’IA
- Embedding contextuel intelligent
- Versioning évolutif des notes

Inspirée d’Obsidian, Notion, Logseq, Bear, Mem.ai et augmentée d’intelligence artificielle, Neural Notes vise à devenir **l’interface entre votre pensée, votre mémoire et votre avenir intellectuel.**

---

## ✨ Fonctionnalités principales

| Module | Description |
|--------|-------------|
| 🧠 Auto-Structuration | Analyse sémantique et contextuelle des notes, génération automatique d’outline, tags, backlinks |
| 🕸️ Graphe Cognitif | Visualisation évolutive des relations entre concepts, timeline, clusters thématiques |
| 📌 Embedding Contextuel | Insertion intelligente dans Slack, Notion, Web, etc. avec adaptation automatique |
| 🧬 Historique & Versioning | Suivi de l’évolution des idées, système de branches et de révisions |
| 🤝 Collaboration IA | Edition multi-utilisateur, fusion intelligente de contenu, suggestions croisées |
| 🎧 Transcription & OCR | Conversion automatique d’audio et d’images en notes exploitables |
| 📚 Apprentissage personnel | Quiz auto-générés, fiches de révision, synthèses hebdomadaires |

---

## 📐 Architecture Technique

- **Frontend** : `SvelteKit` + `Tailwind CSS`
- **Application Desktop** : `Electron.js`
- **Backend** : `Node.js` (serveur local intégré à Electron)
- **Stockage** :
  - Notes : `Markdown` + `YAML`
  - Base locale : `SQLite` via `better-sqlite3` ou `Dexie.js`
  - Option Cloud : `PostgreSQL` (future synchronisation)
- **IA** :
  - Embedding : `OpenAI API` ou modèle local `LLaMA 3`
  - NLP : `LangChain`, `spaCy`, `transformers`
  - Transcription audio : `Whisper API`
  - OCR : `Tesseract.js`
- **Synchronisation** : `Syncthing` (P2P, E2E)

---

## ⚙️ Installation (mode développeur)

> Prérequis : `Node.js`, `pnpm`, `Python3` (pour NLP), `Electron`

```bash
# 1. Cloner le repo
git clone https://github.com/nmeedg/note_ai.git
cd note_ai

# 2. Installer les dépendances
yarn install

# 3. Lancer le mode développement Electron
yarn run dev
