// --- Seleciona os elementos do HTML ---
const todoForm = document.getElementById('todo-form'); // Formulário de novas tarefas
const todoInput = document.getElementById('todo-input'); // Campo de texto
const todoList = document.getElementById('todo-list'); // Lista UL onde as tarefas vão aparecer
const toggleThemeBtn = document.getElementById('toggle-theme'); // Botão de alternância de tema

// --- Carrega as tarefas do localStorage ou cria array vazio ---
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// --- Função para renderizar tarefas na tela ---
function renderTodos() {
  todoList.innerHTML = ''; // Limpa a lista antes de renderizar novamente
  todos.forEach((todo, index) => {
    // Cria um elemento <li>
    const li = document.createElement('li');
    li.textContent = todo.text; // Texto da tarefa

    // Se estiver concluída, adiciona classe especial
    if (todo.completed) li.classList.add('completed');

    // Botão para marcar tarefa como concluída
    const btnComplete = document.createElement('button');
    btnComplete.textContent = '✔';
    btnComplete.onclick = () => toggleComplete(index); // Evento de clique

    // Botão para excluir tarefa
    const btnDelete = document.createElement('button');
    btnDelete.textContent = '🗑';
    btnDelete.onclick = () => deleteTodo(index);

    // Adiciona os botões ao item da lista
    li.appendChild(btnComplete);
    li.appendChild(btnDelete);
    
    // Adiciona <li> à lista
    todoList.appendChild(li);
  });
}

// --- Evento para adicionar tarefa ao enviar o formulário ---
todoForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Impede o reload da página
  todos.push({ text: todoInput.value, completed: false }); // Adiciona nova tarefa no array
  todoInput.value = ''; // Limpa o campo de texto
  saveTodos(); // Salva no localStorage
  renderTodos(); // Atualiza a lista na tela
});

// --- Alterna o status de concluída de uma tarefa ---
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed; // Inverte estado
  saveTodos();
  renderTodos();
}

// --- Exclui uma tarefa pelo índice ---
function deleteTodo(index) {
  todos.splice(index, 1); // Remove item do array
  saveTodos();
  renderTodos();
}

// --- Salva as tarefas no localStorage ---
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos)); // Converte array para texto JSON
}

// --- Renderiza a lista ao carregar a página ---
renderTodos();

// ====================================
//   DARK MODE
// ====================================

// Tema inicial: pega do localStorage ou usa "light"
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(currentTheme); // Aplica classe no body
toggleThemeBtn.textContent = currentTheme === 'light' ? '🌙' : '☀️';

// Evento para alternar entre dark/light
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');  // Se não tiver, adiciona; se tiver, remove
  document.body.classList.toggle('light');

  // Descobre o tema atual após a alternância
  const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme); // Salva preferência
  toggleThemeBtn.textContent = newTheme === 'light' ? '🌙' : '☀️';
});