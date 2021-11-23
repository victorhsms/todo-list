// Constante referente a lista ordenada e se repete ao longo do código
const listaOrdenada = document.querySelector('#lista-tarefas');

// Constante para a cor cinza que se repete no projetos
const cinza = 'rgb(128, 128, 128)';

// Array dos itens salvos
let arraySalvos = [];
let arrayClasseSalvos = [];

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
    item.style.backgroundColor = cinza;
  },

  // Evento de criar tarefa
  escreverTarefa() {
    const inputTarefa = document.querySelector('#texto-tarefa');
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

const eventosRemover = {
  // Evento que remove todos os itens da lista
  removerTodosItens() {
    listaOrdenada.innerHTML = '';
  },

  // Evento que remove todos os itens da lista que foram finalizados
  removerItensFinalizados() {
    const finalizados = document.querySelectorAll('.completed');
    for (let i = 0; i < finalizados.length; i += 1) {
      // src: https://developer.mozilla.org/pt-BR/docs/Web/API/Node/removeChild
      listaOrdenada.removeChild(finalizados[i]);
    }
  },

  // Evento que remove item selecionado
  removeItemSelecionado() {
    const todosOsitens = document.querySelectorAll('.item');

    for (let i = 0; i < todosOsitens.length; i += 1) {
      if (todosOsitens[i].style.backgroundColor === cinza) {
        // src: https://developer.mozilla.org/pt-BR/docs/Web/API/Node/removeChild
        listaOrdenada.removeChild(todosOsitens[i]);
      }
    }
  },
};
const moverItens = {
  // Mover item para cima
  paraCima() {
    const todosOsItens = document.querySelectorAll('.item');

    for (let i = 0; i < todosOsItens.length; i += 1) {
      if (todosOsItens[i].style.backgroundColor === cinza && i !== 0) {
        // src: https://www.ti-enxame.com/pt/javascript/como-trocar-nos-filhos-do-dom-em-javascript/941877916/
        listaOrdenada.insertBefore(todosOsItens[i], todosOsItens[i - 1]);
      }
    }
  },

  // Mover item para baixo
  paraBaixo() {
    const todosOsItens = document.querySelectorAll('.item');

    for (let i = 0; i < todosOsItens.length; i += 1) {
      if (todosOsItens[i].style.backgroundColor === cinza && i !== todosOsItens.length - 1) {
        // src: https://www.ti-enxame.com/pt/javascript/como-trocar-nos-filhos-do-dom-em-javascript/941877916/
        listaOrdenada.insertBefore(todosOsItens[i + 1], todosOsItens[i]);
      }
    }
  },
};

const itensSalvos = {
  retirarStorage() {
    arraySalvos = [];
    arrayClasseSalvos = [];

    // src: https://pt.stackoverflow.com/questions/329223/armazenar-um-array-de-objetos-em-um-local-storage-com-js
    arraySalvos = JSON.parse(localStorage.getItem('valor'));
    arrayClasseSalvos = JSON.parse(localStorage.getItem('classe'));
  },

  iniciarComStorage() {
    itensSalvos.retirarStorage();

    for (let i = 0; i < arraySalvos.length; i += 1) {
      const itemTarefa = document.createElement('li');
      itemTarefa.className = arrayClasseSalvos[i];
      itemTarefa.innerText = arraySalvos[i];

      // Função para colorir ao clicar no item
      itemTarefa.addEventListener('click', listaTarefas.colorirItem);

      // Função para selecionar ao clicar duas vezes no itemTarefa
      itemTarefa.addEventListener('dblclick', listaTarefas.finalizarTarefa);

      listaOrdenada.appendChild(itemTarefa);
    }
  },

  colocarStorage() {
    const itens = document.querySelectorAll('.item');
    arraySalvos = [];
    arrayClasseSalvos = [];
    localStorage.clear();

    for (let i = 0; i < itens.length; i += 1) {
      arraySalvos.push(itens[i].innerText);
      arrayClasseSalvos.push(itens[i].className);
    }

    // src: https://pt.stackoverflow.com/questions/329223/armazenar-um-array-de-objetos-em-um-local-storage-com-js
    localStorage.setItem('valor', JSON.stringify(arraySalvos));
    localStorage.setItem('classe', JSON.stringify(arrayClasseSalvos));
  },
};

function iniciarDom() {
  if (localStorage.length >= 1) {
    // src: https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/length
    itensSalvos.iniciarComStorage(); // Inicia site com itens do localStorage
  }
  const criarTarefa = document.querySelector('#criar-tarefa');
  const btnRmv = document.querySelector('#apaga-tudo');
  const btnRmvFinalizados = document.querySelector('#remover-finalizados');
  const btnRmvSelecionado = document.querySelector('#remover-selecionado');
  const btnMoveCima = document.querySelector('#mover-cima');
  const btnMoveBaixo = document.querySelector('#mover-baixo');
  const btnSalvarLista = document.querySelector('#salvar-tarefas');
  criarTarefa.addEventListener('click', listaTarefas.escreverTarefa); // Inicia evento de criar novas tarefas
  btnRmv.addEventListener('click', eventosRemover.removerTodosItens); // Inicia evento de apagar todos os itens da lista tarefas
  btnRmvFinalizados.addEventListener('click', eventosRemover.removerItensFinalizados); // Inicia evento de apagar todos os itens da lista tarefas que foram finalizados
  btnRmvSelecionado.addEventListener('click', eventosRemover.removeItemSelecionado); // Inicia evento de apagar o item selecionado
  btnMoveCima.addEventListener('click', moverItens.paraCima); // Inicia evento de mover item selecionado para cima
  btnMoveBaixo.addEventListener('click', moverItens.paraBaixo); // Inicia evento de mover item selecionado para baixo
  btnSalvarLista.addEventListener('click', itensSalvos.colocarStorage); // Inicia evento de salvar tarefas atuais no localStorage
}

// Programa inicia por aqui
iniciarDom();
