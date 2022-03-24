function getInputsValues () {
    const taskInput = document.getElementById("task-input")
    const dateInput = document.getElementById("date-input")
    const timeInput = document.getElementById("time-input")
    const formValues = {
        "task": taskInput.value,
        "date": dateInput.value,
        "time": timeInput.value,
    }
    return formValues
}

function addToLocalStorage() {
    taskListLocal = localStorage.getItem("taskList")
    if (taskListLocal === null) {
        taskListLocal = [];
        taskListLocal.push(getInputsValues());
        localStorage.setItem("taskList" , JSON.stringify(taskListLocal));
    } else {
        console.log(taskListLocal.type)
        taskListLocal = JSON.parse(taskListLocal)
        taskListLocal.push(getInputsValues());
        localStorage.setItem("taskList" , JSON.stringify(taskListLocal))
    }
}

function createDomElement (noteItem) {
        // create task wrapper
    const noteWrapper = document.createElement('div')
    noteWrapper.setAttribute("class", "note-wrapper")
        // create img
    const img = document.createElement('img')
    img.setAttribute("class" , "img-note")
    img.setAttribute("src" , "assets/notebg.png")
    // create close button
    const closeBtn = document.createElement('i')
    closeBtn.setAttribute("class" , "bi bi-x-circle-fill")
    // create paragraph
    const paragraph = document.createElement('p')
    paragraph.setAttribute("class" , "task-para")
    paragraph.innerText= noteItem.task
    // create date span
    const dateSpan = document.createElement("span")
    dateSpan.setAttribute("class" , "date-span")
    dateSpan.innerText= noteItem.date
    // create time span
    const timeSpan = document.createElement("span")
    timeSpan.setAttribute("class" , "time-span")
    timeSpan.innerText = noteItem.time
    // group elements to component
    noteWrapper.appendChild(img)
    noteWrapper.appendChild(closeBtn)
    noteWrapper.appendChild(paragraph)
    noteWrapper.appendChild(dateSpan)
    noteWrapper.appendChild(timeSpan)
    return noteWrapper
}

function addDomElement(taskData) {
    const taskWrapper = document.getElementById("tasks-wrapper");
    noteElement = createDomElement(taskData)
    taskWrapper.appendChild(noteElement)
}

function resetForm() {
    const taskInput = document.getElementById("task-input")
    const dateInput = document.getElementById("date-input")
    const timeInput = document.getElementById("time-input")
    taskInput.value = ""
    dateInput.value = ""
    timeInput.value = ""
}

function addTask() {
    const newTaskData = getInputsValues()
    addToLocalStorage()
    addDomElement(newTaskData)
    resetForm()
}

function loadList () {
    taskListLocal = localStorage.getItem("taskList")
    if (taskListLocal !== null) {
        taskListLocal = JSON.parse(taskListLocal)
        for (let obj of taskListLocal) {
            // console.log(obj)
            addDomElement(obj)
        }
    }
}