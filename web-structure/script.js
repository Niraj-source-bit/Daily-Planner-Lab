document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const priorityInput = document.getElementById('priority-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');

    // Set current date
    document.getElementById('date-display').textContent = new Date().toLocaleDateString();

    // 1. Logic to Add Task
    addBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        const priority = priorityInput.value;

        if (text === "") return;

        createTaskElement(text, priority);
        taskInput.value = "";
        updateEmptyState();
    });

    // 2. Logic to Create Element (No innerHTML for layouts)
    function createTaskElement(text, priority) {
        const li = document.createElement('li');
        li.className = `task-item ${priority}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
        });

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = text;

        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.textContent = 'Remove';
        delBtn.addEventListener('click', () => {
            li.remove();
            updateEmptyState();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    }

    // 3. Logic for Empty State
    function updateEmptyState() {
        if (taskList.children.length > 0) {
            emptyState.classList.add('hidden');
        } else {
            emptyState.classList.remove('hidden');
        }
    }

    // 4. Filtering Logic (Simple Toggle)
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            const items = taskList.querySelectorAll('.task-item');

            items.forEach(item => {
                if (filter === 'all' || item.classList.contains('high')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});