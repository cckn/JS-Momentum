const $todoForm = document.querySelector(".js-todoForm");
const $todoInput = $todoForm.querySelector("input");
const $todoList = document.querySelector(".js-todoList");

const TODOS_LS = "todos";

let todos = [];

function deleteTodo(event) {
  const $btn = event.target;
  const $li = $btn.parentNode;

  $todoList.removeChild($li);

  const cleanTodos = todos.filter(todo => {
    return todo.id !== Number($li.id);
  });
  todos = cleanTodos;
  sateTodos();
}

function sateTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function paintTodo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = todos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteTodo);
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
    const parsedTodos = JSON.parse(loadedTodos);
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
