let jsonList = [];

// Selector
const todoInput = document.querySelector('#todoInput');
const todoButton = document.querySelector(".btn-click");
const todoList = document.querySelector(".todoList");
const filterOption = document.querySelector(".filter-todo");

// Event Listener
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck); // for deleting
filterOption.addEventListener('click', filterTodo);

// Function
var count = 0;
function increment() {
    count += 1;
    document.getElementById("incrementVal").innerText = count;
}
function decrement() {
    count = count -1;
    document.getElementById("incrementVal").innerText = count;
}

function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();

    // Todo DIV
    const todoDiv = document.createElement('div');
    // console.log(todoDiv)
    todoDiv.classList.add("todo");
    
    //CHECK MARK BUTTON
    const radioButton = document.createElement('input');
    radioButton.type = 'radio';
    // radioButton.classList.add("radio-btn");
    radioButton.classList.add("custom-radio");
    todoDiv.appendChild(radioButton);

    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Delete BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-solid fa-x"></i>';
    trashButton.classList.add("trash-btn");
    // trashButton.className ="trash-btn";
    todoDiv.appendChild(trashButton);

    // APPEND TO LIST
    todoList.appendChild(todoDiv);

    // Clear TODO-INPUT Value
    // todoInput.value = '';

    // For increment 
    increment();

    // Function called for JSON data
    add();
}
// addTodo();

function deleteCheck(e) {
    // console.log(e.target);
    const item = e.target;
    
    // DELETE TODO
    if(item.classList[0] === 'trash-btn'){        
        // item.remove(); -->  trash icon is deleting
        const todo = item.parentElement; // here parentElement is 'div' of ul
        // console.log(item.parentElement);
        todo.remove();
        // For Decreasing Count
        decrement();
        
        delJSON();
    }

    // CHECK MARK
    if(item.classList[0] === 'custom-radio'){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

function filterTodo(e){
    // const todos = todoList.childNodes;
    const todos = todoList.children;
    // console.log(todos);  // div.todo
    
    // Array.prototype.forEach.call(todos, function(todo) {
    for(let todo of todos) {
    // todos.forEach(function(todo) {
    // console.log(todo);        
        switch (e.target.value) {    // options checking all, active, complete, uncomplete
            case 'all':
                    if(todo.classList[0] === "todo" ) {
                        todo.style.display = 'flex';            
                    } else {
                        todo.style.display = 'none'
                    } 
                break;
            case 'active':
                let itemActive = document.getElementsByClassName('todo');
                for(i=0; i<itemActive.length; i++){
                    itemActive[i].style.display = 'flex'
                }
                let itemsInActive = document.getElementsByClassName('completed');
                for(i=0; i<itemsInActive.length; i++){
                    itemsInActive[i].style.display = 'none';
                }
                break;
            case 'completed':
                if(todo.classList[1] === "completed" ){
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }         
                break;
            case 'clearcompleted':
                if(todo.classList[1] === "completed" ){
                    todo.remove();
                    decrement();
                }
                break;
            default:
                break;
        }
    }
};

function update() {
    // document.querySelector(".todoList").value = ''
    for(let todo of jsonList) {
            document.getElementById("list").value += `${todo.text}`
        // document.querySelector(".todoList").innerHTML += `${todo.text}`
    }
    console.log(jsonList);
}

let id = 0;
function add() {
    id++;
    jsonList.push({
        id: id,
        text: document.querySelector("#todoInput").value,
        timestamp: new Date(),
        // color: id % 2 === 0 ? "green" : "red"
    })
    update();
}

// delete jsonList[id]
// jsonList.splice(0,1);

function delJSON() {
    // jsonList.filter((item) => item.id !== id)
    jsonList.splice(jsonList.indexOf(id), 1);
}