console.log("To DO List");

function h(elementType, properties, children) {
  const el = document.createElement(elementType);

  for (const prop in properties) {
    el[prop] = properties[prop];
  }

  for (let child of children) {
    if (typeof child === "string") {
      child = new Text(child);
    }
    el.appendChild(child);
  }
  return el;
}

let tasks = [];
let timeArray = [];
function render() {
  const ul = document.querySelector("#container");
  const root = h(
    "div", // elementType
    { id: "container" }, // properties

    [
      h("h1", {}, ["To DO List"]),
      h("h4", {}, ["Task:"]),
      h("input", { id: "inputTask" }, []),
      h("h4", {}, ["Alloted Time for Task: (mins)"]),
      h("input", { id: "inputTime" }, []),
      h("button", { onclick: onAddTodo, class: "addTaskBtn" }, ["Add Task"]),
      h(
        "ul",
        {},
        tasks.map((_, i) => Task([i])),
      ),
    ],
  );
  // console.log(tasks.map((_, i) => Task(i)));

  ul.replaceChildren(root);
}

//add ul - done.
//input alloted time for the task.
//Create a start task function - Use setTimeout for the time, and clearTimeout when it is done.
//Create a done task where it will crossout the task and clear the time.
//Overtime mark, mark it as red.

// button.onclick()
function Task(index) {
  console.log(index);
  return h("li", { className: "task", id: `task${index}` }, [
    tasks[index],
    TaskButtons(index),
  ]);
}

// google: how to return two values in javascript
function TaskButtons(i) {
  return h("div", { className: "taskBtnDiv" }, [
    h("button", { onclick: () => startTimer(i), className: "startBtn" }, [
      "Start Task",
    ]),
    h("p", { className: "timeText" }, [`${timeArray[i]} mins`]),
    h("button", { onclick: () => doneTask(i), className: "doneBtn" }, ["✔"]),
    h("button", { onclick: () => removeTask(i), className: "xBtn" }, ["✖"]),
  ]);
}

function removeTask(index) {
  tasks.splice(index, 1);
  timeArray.splice(index, 1);

  console.log(tasks);
  render(tasks);
}

//Convert it into array of arrays. First array is the task, second array element is for number of minutes.
//Create a function where it triggers the setTimeout using the minutes indicated. Create a start and stop button for each task.
// Update done button to exit the setTimeout.
//Create a function that turns the task into red when it reaches overtime.
function onAddTodo() {
  let task = addTask();
  let time = addTime();
  tasks.push(task);
  timeArray.push(time);
  console.log(tasks);
  render(tasks);
  console.log(tasks);
}

function addTask(text) {
  const input = document.querySelector("#inputTask");
  let inputValue = input.value;
  text = inputValue;
  return text;
}

function addTime() {
  const input = document.querySelector("#inputTime");
  let inputValue = input.value;
  return inputValue;
}

function startSignal(i) {
  document.getElementById(`task${i}`).style.color = "green";
}

function startTimer(i) {
  let overtimeSignal = () =>
    (document.getElementById(`task${i}`).style.color = "red");
  startSignal(i);
  setTimeout(overtimeSignal, timeArray[i] * 60000);
}

function doneTask(i) {
  document.getElementById(`task${i}`).style.textDecoration = "line-through";
  document.getElementById(`task${i}`).style.textDecorationColor = "red";
  document.getElementById(`task${i}`).style.textDecorationThickness = "3px";
}

render(tasks);
