document.addEventListener('DOMContentLoaded', (event) => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const clearTasksButton = document.getElementById('clearTasksButton');
    const noTasksMessage = document.getElementById('noTasksMessage');

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
        updateUI(tasks.length > 0);
    };

    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTaskToDOM = (text, completed = false) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.addEventListener('change', updateTaskStatus);

        const span = document.createElement('span');
        span.textContent = text;
       
        li.appendChild(span);
        li.appendChild(checkbox);
        taskList.appendChild(li);
    };

    const updateTaskStatus = (event) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const index = Array.from(taskList.children).indexOf(event.target.parentElement);
        tasks[index].completed = event.target.checked;
        saveTasks(tasks);
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false });
        saveTasks(tasks);
        addTaskToDOM(taskText);
        taskInput.value = '';
        updateUI(true);
    };

    const clearTasks = () => {
        localStorage.removeItem('tasks');
        taskList.innerHTML = '';
        updateUI(false);
    };

    const updateUI = (hasTasks) => {
        noTasksMessage.style.display = hasTasks ? 'none' : 'block';
        clearTasksButton.disabled = !hasTasks;
    };

    addTaskButton.addEventListener('click', addTask);
    clearTasksButton.addEventListener('click', clearTasks);
    loadTasks();
});