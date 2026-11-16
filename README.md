# 🧠 PomoBrain

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**PomoBrain** é uma aplicação web estática para gerenciamento de foco e produtividade baseada na **Técnica Pomodoro**. O sistema permite alternar ciclos de concentração e descanso, gerenciar tarefas diárias, reproduzir áudios de foco e consultar técnicas complementares de aprendizagem.

---

## 📋 Visão Geral

O projeto foi desenvolvido para auxiliar estudantes e profissionais a manterem a disciplina por meio de blocos de tempo estruturados, reduzindo a fadiga mental e organizando o progresso diário diretamente no navegador.

### ✨ Principais Recursos
- **Timer Pomodoro:** Modos configurados para Foco (`25 min`), Pausa Curta (`5 min`) e Pausa Longa (`15 min`) com contagem regressiva e alerta sonoro.
- **Gestão de Tarefas:** Criação de atividades diárias com marcação visual de conclusão e acompanhamento de ciclos.
- **Áudio e Foco:** Suporte a alarme de encerramento de ciclo e reprodução de mídia para concentração.
- **Guia de Estudos e FAQ:** Páginas dedicadas explicando a Técnica Pomodoro, métodos complementares (Feynman, Recordação Ativa e Repetição Espaçada) e perguntas frequentes interativas (`<details>` e `<summary>`).
- **Acesso Local (LGPD):** Telas de login e cadastro utilizando `localStorage`, aplicando o princípio de minimização de dados (coleta apenas de e-mail e senha com consentimento explícito).

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica das páginas e componentes nativos interativos.
- **CSS3:** Estilização moderna com gradientes, transparências (*glassmorphism*) e layout responsivo com Flexbox.
- **JavaScript (Vanilla):** Manipulação do DOM, lógica do cronômetro, controle de eventos e persistência local via `localStorage`.

---

## 📁 Estrutura do Projeto

```text
Projeto-PomoBrain/
├── index.html                 # Página principal (Timer, Tarefas e Áudio)
├── pages/
│   ├── metodo.html            # Guia da Técnica Pomodoro e métodos de estudo
│   ├── faq.html               # Vantagens do PomoBrain e Perguntas Frequentes
│   ├── login.html             # Tela de autenticação local
│   └── cadastro.html          # Tela de criação de conta com termo LGPD
├── assets/
│   ├── css/
│   │   ├── style.css          # Estilos globais e layout principal
│   │   └── stylelogin.css     # Estilos específicos de login e cadastro
│   ├── js/
│   │   ├── script.js          # Lógica do timer, tarefas e áudio
│   │   ├── scriptlogin.js     # Validação de acesso no localStorage
│   │   └── scriptcadastro.js  # Registro de usuário no localStorage
│   └── audio/
│       └── alarme.mp3         # Alerta sonoro de fim de ciclo
└── README.md