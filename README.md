# 🤖 Doraemon Cute Toy Arcade

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Made With](https://img.shields.io/badge/Made%20With-JavaScript-yellow)
![UI](https://img.shields.io/badge/UI-Animated-blue)
![Games](https://img.shields.io/badge/Mini%20Games-Enabled-purple)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 🎮 About the Project

A fun Doraemon-inspired **interactive digital toy** that reacts like a living character.  
It has emotions, chat responses (offline brain), and mini arcade games.

No heavy AI nonsense. Just pure fun, logic, and chaos 😏

---

## ✨ Features

### 🎭 Character System
- Doraemon-style animated character
- Emotions system:
  - 😊 Happy
  - 😂 Laughing
  - 😨 Scared
  - 😳 Shocked
  - 😐 Normal
- Blink + idle animations

---

### 💬 Chat System (Offline Brain)
- Keyword-based responses
- Lightweight logic (no AI required)
- Example:
  - "hello" → greeting
  - "mouse" → scared reaction
  - "dorayaki" → happiness 🍩

---

### 🎮 Mini Games
- ❌⭕ Tic Tac Toe
- ✊✋✌️ Rock Paper Scissors
- 🔢 Number Guess Game
- 🧠 Memory Game
- ❓ Quiz Mode

---

### 🗣️ Voice Output (Optional)
- Browser Speech Synthesis
- Doraemon can speak replies (toggleable)

---

### 🎤 Voice Input (Optional)
- Web Speech API / Whisper support
- Voice → Text → Interaction

---

## 🧠 Tech Stack

- HTML5
- CSS3 (Animations)
- Vanilla JavaScript
- Web Speech API (optional)
- WebSocket (optional for voice modules)

---

## 📁 Project Structure

```bash
Doraemon-Toy/
│
├── index.html
├── style.css
├── script.js
│
├── games/
│   ├── tictactoe.js
│   ├── rps.js
│   ├── guess.js
│
└── assets/
    ├── animations
    ├── sprites
