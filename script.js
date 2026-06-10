const button = document.querySelector("button");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const emptyMessage = document.getElementById("emptyMessage");
const darkModeBtn = document.getElementById("darkModeBtn");

function updateTaskCounter() {
    taskCounter.textContent = `Total Tasks: ${taskList.children.length}`;
}

function updateEmptyState() {
    if (taskList.children.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

// Save all tasks
function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.dataset.task,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load saved tasks
window.onload = function () {

    let savedTasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {
        addTaskToUI(task.text, task.completed);
    });

    updateTaskCounter();
    updateEmptyState();

    // Load Dark Mode
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeBtn.textContent = "☀️ Light Mode";
    }
};

// Add task
button.addEventListener("click", function () {

    const task = input.value.trim();

    if (task !== "") {

        addTaskToUI(task, false);

        saveTasks();

        input.value = "";

        updateTaskCounter();
        updateEmptyState();
    }
});

// Enter key support
input.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        button.click();
    }

});

// Dark Mode Toggle
darkModeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem(
            "darkMode",
            "enabled"
        );

        darkModeBtn.textContent =
            "☀️ Light Mode";

    } else {

        localStorage.setItem(
            "darkMode",
            "disabled"
        );

        darkModeBtn.textContent =
            "🌙 Dark Mode";
    }

});

function addTaskToUI(task, completed = false) {

    const li = document.createElement("li");

    li.dataset.task = task;
    li.textContent = task;

    if (completed) {
        li.classList.add("completed");
        li.style.textDecoration = "line-through";
        li.style.opacity = "0.6";
    }

    // Complete / Undo
    li.addEventListener("click", function () {

        li.classList.toggle("completed");

        if (li.classList.contains("completed")) {

            li.style.textDecoration = "line-through";
            li.style.opacity = "0.6";

        } else {

            li.style.textDecoration = "none";
            li.style.opacity = "1";

        }

        saveTasks();
    });

    // Edit Button
    const editBtn = document.createElement("button");

    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", function (e) {

        e.stopPropagation();

        const newTask = prompt("Edit task:", li.dataset.task);

        if (newTask && newTask.trim() !== "") {

            li.dataset.task = newTask;
            li.childNodes[0].textContent = newTask;

            saveTasks();
        }
    });

    // Delete Button
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function (e) {

        e.stopPropagation();

        li.remove();

        saveTasks();

        updateTaskCounter();
        updateEmptyState();
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}