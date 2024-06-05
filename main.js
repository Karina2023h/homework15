const form = document.querySelector(".js--form");
const inputForm = document.querySelector(".js--form__input");
const todosWrapper = document.querySelector(".js--todos-wrapper");

document.addEventListener("DOMContentLoaded", loadTod);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTod();
});

function loadTod() {
  const tod = JSON.parse(localStorage.getItem("tod")) || [];
  tod.forEach((tods) => {
    renderTods(tods);
  });
}

function addTod() {
  const value = inputForm.value.trim();
  if (value === "") return;

  const tods = {
    id: Date.now(),
    text: value,
    completed: false,
  };

  renderTods(tods);
  saveTod(tods);
  inputForm.value = "";
}

function renderTods(tods) {
  const li = document.createElement("li");
  li.className = `todo-item ${tods.completed ? "todo-item--checked" : ""}`;
  li.dataset.id = tods.id;

  const box = document.createElement("input");
  box.type = "checkbox";
  box.checked = tods.completed;
  box.addEventListener("change", () => {
    tods.completed = box.checked;
    li.classList.toggle("todo-item--checked", tods.completed);
    updateTod(tods);
  });

  const span = document.createElement("span");

  span.className = "todo-item__description";
  span.textContent = tods.text;

  const button = document.createElement("button");
  button.className = "todo-item__delete";
  button.textContent = "Видалити";
  button.addEventListener("click", () => {
    removeTod(tods);
    li.remove();
  });

  li.append(box, span, button);
  todosWrapper.appendChild(li);
}

function saveTod(tods) {
  const tod = JSON.parse(localStorage.getItem("tod")) || [];
  tod.push(tods);
  localStorage.setItem("tod", JSON.stringify(tod));
}

function updateTod(updatedTodo) {
  const tod = JSON.parse(localStorage.getItem("tod")) || [];
  const index = tod.findIndex((tods) => tods.id === updatedTodo.id);
  if (index !== -1) {
    tod[index] = updatedTodo;
    localStorage.setItem("tod", JSON.stringify(tod));
  }
}

function removeTod(todoToRemove) {
  const tod = JSON.parse(localStorage.getItem("tod")) || [];
  const updatedTodos = tod.filter((tods) => tods.id !== todoToRemove.id);
  localStorage.setItem("tod", JSON.stringify(updatedTodos));
}
