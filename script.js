
const listaTarefas = {
  // Evento que vê se tarefa está como finalizada ou não e troca a classe
  finalizarTarefa(event) {
    const tarefa = event.target;

    if (tarefa.className === 'item completed') {
      tarefa.className = 'item';
    } else {
      tarefa.className = 'item completed';
    }
  },

  // Evento de descolorir tarefas anteriores
  descolorirItens() {
    const itens = document.querySelectorAll('.item');

    for (let i = 0; i < itens.length; i += 1) {
      itens[i].style.backgroundColor = 'rgb(250, 250, 250)';
    }
  },
  
  // Evento de Colorir tarefa
  colorirItem(event) {
    listaTarefas.descolorirItens();
    const item = event.target;
    item.style.backgroundColor = 'rgb(128, 128, 128)'
  },
  
  // Evento de criar tarefa
  escreverTarefa() {
    const inputTarefa = document.querySelector('#texto-tarefa');
    const listaOrdenada = document.querySelector('#lista-tarefas');
    const itemTarefa = document.createElement('li');
    itemTarefa.className = 'item';
    itemTarefa.innerText = inputTarefa.value;

    // Função para colorir ao clicar no item
    itemTarefa.addEventListener('click', listaTarefas.colorirItem);

    // Função para selecionar ao clicar duas vezes no itemTarefa
    itemTarefa.addEventListener('dblclick', listaTarefas.finalizarTarefa);

    listaOrdenada.appendChild(itemTarefa);
    inputTarefa.value = '';
  },
};

function iniciarDom() {
  // Inicia evento de criar novas tarefas
  const criarTarefa = document.querySelector('#criar-tarefa');
  criarTarefa.addEventListener('click', listaTarefas.escreverTarefa);
}

// Programa inicia por aqui
iniciarDom();
