const btn_addBtn = document.getElementById('addBtn');
const input_userNewTask = document.getElementById('userNewTask');
const ul_addedTask = document.querySelector('.addedTask');
console.log(ul_addedTask);

btn_addBtn.addEventListener('click',()=>{
    console.log(input_userNewTask.value);
    if(input_userNewTask.value != ""){
        let newTask = input_userNewTask.value;
        let input_checkBox = document.createElement("input");
        input_checkBox.setAttribute("type","checkbox");
        let p = document.createElement('p');
        p.innerHTML = newTask;
        let button = document.createElement('button');
        let img = document.createElement('img');
        img.src = "./assets/images/icon-cross.svg";
        button.appendChild(img);
        button.addEventListener('click',()=>{
            removeTask(button);
        });
        let li = document.createElement('li');
        li.classList.add("item");
        li.appendChild(input_checkBox);
        li.appendChild(p);
        li.appendChild(button);
        ul_addedTask.appendChild(li);
        input_userNewTask.value = '';

    }
})

function removeTask(el){
    console.log(el);
    el.parentElement.remove();
}
/*      <li class="item">
            <input type="checkbox">
            <p>تمرین کردن</p>
            <button>
                <img src="./assets/images/icon-cross.svg" alt="">
            </button>
        </li> */