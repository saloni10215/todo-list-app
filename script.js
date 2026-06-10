const button = document.querySelector("button");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks
window.onload = function () {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => addTaskToUI(task));
};

// Add task using button
button.addEventListener("click", function () {
    const task = input.value.trim();

    if (task !== "") {
        addTaskToUI(task);

        let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));

        input.value = "";
    }
});

// Add task using Enter key
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        button.click();
    }
});

function addTaskToUI(task) {
    const li = document.createElement("li");
    li.textContent = task;

    // Mark completed
    li.addEventListener("click", function () {
        if (li.style.textDecoration === "line-through") {
            li.style.textDecoration = "none";
            li.style.color = "black";
        } else {
            li.style.textDecoration = "line-through";
            li.style.color = "gray";
        }
    });

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.style.marginLeft = "10px";

    editBtn.addEventListener("click", function (e) {
        e.stopPropagation();

        const newTask = prompt("Edit task:", task);

        if (newTask && newTask.trim() !== "") {

            let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const index = savedTasks.indexOf(task);

            if (index !== -1) {
                savedTasks[index] = newTask;
                localStorage.setItem("tasks", JSON.stringify(savedTasks));
            }

            task = newTask;

            // Update displayed text while keeping buttons
            li.childNodes[0].textContent = newTask;
        }
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();

        li.remove();

        let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks = savedTasks.filter(t => t !== task);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}