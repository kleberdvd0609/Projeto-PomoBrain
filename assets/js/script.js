const tempoDisplay = document.getElementById('tempo-display');
const btnAcao = document.getElementById('btn-acao');
const btnReset = document.getElementById('btn-reset');
const mensagemTexto = document.getElementById('mensagem-texto');
const contadorTexto = document.getElementById('contador-texto');
const somAlarme = document.getElementById('som-alarme');
const formNovaTarefa = document.getElementById('form-nova-tarefa');
const inputNovaTarefa = document.getElementById('input-nova-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');

const botoesModo = {
    foco: document.getElementById('btn-foco'),
    curta: document.getElementById('btn-curta'),
    longa: document.getElementById('btn-longa')
};
const duracoes = { foco: 1500, curta: 300, longa: 900 };
const mensagensModo = {
    foco: 'Hora de focar!',
    curta: 'Pausa Curta. Respire!',
    longa: 'Pausa Longa. Descanse bem!'
};
const chaveTarefas = 'pomobrain_tarefas';

let tempoEmSegundos = duracoes.foco;
let intervaloId = null;
let timestampFim = null;
let modoAtual = 'foco';
let ciclosConcluidos = 0;
let tarefas = carregarTarefas();

function atualizarTela() {
    const min = String(Math.floor(tempoEmSegundos / 60)).padStart(2, '0');
    const seg = String(tempoEmSegundos % 60).padStart(2, '0');
    tempoDisplay.textContent = `${min}:${seg}`;
    document.title = `${min}:${seg} - PomoBrain`;
}

function atualizarEstadoBotao(rodando) {
    btnAcao.textContent = rodando ? 'Pausar' : 'Iniciar';
    btnAcao.classList.toggle('pausando', rodando);
}

function pausarTempo() {
    if (intervaloId !== null) {
        clearInterval(intervaloId);
        intervaloId = null;
        tempoEmSegundos = Math.max(0, Math.ceil((timestampFim - Date.now()) / 1000));
        timestampFim = null;
    }

    atualizarEstadoBotao(false);
    atualizarTela();
}

function iniciarTempo() {
    if (intervaloId !== null) return;

    timestampFim = Date.now() + tempoEmSegundos * 1000;
    intervaloId = setInterval(contagem, 250);
    atualizarEstadoBotao(true);
}

function mudarModo(modo) {
    pausarTempo();
    modoAtual = modo;
    tempoEmSegundos = duracoes[modo];
    mensagemTexto.textContent = mensagensModo[modo];

    Object.entries(botoesModo).forEach(([nome, botao]) => {
        botao.classList.toggle('ativo', nome === modo);
    });
    atualizarTela();
}

async function tocarAlarmeFallback() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
        console.error('Web Audio API não está disponível para reproduzir o alarme.');
        return;
    }

    let contexto;
    try {
        contexto = new AudioContext();
        if (contexto.state === 'suspended') await contexto.resume();

        const oscilador = contexto.createOscillator();
        const volume = contexto.createGain();
        oscilador.type = 'sine';
        oscilador.frequency.setValueAtTime(880, contexto.currentTime);
        volume.gain.setValueAtTime(0.18, contexto.currentTime);
        volume.gain.exponentialRampToValueAtTime(0.001, contexto.currentTime + 0.5);
        oscilador.connect(volume);
        volume.connect(contexto.destination);
        oscilador.addEventListener('ended', () => contexto.close().catch(console.error), { once: true });
        oscilador.start();
        oscilador.stop(contexto.currentTime + 0.5);
    } catch (erro) {
        if (contexto && contexto.state !== 'closed') {
            await contexto.close().catch(console.error);
        }
        console.error('Não foi possível reproduzir o alarme de fallback.', erro);
    }
}

function reproduzirAlarme() {
    if (!somAlarme) return tocarAlarmeFallback();

    try {
        somAlarme.currentTime = 0;
        const reproducao = somAlarme.play();
        if (reproducao) reproducao.catch(tocarAlarmeFallback);
    } catch {
        tocarAlarmeFallback();
    }
}

function relogioBateuZero() {
    reproduzirAlarme();

    if (modoAtual === 'foco') {
        ciclosConcluidos++;
        contadorTexto.textContent = `Pomodoros concluídos: ${ciclosConcluidos}`;
        mudarModo(ciclosConcluidos % 4 === 0 ? 'longa' : 'curta');
    } else {
        mudarModo('foco');
    }

    iniciarTempo();
}

function contagem() {
    if (timestampFim === null) return;

    tempoEmSegundos = Math.max(0, Math.ceil((timestampFim - Date.now()) / 1000));
    atualizarTela();
    if (tempoEmSegundos > 0) return;

    clearInterval(intervaloId);
    intervaloId = null;
    timestampFim = null;
    atualizarEstadoBotao(false);
    relogioBateuZero();
}

function carregarTarefas() {
    try {
        const dados = localStorage.getItem(chaveTarefas);
        if (dados === null) return [];

        const salvas = JSON.parse(dados);
        if (!Array.isArray(salvas)) throw new TypeError('Os dados salvos de tarefas não são uma lista.');

        const validas = salvas.filter((tarefa) =>
            tarefa &&
            (typeof tarefa.id === 'string' || typeof tarefa.id === 'number') &&
            typeof tarefa.texto === 'string' &&
            typeof tarefa.concluida === 'boolean'
        );
        if (validas.length !== salvas.length) {
            console.error('Algumas tarefas salvas foram ignoradas porque têm formato inválido.');
        }
        return validas;
    } catch (erro) {
        console.error('Não foi possível carregar as tarefas salvas.', erro);
        return [];
    }
}

function salvarTarefas() {
    try {
        localStorage.setItem(chaveTarefas, JSON.stringify(tarefas));
    } catch (erro) {
        console.error('Não foi possível salvar as tarefas no navegador.', erro);
    }
}

function criarElementoTarefa(tarefa) {
    const item = document.createElement('li');
    item.className = 'item-tarefa';
    item.dataset.tarefaId = String(tarefa.id);

    const texto = document.createElement('input');
    texto.className = 'input-tarefa';
    texto.type = 'text';
    texto.value = tarefa.texto;
    texto.maxLength = 200;
    texto.setAttribute('aria-label', 'Descrição da tarefa');

    const concluida = document.createElement('input');
    concluida.className = 'checkbox-tarefa';
    concluida.type = 'checkbox';
    concluida.checked = tarefa.concluida;
    concluida.setAttribute('aria-label', 'Marcar tarefa como concluída');

    const remover = document.createElement('button');
    remover.className = 'btn-remover-tarefa';
    remover.type = 'button';
    remover.textContent = 'Excluir';
    remover.setAttribute('aria-label', `Excluir tarefa ${tarefa.texto}`.trim());

    item.append(texto, concluida, remover);
    return item;
}

function renderizarTarefas() {
    const fragmento = document.createDocumentFragment();
    tarefas.forEach((tarefa) => fragmento.appendChild(criarElementoTarefa(tarefa)));
    listaTarefas.replaceChildren(fragmento);
}

formNovaTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const texto = inputNovaTarefa.value.trim();

    if (!texto) {
        inputNovaTarefa.setCustomValidity('Digite uma tarefa.');
        inputNovaTarefa.reportValidity();
        inputNovaTarefa.setCustomValidity('');
        return;
    }

    const tarefa = {
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
        texto,
        concluida: false
    };
    tarefas.push(tarefa);
    listaTarefas.appendChild(criarElementoTarefa(tarefa));
    salvarTarefas();
    formNovaTarefa.reset();
    inputNovaTarefa.focus();
});

listaTarefas.addEventListener('input', (evento) => {
    if (!evento.target.matches('.input-tarefa')) return;

    const item = evento.target.closest('.item-tarefa');
    const tarefa = tarefas.find(({ id }) => String(id) === item.dataset.tarefaId);
    if (!tarefa) return;

    tarefa.texto = evento.target.value;
    item.querySelector('.btn-remover-tarefa')
        .setAttribute('aria-label', `Excluir tarefa ${tarefa.texto}`.trim());
    salvarTarefas();
});

listaTarefas.addEventListener('change', (evento) => {
    if (!evento.target.matches('.checkbox-tarefa')) return;

    const id = evento.target.closest('.item-tarefa').dataset.tarefaId;
    const tarefa = tarefas.find((item) => String(item.id) === id);
    if (!tarefa) return;

    tarefa.concluida = evento.target.checked;
    salvarTarefas();
});

listaTarefas.addEventListener('click', (evento) => {
    const botao = evento.target.closest('.btn-remover-tarefa');
    if (!botao) return;

    const item = botao.closest('.item-tarefa');
    tarefas = tarefas.filter(({ id }) => String(id) !== item.dataset.tarefaId);
    item.remove();
    salvarTarefas();
});

btnAcao.addEventListener('click', () => {
    if (intervaloId === null) iniciarTempo();
    else pausarTempo();
});

btnReset.addEventListener('click', () => mudarModo(modoAtual));
Object.entries(botoesModo).forEach(([modo, botao]) => {
    botao.addEventListener('click', () => mudarModo(modo));
    botao.classList.toggle('ativo', modo === modoAtual);
});
atualizarTela();
renderizarTarefas();
