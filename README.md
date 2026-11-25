# 🧠 PomoBrain

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

O **PomoBrain** é uma aplicação web estática de foco e produtividade baseada na Técnica Pomodoro. O projeto funciona no navegador e não requer backend nem instalação de dependências.

## Recursos

- **Cronômetro Pomodoro:** modos de foco (25 minutos), pausa curta (5 minutos) e pausa longa (15 minutos), com iniciar, pausar e resetar.
- **Ciclos:** alternância automática entre foco e pausas, com pausa longa após quatro ciclos de foco e contador de Pomodoros concluídos.
- **Precisão do timer:** cálculo do tempo restante por timestamp, mantendo a contagem correta quando a aba fica em segundo plano.
- **Tarefas:** adicionar, editar, concluir e excluir tarefas. A lista é salva automaticamente no navegador com `localStorage`.
- **Alarme:** reprodução de `assets/audio/alarme.mp3`, com som de fallback via Web Audio API se o arquivo não puder ser reproduzido.
- **Conteúdo de estudo:** páginas sobre o método Pomodoro, técnicas de estudo e perguntas frequentes.

## Executar

Abra `index.html` usando uma extensão de servidor estático, como Live Server no VS Code. O servidor local permite que o navegador mantenha os dados das tarefas no `localStorage`.

## Tecnologias

- HTML5 semântico
- CSS3 com variáveis de tema e layout responsivo
- JavaScript nativo
- `localStorage` e Web Audio API

## Estrutura

```text
Projeto-PomoBrain/
├── index.html
├── pages/
│   ├── metodo.html
│   └── faq.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── audio/
│       └── alarme.mp3
└── README.md
```
