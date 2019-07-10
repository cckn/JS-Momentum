const $todoForm = document.querySelector(".js-todoForm");
const $todoInput = $todoForm.querySelector("input");
const $todoList = document.querySelector(".js-todoList");

const TODOS_LS = "todos";


function paintTodo(text) {
    console.log(text);
    const li = document.createElement("li")
    const delBtn = document.createElement("button")
    delBtn.innerText = "❌"
    const span = document.createElement("span")
    span.innerText = text
    li.appendChild(delBtn)
    li.appendChild(span)
    $todoList.appendChild(li)
    
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = $todoInput.value;
  paintTodo(currentValue)
  $todoInput.value = ""
}

function loadTodos() {
  const todos = localStorage.getItem(TODOS_LS);
  if (todos !== null) {
  }
}

function init() {
  loadTodos();
  $todoForm.addEventListener("submit", handleSubmit);
}

init();
