const input = document.querySelector("#input");
const addBtn = document.getElementById("add-btn");
const delBtn = document.getElementById("del-btn");
const ul = document.querySelector("#lists");
const trash = document.querySelector(".fa-trash");

let todos = JSON.parse(localStorage.getItem("TODOS")) || [];
console.log(todos);

todos.forEach((t) => addLi(t));

addBtn.addEventListener("click", clickAdd);

function clickAdd() {
  console.log("add");
  if (!input.value.trim()) {
    alert("Enter a todo!");
  } else {
    const todo = {
      id: new Date().getTime(),
      completed: false,
      text: input.value,
    };
    addLi(todo);

    todos.push(todo);
    localStorage.setItem("TODOS", JSON.stringify(todos));

    input.value = "";
    input.focus();
  }
}

function addLi(todo) {
  const { id, completed, text } = todo;
  ul.innerHTML += `
      <li id="${id}" class="d-flex ${completed && "checked"}">
        <i class="fas fa-check"></i>
        <p>${text}</p>
        <i class="fas fa-trash"></i>
      </li>`;
}

ul.addEventListener("click", (e) => {
  const liId = e.target.parentElement.id;

  if (e.target.classList.contains("fa-check")) {
    e.target.parentElement.classList.toggle("checked");
    todos.forEach((i) => {
      if (i.id === Number(liId)) {
        return (i.completed =
          e.target.parentElement.classList.contains("checked"));
      }
    });
    localStorage.setItem("TODOS", JSON.stringify(todos));
  } else if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();
    todos = todos.filter((i) => i.id !== Number(liId));
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }
});

delBtn.addEventListener("click", () => {
  ul.innerText = "";
  todos = [];
  localStorage.setItem("TODOS", JSON.stringify(todos));
});

window.onload = function () {
  input.focus();
};

input.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    addBtn.click();
  }
});
