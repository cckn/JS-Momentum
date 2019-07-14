const $todoForm = document.querySelector(".js-todoForm");
const $todoInput = $todoForm.querySelector("input");
const $todoList = document.querySelector(".js-todoList");

const TODOS_LS = "todos";

const todos = [];

function sateTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function paintTodo(text) {
  console.log(text);
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = todos.length + 1;
  delBtn.innerText = "❌";
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  $todoList.appendChild(li);
  const todoObj = {
    text: text,
    id: newId
  };

  todos.push(todoObj);
  sateTodos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = $todoInput.value;
  paintTodo(currentValue);
  $todoInput.value = "";
}

function loadTodos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if (loadedTodos !== null) {
    const parsedTodos = JSON.parse(loadedTodos)
    parsedTodos.forEach(todo => {
      paintTodo(todo.text);
      
    });
  }
}

function init() {
  loadTodos();
  $todoForm.addEventListener("submit", handleSubmit);
}

init();
