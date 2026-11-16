// 1. Seleção de elementos
const tempoDisplay = document.getElementById('tempo-display');
const btnAcao = document.getElementById('btn-acao');
const mensagemTexto = document.getElementById('mensagem-texto');
const contadorTexto = document.getElementById('contador-texto');

const btnFoco = document.getElementById('btn-foco');
const btnCurta = document.getElementById('btn-curta');
const btnLonga = document.getElementById('btn-longa');

// Puxa o elemento de áudio que criamos no HTML
const somAlarme = document.getElementById('som-alarme');

// 2. Variáveis globais de controle
let tempoEmSegundos = 25 * 60;
let intervaloId = null;
let modoAtual = 'foco';
let ciclosConcluidos = 0;

function pausarTempo() {
    clearInterval(intervaloId);
    intervaloId = null;
    btnAcao.textContent = 'Iniciar';
}

function iniciarTempo() {
    if (intervaloId !== null) {
        return;
    }

    intervaloId = setInterval(contagem, 1000);
    btnAcao.textContent = 'Pausar';
}

// 3. Atualiza o texto "MM:SS" na tela
function atualizarTela() {
    const min = String(Math.floor(tempoEmSegundos / 60)).padStart(2, '0');
    const seg = String(tempoEmSegundos % 60).padStart(2, '0');
    tempoDisplay.textContent = `${min}:${seg}`;
}

// 4. Lógica para trocar de modo (Foco, Curta ou Longa)
function mudarModo(novoModo) {
    pausarTempo();
    modoAtual = novoModo;

    if (modoAtual === 'foco') {
        tempoEmSegundos = 25 * 60;
        mensagemTexto.textContent = 'Hora de focar!';
    } else if (modoAtual === 'curta') {
        tempoEmSegundos = 5 * 60;
        mensagemTexto.textContent = 'Pausa Curta. Respire!';
    } else if (modoAtual === 'longa') {
        tempoEmSegundos = 15 * 60;
        mensagemTexto.textContent = 'Pausa Longa. Descanse bem!';
    }

    atualizarTela();
}

// 5. O que acontece quando o relógio zera
function relogioBateuZero() {
    if (somAlarme) {
        somAlarme.currentTime = 0;
        somAlarme.play().catch(() => {
            // O navegador bloqueia autoplay até haver interação do usuário.
        });
    }

    if (modoAtual === 'foco') {
        ciclosConcluidos++;
        contadorTexto.textContent = `Sessão: #${ciclosConcluidos}`;

        if (ciclosConcluidos % 4 === 0) {
            mudarModo('longa');
        } else {
            mudarModo('curta');
        }
    } else {
        mudarModo('foco');
    }

    iniciarTempo();
}

// 6. Lógica de decrementar o tempo
function contagem() {
    if (tempoEmSegundos > 0) {
        tempoEmSegundos--;
        atualizarTela();
    } else {
        relogioBateuZero();
    }
}

// 7. Botão Único (Play/Pause)
btnAcao.addEventListener('click', () => {
    if (intervaloId === null) {
        iniciarTempo();
    } else {
        pausarTempo();
    }
});

// 8. Botões manuais de troca de modo
btnFoco.addEventListener('click', () => mudarModo('foco'));
btnCurta.addEventListener('click', () => mudarModo('curta'));
btnLonga.addEventListener('click', () => mudarModo('longa'));