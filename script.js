
function getTaskFormData() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;

    return {
        title,
        description,
        dueDate,
        priority,
        status: "upcoming"
    };
}



document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");

    taskForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const task = getTaskFormData();
        addTask(task);
        clearForm();
    });

    function addTask(task) {
        const taskItem = createTaskItem(task);
        if (taskList) {
            taskList.appendChild(taskItem);
            updateDashboard();
            clearForm();
        }
    }

    function createTaskItem(task) {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        if (task.status === "completed") {
            taskItem.classList.add("completed-task");
        }

        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>Description: ${task.description}</p>
            <p>Due Date: ${task.dueDate}</p>
            <p>Priority: ${task.priority}</p>
            <button onclick="completeTask(this)">Complete</button>
        `;

        if (task.status !== "completed") {
            taskItem.innerHTML += `
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            `;
        }

        return taskItem;
    }

    function updateDashboard() {
        const upcomingTasks = document.getElementById("upcomingTasks");
        const overdueTasks = document.getElementById("overdueTasks");
        const completedTasks = document.getElementById("completedTasks");

        if (upcomingTasks && overdueTasks && completedTasks) {
            upcomingTasks.innerHTML = "";
            overdueTasks.innerHTML = "";
            completedTasks.innerHTML = "";

            taskList.childNodes.forEach(taskItem => {
                const task = getTaskFromTaskItem(taskItem);

                if (task.status === "completed") {
                    displayTaskInList(completedTasks, task);
                } else if (isOverdue(task.dueDate)) {
                    displayTaskInList(overdueTasks, task);
                } else {
                    displayTaskInList(upcomingTasks, task);
                }
            });
        }
    }

    function displayTaskInList(listElement, task) {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = `
            <h5>${task.title}</h5>
            <p>Description: ${task.description}</p>
            <p>Due Date: ${task.dueDate}</p>
            <p>Priority: ${task.priority}</p>
        `;
        listElement.appendChild(listItem);
    }

    function isOverdue(dueDate) {
        const today = new Date();
        const due = new Date(dueDate);
        return today > due;
    }

    window.completeTask = function (button) {
        const taskItem = button.parentElement;
        taskItem.classList.toggle("completed-task");

        const statusMessage = document.createElement("p");
        statusMessage.innerText = "Task completed!";
        statusMessage.style.color = "green";
        taskItem.appendChild(statusMessage);

        if (taskItem.classList.contains("completed-task")) {
            taskItem.style.backgroundColor = "#e3f0f1";
        } else {
            taskItem.style.backgroundColor = "";
        }

        button.style.display = "none";
    };

    window.editTask = function (button) {
        const taskItem = button.parentElement;
        const task = getTaskFromTaskItem(taskItem);
        clearForm();

        document.getElementById("title").value = task.title;
        document.getElementById("description").value = task.description;
        document.getElementById("dueDate").value = task.dueDate;
        document.getElementById("priority").value = task.priority;

        taskItem.remove();
    };

    window.deleteTask = function (button) {
        const taskItem = button.parentElement;
        taskItem.remove();
    };

    function getTaskFromTaskItem(taskItem) {
        const title = taskItem.querySelector("h3").innerText;
        const description = taskItem.querySelector("p:nth-child(2)").innerText.split(": ")[1];
        const dueDate = taskItem.querySelector("p:nth-child(3)").innerText.split(": ")[1];
        const priority = taskItem.querySelector("p:nth-child(4)").innerText.split(": ")[1];

        return {
            title,
            description,
            dueDate,
            priority
        };
    }

    function clearForm() {
        document.getElementById("taskForm").reset();
        const statusMessages = document.querySelectorAll(".completed-task p");
        statusMessages.forEach(message => {
            message.remove();
        });
    }
});

function searchTasks() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();

    document.querySelectorAll(".task-item").forEach(taskItem => {
        const task = getTaskFromTaskItem(taskItem);
        const taskText = `${task.title} ${task.description} ${task.dueDate} ${task.priority}`.toLowerCase();

        if (taskText.includes(searchInput)) {
            taskItem.style.display = "block";
        } else {
            taskItem.style.display = "none";
        }
    });
}

function filterTasks(filter) {
    document.querySelectorAll(".task-item").forEach(taskItem => {
        const task = getTaskFromTaskItem(taskItem);

        if (filter === 'all' || task.priority.toLowerCase() === filter) {
            taskItem.style.display = "block";
        } else {
            taskItem.style.display = "none";
        }
    });
}


function getTaskFromTaskItem(taskItem) {
    const title = taskItem.querySelector("h3").innerText;
    const description = taskItem.querySelector("p:nth-child(2)").innerText.split(": ")[1];
    const dueDate = taskItem.querySelector("p:nth-child(3)").innerText.split(": ")[1];
    const priority = taskItem.querySelector("p:nth-child(4)").innerText.split(": ")[1];

    return {
        title,
        description,
        dueDate,
        priority
    };
}