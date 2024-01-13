const btn_addBtn = document.getElementById('addBtn');
const input_userNewTask = document.getElementById('userNewTask');
const ul_addedTask = document.querySelector('.addedTask');
main();
function main() {
    makeTodoElement(JSON.parse(localStorage.getItem("todos")));
    btn_addBtn.addEventListener('click', () => {
        const newTask = input_userNewTask.value.trim();
        if (newTask) {
            input_userNewTask.value = "";
            const todos = !localStorage.getItem("todos") ? []
                : JSON.parse(localStorage.getItem("todos"));

            console.log(todos);
            const currentTodo = {
                name: newTask,
                isCompeleted: false
            }

            todos.push(currentTodo);
            localStorage.setItem("todos", JSON.stringify(todos));
            makeTodoElement(todos);
        }
    })

    input_userNewTask.addEventListener('keydown', (e)=>{
        if(e.key == "Enter"){
            console.log('enter pressed')
            btn_addBtn.click();
        }
    })
}


function removeTask(el) {
    console.log(el);
    const currentTask = el.parentElement;
    const currentTaskIndex = [...document.querySelectorAll("li.item")].indexOf(currentTask);
    const todos = JSON.parse(localStorage.getItem("todos"));
    // نکته جالب اینکه چه من در عبارت پایین  currentTask  رو بزارم چه currentTaskIndex  رو کار میکنه
    todos.splice(currentTaskIndex,1);
    localStorage.setItem("todos" , JSON.stringify(todos));
    el.parentElement.remove();
}


function makeTodoElement(todoArry) {
    if (!todoArry) {
        return null;
    }
    ul_addedTask.innerHTML = "";
    todoArry.forEach(todosObject => {
        let task = todosObject.name;
        let input_checkBox = document.createElement("input");
        input_checkBox.setAttribute("type", "checkbox");
        let p = document.createElement('p');
        p.innerHTML = task;
        let button = document.createElement('button');
        let img = document.createElement('img');
        img.src = "./assets/images/icon-cross.svg";
        button.appendChild(img);
        button.addEventListener('click', () => {
            removeTask(button);
        });
        let li = document.createElement('li');
        li.classList.add("item");
        li.appendChild(input_checkBox);
        li.appendChild(p);
        li.appendChild(button);
        ul_addedTask.appendChild(li);
        input_checkBox.addEventListener('change' , ()=>{
            // e.parentElement.classList.toggle('completed');
            console.log(input_checkBox.parentElement);
            input_checkBox.parentElement.classList.toggle('completed');
        })

    })
}
/*      <li class="item">
            <input type="checkbox">
            <p>تمرین کردن</p>
            <button>
                <img src="./assets/images/icon-cross.svg" alt="">
            </button>
        </li> */