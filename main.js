const btn_addBtn = document.getElementById("addBtn");
const input_userNewTask = document.getElementById("userNewTask");
const ul_addedTask = document.querySelector(".addedTask");
const btnAllTodos = document.getElementById("btnAllTodos");
const btnActveTodos = document.getElementById("btnActveTodos");
const btnCompletedTodos = document.getElementById("btnCompletedTodos");
const p_taskCounter = document.getElementById("taskCounter");
let uncompletedTask = 0;
main();
function main() {
  makeTodoElement(JSON.parse(localStorage.getItem("todos")));
  btn_addBtn.addEventListener("click", () => {
    const newTask = input_userNewTask.value.trim();
    if (newTask) {
      input_userNewTask.value = "";
      const todos = !localStorage.getItem("todos")
        ? []
        : JSON.parse(localStorage.getItem("todos"));

      console.log(todos);
      const currentTodo = {
        name: newTask,
        isCompeleted: false,
      };

      todos.push(currentTodo);
      localStorage.setItem("todos", JSON.stringify(todos));
      makeTodoElement(todos);
      //uncompletedTask++;
      p_taskCounter.innerHTML = uncompletedTask;
    }
  });

  input_userNewTask.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      console.log("enter pressed");
      btn_addBtn.click();
    }
  });
}

function removeTask(el) {
  console.log(el);
  const currentTask = el.parentElement;
  const currentTaskIndex = [...document.querySelectorAll("li.item")].indexOf(
    currentTask
  );
  const todos = JSON.parse(localStorage.getItem("todos"));
  // نکته جالب اینکه چه من در عبارت پایین  currentTask  رو بزارم چه currentTaskIndex  رو کار میکنه
  todos.splice(currentTaskIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));

  if (el.parentElement.classList.contains("completed")) {
    console.log("+");
  } else {
    uncompletedTask--;
    p_taskCounter.innerHTML = uncompletedTask;
  }
  el.parentElement.remove();
}

function editTask(el) {
  if (el.classList.contains("active")) {
    let modifyTask = el.children[1].value.trim();
    console.log(modifyTask);
    console.log(el);
    if (modifyTask) {
      const todos = JSON.parse(localStorage.getItem("todos"));
      const currentTask = el.parentElement;
      const currentTaskIndex = [
        ...document.querySelectorAll("li.item"),
      ].indexOf(currentTask);
      console.log(currentTaskIndex);
      todos[currentTaskIndex].name = modifyTask;
      localStorage.setItem("todos", JSON.stringify(todos));
      makeTodoElement(todos);
    }
  } else {
    el.children[1].value = "";
  }
  el.classList.toggle("active");
}

// console.log(el);
// const currentTask = el.parentElement;
// const currentTaskIndex = [...document.querySelectorAll("li.item")].indexOf(
//   currentTas
// );
// const todos = JSON.parse(localStorage.getItem("todos"));
// // نکته جالب اینکه چه من در عبارت پایین  currentTask  رو بزارم چه currentTaskIndex  رو کار میکنه
// todos.splice(currentTaskIndex, 1);
// localStorage.setItem("todos", JSON.stringify(todos));

// if(el.parentElement.classList.contains("completed")){
//   console.log("+");
// }else{
//   uncompletedTask--;
//   p_taskCounter.innerHTML = uncompletedTask;
// }
// el.parentElement.remove();

function stateTask(el, iscompeleted) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const currentTask = el.parentElement;
  const currentTaskIndex = [...document.querySelectorAll("li.item")].indexOf(
    currentTask
  );
  console.log(currentTaskIndex);
  todos[currentTaskIndex].isCompeleted = iscompeleted;
  localStorage.setItem("todos", JSON.stringify(todos));
}



function makeTodoElement(todoArry) {
  if (!todoArry) {
    return null;
  }
  ul_addedTask.innerHTML = "";
  uncompletedTask = 0;
  todoArry.forEach((todosObject) => {
    let task = todosObject.name;
    let input_checkBox = document.createElement("input");
    input_checkBox.setAttribute("type", "checkbox");
    let p = document.createElement("p");
    p.innerHTML = task;

    let buttomContiner = document.createElement("div");
    buttomContiner.classList.add("modyfiy");

    let button = document.createElement("button");
    let cross = document.createElement("p");
    cross.innerHTML = "&#10006";
    button.appendChild(cross);
    button.addEventListener("click", () => {
      removeTask(button.parentElement);
    });

    let editButtom = document.createElement("button");
    //let editIcon = document.createElement("p");
    editButtom.innerHTML = "&#x2712";

    let editInput = document.createElement("input");
    editInput.classList.add("hideInput");
    editButtom.appendChild(editInput);
    editButtom.addEventListener("click", () => {
      editTask(editButtom.parentElement);
    });
    buttomContiner.appendChild(button);
    buttomContiner.appendChild(editInput);
    buttomContiner.appendChild(editButtom);

    let li = document.createElement("li");
    li.classList.add("item");
    if (todosObject.isCompeleted) {
      li.classList.add("completed");
      input_checkBox.checked = true;
    } else {
      uncompletedTask++;
    }
    li.appendChild(input_checkBox);
    li.appendChild(p);
    li.appendChild(buttomContiner);
    ul_addedTask.appendChild(li);
    input_checkBox.addEventListener("change", () => {
      // e.parentElement.classList.toggle('completed');
      console.log(input_checkBox.parentElement);
      input_checkBox.parentElement.classList.toggle("completed");
      stateTask(
        input_checkBox,
        input_checkBox.parentElement.classList.contains("completed")
      );
      if (input_checkBox.parentElement.classList.contains("completed")) {
        uncompletedTask--;
        p_taskCounter.innerHTML = uncompletedTask;
      } else {
        uncompletedTask++;
        p_taskCounter.innerHTML = uncompletedTask;
      }
    });
  });
  p_taskCounter.innerHTML = uncompletedTask;
}

btnActveTodos.addEventListener("click", (e) => {
  console.log("active");
  ul_addedTask.classList.remove("showCompleted");
  ul_addedTask.classList.add("showActive");
  btnActveTodos.classList.add("active");
  btnCompletedTodos.classList.remove("active");
  btnAllTodos.classList.remove("active");
});

btnCompletedTodos.addEventListener("click", (e) => {
  console.log("completed");
  ul_addedTask.classList.add("showCompleted");
  ul_addedTask.classList.remove("showActive");
  btnCompletedTodos.classList.add("active");
  btnActveTodos.classList.remove("active");
  btnAllTodos.classList.remove("active");
});

btnAllTodos.addEventListener("click", (e) => {
  console.log("all");
  ul_addedTask.classList.remove("showCompleted");
  ul_addedTask.classList.remove("showActive");
  btnAllTodos.classList.add("active");
  btnActveTodos.classList.remove("active");
  btnCompletedTodos.classList.remove("active");
});
