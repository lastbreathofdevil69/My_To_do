document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const themeToggle = document.querySelector('.theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');

    // Theme Management
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    function updateThemeIcon(theme) {
        themeToggleIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <span class="todo-text">${todo}</span>
                <div class="todo-actions">
                    <button class="edit-btn" onclick="editTodo(${index})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteTodo(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            todoList.appendChild(li);
        });
    }

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText) {
            todos.push(todoText);
            saveTodos();
            renderTodos();
            todoInput.value = '';
        }
    }

    // Make functions available globally
    window.editTodo = function(index) {
        const newTodo = prompt('Edit todo:', todos[index]);
        if (newTodo !== null) {
            todos[index] = newTodo.trim();
            saveTodos();
            renderTodos();
        }
    };

    window.deleteTodo = function(index) {
        if (confirm('Are you sure you want to delete this todo?')) {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        }
    };

    // Event Listeners
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // Initial render
    renderTodos();
});
