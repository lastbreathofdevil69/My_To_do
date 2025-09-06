const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  // Change icon depending on theme
  themeToggle.innerHTML = body.classList.contains('dark-mode') ?
    '<i class="fas fa-sun"></i>' :
    '<i class="fas fa-moon"></i>';
});

// Simple To-Do logic
const form = document.getElementById('task-form');
const newTaskInput = document.getElementById('new-task');
const tasksList = document.getElementById('tasks');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const taskText = newTaskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    newTaskInput.value = '';
  }
});

function addTask(text) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${text}</span>
    <span class="actions">
      <i class="fas fa-edit" onclick="editTask(this)"></i>
      <i class="fas fa-trash" onclick="deleteTask(this)"></i>
    </span>
  `;
  tasksList.appendChild(li);
}

window.editTask = function(icon) {
  const li = icon.closest('li');
  const span = li.querySelector('span');
  const currentText = span.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentText;
  input.onblur = () => {
    span.textContent = input.value;
  };
  span.textContent = '';
  span.appendChild(input);
  input.focus();
};

window.deleteTask = function(icon) {
  const li = icon.closest('li');
  li.remove();
};
