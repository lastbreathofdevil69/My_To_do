document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const themeToggle = document.querySelector('.theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');

    // Theme Management
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    };

    const updateThemeIcon = (theme) => {
        themeToggleIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    };

    const toggleTheme = () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    };

    // Todo Management
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <span class="todo-text">${escapeHtml(todo)}</span>
                <div class="todo-actions">
                    <button class="edit-btn" onclick="editTodo(${index})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteTodo(${index})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            todoList.appendChild(li);
        });
    };

    const addTodo = () => {
        const todoText = todoInput.value.trim();
        if (todoText) {
            todos.push(todoText);
            saveTodos();
            renderTodos();
            todoInput.value = '';
            todoInput.focus();
        }
    };

    // Utility function to escape HTML and prevent XSS
    const escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    // Make functions available globally
    window.editTodo = (index) => {
        const newTodo = prompt('Edit todo:', todos[index]);
        if (newTodo !== null) {
            const trimmedTodo = newTodo.trim();
            if (trimmedTodo) {
                todos[index] = trimmedTodo;
                saveTodos();
                renderTodos();
            }
        }
    };

    window.deleteTodo = (index) => {
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

    themeToggle.addEventListener('click', toggleTheme);

    // Initialize the application
    initTheme();
    renderTodos();
});
