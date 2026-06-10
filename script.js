const button = document.querySelector("button");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

function updateTaskCounter() {
    taskCounter.textContent =
        `Total Tasks: ${taskList.children.length}`;
}

// Load saved tasks
window.onload = function () {
    let savedTasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => addTaskToUI(task));

    updateTaskCounter();
};

// Add task
button.addEventListener("click", function () {

    const task = input.value.trim();

    if (task !== "") {

        addTaskToUI(task);

        let savedTasks =
            JSON.parse(localStorage.getItem("tasks")) || [];

        savedTasks.push(task);

        localStorage.setItem(
            "tasks",
            JSON.stringify(savedTasks)
        );

        input.value = "";

        updateTaskCounter();
    }
});

// Enter key support
input.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        button.click();
    }

});

function addTaskToUI(task) {

    const li = document.createElement("li");

    li.textContent = task;

    // Complete / Undo
    li.addEventListener("click", function () {

        if (li.style.textDecoration === "line-through") {

            li.style.textDecoration = "none";
            li.style.opacity = "1";

        } else {

            li.style.textDecoration = "line-through";
            li.style.opacity = "0.6";

        }

    });

    // Edit button
    const editBtn = document.createElement("button");

    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", function (e) {

        e.stopPropagation();

        const newTask = prompt(
            "Edit task:",
            task
        );

        if (
            newTask &&
            newTask.trim() !== ""
        ) {

            let savedTasks =
                JSON.parse(
                    localStorage.getItem("tasks")
                ) || [];

            const index =
                savedTasks.indexOf(task);

            if (index !== -1) {

                savedTasks[index] =
                    newTask;

                localStorage.setItem(
                    "tasks",
                    JSON.stringify(savedTasks)
                );
            }

            task = newTask;

            li.childNodes[0].textContent =
                newTask;
        }
    });

    // Delete button
    const deleteBtn =
        document.createElement("button");

    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function (e) {

        e.stopPropagation();

        li.remove();

        let savedTasks =
            JSON.parse(
                localStorage.getItem("tasks")
            ) || [];

        savedTasks =
            savedTasks.filter(
                t => t !== task
            );

        localStorage.setItem(
            "tasks",
            JSON.stringify(savedTasks)
        );

        updateTaskCounter();
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}