// ---- Form Values Manipulations ----
// get the values from the user and return an object with task's data
// function gets an id number as parameter when called
function getInputsValues(id) {
    //get fields
  const taskInput = document.getElementById("task-input");
  const dateInput = document.getElementById("date-input");
  const timeInput = document.getElementById("time-input");
    //create object with task data and return it
  const formValues = {
    id: id,
    task: taskInput.value,
    date: dateInput.value,
    time: timeInput.value,
  };
  return formValues;
}

// reset the the form when submmit or reset click
function resetForm() {
    //get fields
  const taskInput = document.getElementById("task-input");
  const dateInput = document.getElementById("date-input");
  const timeInput = document.getElementById("time-input");
    // reset fieldds values
  taskInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
    //reset border style
  taskInput.style.borderColor = "#1307D2";
  dateInput.style.borderColor = "#1307D2";
  timeInput.style.borderColor = "#1307D2";
    //handle error message
  const errorElement = document.getElementById("error-message");
  errorElement.style.visibility = "hidden";
}

// ---- Form Validations ----
// check if all requered inputs are fiiled. Return which is not valid as an array.
function checkValid() {
    //get form fields
  const taskInput = document.getElementById("task-input");
  const dateInput = document.getElementById("date-input");
  const timeInput = document.getElementById("time-input");
    //create an array that include the fields that are empty and return this array
  let valid = [];
  if (taskInput.value == "") {
    taskInput.style.borderColor = "red";
    valid.push("task");
  }
  if (dateInput.value == "") {
    dateInput.style.borderColor = "red";
    valid.push("date");
  }
  if (timeInput.value == "") {
    timeInput.style.borderColor = "red";
    valid.push("time");
  }
  return valid;
}

// takes the validation results and display or hide the error message
function errorMessage(valid) {
    //get the error message element and style it for error
  const errorElement = document.getElementById("error-message");
  errorElement.style.color = "red";
    //set a base error message
  let message = "* Pleas fill in ";
  if (valid.length > 0) {
    // if there is an error > complete the base message as needed
    let i = 0;
    while (i < valid.length - 1) {
      message += `${valid[i]} `;
      i++;
    }
    if (valid.length == 1) {
      message += `a ${valid[i]} `;
    } else {
      message += `and ${valid[i]}`;
    }
    //disply the error message
    errorElement.innerText = message;
    errorElement.style.visibility = "visible";
  } else {
    // if there isn't an error > hide the message
    errorElement.style.visibility = "hidden";
    //check for date validation
    checkDateValidation();
  }
}

// on inputs changes > reset the validation and error message
function inputChanged(input) {
    //reset border color of fields
  input.style.borderColor = "#1307D2";
    //get the error message element and if it disply > recheck validations
  const errorElement = document.getElementById("error-message");
  if (errorElement.style.visibility == "visible") {
    errorMessage(checkValid());
  }
}

// date validation for task sorting - check if task due date is passed
function isDateOver(date) {
  let today = new Date();
  let taskDate = date;
  taskDate = Date.parse(taskDate);
  if (today.setHours(0, 0, 0, 0) > taskDate) {
    return true;
  } else {
    return false;
  }
}

// check date input validation vs current date
function checkDateValidation() {
  const dateInput = document.getElementById("date-input");
  const errorElement = document.getElementById("error-message");
  const inputDate = new Date(dateInput.value);
  const today = new Date();
  if (inputDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
    let message = "Note: you select a date that already passed ";
    errorElement.innerText = message;
    errorElement.style.color = "orange";
    dateInput.style.borderColor = "orange";
    errorElement.style.visibility = "visible";
  } else {
    errorElement.style.visibility = "hidden";
    dateInput.style.borderColor = "#1307D2";
  }
}

// ---- Local storage handeling ----
// add the form values to local storage
function addToLocalStorage() {
  taskListLocal = localStorage.getItem("taskList");
  if (taskListLocal === null || taskListLocal === "[]") {
    // if there is nothing in local storage > defin it
    taskListLocal = [];
    taskListLocal.push(getInputsValues(1));
    localStorage.setItem("taskList", JSON.stringify(taskListLocal));
  } else {
    // if there is something in local storage > add to it the new values
    taskListLocal = JSON.parse(taskListLocal);
    const listLength = taskListLocal.length;
    taskListLocal.push(getInputsValues(taskListLocal[listLength - 1].id + 1));
    localStorage.setItem("taskList", JSON.stringify(taskListLocal));
  }
}

// delete from local storage
function deleteFromLocal(index) {
  // gets the index value of the object that we need to delete from the delNote() function
  taskListLocal = localStorage.getItem("taskList");
  taskListLocal = JSON.parse(taskListLocal);
  const indexToRemove = taskListLocal.indexOf(
    taskListLocal.find(({ id }) => id == index)
  ); // find the object with the right index (id)
  taskListLocal.splice(indexToRemove, 1);
  localStorage.setItem("taskList", JSON.stringify(taskListLocal));
}

// ---- DOM manipulations ----
// creates the task card component with values from:
// if new > from form ( with the addTask() function)
// if exist > from local storage (with the loadList() function)
function createDomElement(noteItem) {
  // create task wrapper
  const noteWrapper = document.createElement("div");
  noteWrapper.setAttribute("class", "note-wrapper");
  noteWrapper.setAttribute("id", `id-${noteItem.id}`); //adds the index of the task to the id of the parent element
  // create img
  const img = document.createElement("img");
  img.setAttribute("class", "img-note");
  img.setAttribute("src", "assets/notebg.png");
  // create close button
  const closeBtn = document.createElement("i");
  closeBtn.setAttribute("class", "bi bi-x-circle-fill");
  closeBtn.setAttribute("onclick", "delNote(this)");
  // create paragraph
  const paragraph = document.createElement("p");
  paragraph.setAttribute("class", "task-para");
  paragraph.innerText = noteItem.task;
  // create date span
  const dateSpan = document.createElement("span");
  dateSpan.setAttribute("class", "date-span");
  let getDate = new Date(noteItem.date);
  dateSpan.innerText = getDate.toLocaleDateString("he");
  // create time span
  const timeSpan = document.createElement("span");
  timeSpan.setAttribute("class", "time-span");
  timeSpan.innerText = noteItem.time;
  // group elements to component
  noteWrapper.appendChild(img);
  noteWrapper.appendChild(closeBtn);
  noteWrapper.appendChild(paragraph);
  noteWrapper.appendChild(dateSpan);
  noteWrapper.appendChild(timeSpan);
  return noteWrapper;
}

// adds the new task component to the page
function addDomElement(taskData, isDateOver) {
  const taskWrapper = document.getElementById("tasks-wrapper");
  const taskOverWrapper = document.getElementById("tasks-over-wrapper");
  noteElement = createDomElement(taskData);
  if (isDateOver === true) {
    taskOverWrapper.appendChild(noteElement);
  } else {
    taskWrapper.appendChild(noteElement);
  }
}

// adds the exists tasks component to the page
function loadList() {
  taskListLocal = localStorage.getItem("taskList");
  if (taskListLocal !== null) {
    taskListLocal = JSON.parse(taskListLocal);
    for (let obj of taskListLocal) {
      if (isDateOver(obj.date) === true) {
        addDomElement(obj, true);
      } else {
        addDomElement(obj, false);
      }
    }
  }
}

// handle with new task submit
function addTask() {
  const valid = checkValid();
  if (valid.length == 0) {
    addToLocalStorage();
    const listLength = taskListLocal.length;
    const newTaskData = getInputsValues(taskListLocal[listLength - 1].id);
    if (isDateOver(newTaskData.date) === true) {
      addDomElement(newTaskData, true);
      alert(
        `Your new task due date is passed.\nYour can fined it on the 'passed tasks' board`
      );
    } else {
      addDomElement(newTaskData, false);
    }
    resetForm();
  } else {
    errorMessage(valid);
  }
}

// delete exist taskes
function delNote(closeElement) {
  const note = closeElement.parentElement; //gets the parent div of the X icon
  const elementId = note.id; // gets the id (index) of that element
  const index = elementId.replace("id-", ""); // extract the index from the id
  note.remove();
  deleteFromLocal(index); // delete that task from local storage
}