1. How long did you spend on the coding test?
   => I invested approximately 10 to 12 hours in developing the task manager, diligently working towards achieving the specified objectives. The process of crafting the solution was both challenging and rewarding, providing me with a sense of satisfaction upon completion

2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
   =>In the latest version of Vanilla JavaScript, one of the most valuable features I utilized is the ability to add a search functionality to the task manager. This enhancement significantly improves user experience and allows for quick task retrieval. Below is a snippet of the code demonstrating how I implemented the search functionality:

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

3. How would you track down a performance issue in production? Have you ever had to do this?
   => While I haven't had the opportunity to track down a performance issue in a production environment yet, I am eager to gain hands-on experience in this area. I have learned about monitoring tools and best practices. I would use tools like Chrome Developer Tools and logs, analyze database queries.

4) If you had more time, what additional features or improvements would you consider adding to the task management application?
   => I would like to explore the possibility of incorporating additional features. However for the current version, no extra features have been added.
