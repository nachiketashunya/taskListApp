let taskList = document.querySelector(".collection");

//function to get tasks from local storage
function getTasks(){
    let tasks;
    if (!localStorage.getItem("tasks")){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
}


//function to display tasks
function displayTasks() { 
    let tasks = getTasks();

    taskList.innerHTML = ""
    tasks.forEach((task) => {
        let html = `
            <li class="collection-item"> ${task}
                <a onclick="removeTask('${task}')" style="float: right; color: #f00;"><i class="fas fa-times" ></i></a> 
            </li>
        `
        taskList.innerHTML += html;
    })  
}


// Adding new task to list 

let taskForm = document.querySelector("#task-form");

taskForm.addEventListener("submit", addTask);

function addTask(e){
    e.preventDefault();

    let tasks = getTasks();
    let taskValue = document.querySelector("#newTask").value;


    if (taskValue === ''){
        alert("Type any task")        
    } else {
        tasks.push(taskValue);

        localStorage.setItem("tasks", JSON.stringify(tasks));
    
        taskForm.reset();
        displayTasks();

    }

   
}

// function to remove task from storage
function removeTask(taskName){
    let tasks = getTasks();

    for(let i = 0; i < tasks.length; i++){
        if (tasks[i] === taskName){
            tasks.splice(i, 1);
        }
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}


//filter tasks
let taskFilter = document.querySelector("#filterTask");

taskFilter.addEventListener("keyup", filterTask);

function filterTask(){
    let taskList = document.querySelectorAll(".collection-item");

    let filterValue = taskFilter.value.toLowerCase();

    taskList.forEach( (task) => {
        let taskValue = task.textContent.toLowerCase();

        if (taskValue.indexOf(filterValue) != -1){
            task.style.display = "";
        } else {
            task.style.display = "none";
        }

    })
}


//function to clear all tasks

function clearTasks(){
    // let tasks = getTasks();

    // tasks.length = 0;

    // localStorage.setItem("tasks", JSON.stringify(tasks));

    localStorage.clear();  // single line 

    displayTasks();
}



