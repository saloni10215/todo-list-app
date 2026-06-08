const button = document.querySelector("button");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks
window.onload = function () {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => addTaskToUI(task));
};

button.addEventListener("click", function () {
    const task = input.value;

    if (task !== "") {
        addTaskToUI(task);

        let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));

        input.value = "";
    }
});

function addTaskToUI(task) {
    const li = document.createElement("li");
    li.textContent = task;

    li.addEventListener("click", function () {
    if (li.style.textDecoration === "line-through") {
        li.style.textDecoration = "none";
        li.style.color = "black";
    } else {
        li.style.textDecoration = "line-through";
        li.style.color = "gray";
    }
});

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

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}