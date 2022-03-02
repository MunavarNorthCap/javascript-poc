let jsonList = [];

let form = document.getElementById("form");
form.addEventListener('submit', function(e){
    e.preventDefault();
})

var count = 0;
function increment() {
  count += 1;
  document.getElementById("incrementVal").innerText = count;
}
function decrement() {
  count = count -1;
  document.getElementById("incrementVal").innerText = count;
}

function addTodo(values) {
  document.getElementById("todoList").innerHTML = ""
  for (let todo of values) {
    document.getElementById("todoList").innerHTML += `<div class="todo" 
    style="color:${todo.color};
    text-decoration: ${todo.done ? "line-through" : "auto"};"> 
    <input type='radio' class="custom-radio" onclick="done(${todo.id})" />
    ${todo.id}  - ${todo.text} - ${todo.timestamp}
    <button class='trash-btn' onclick="delJSON()">
    <i class="fa-solid fa-x"></i></button>
    </div>`
  }
  console.log(values);
}

let id = 0;
function add() {
	id++;
	jsonList.push({
  	id: id,
    text: document.getElementById("todoInput").value,
    timestamp: new Date(),
    color: id % 2 === 0 ?  "green" : "red",
    done: false
  });
  document.getElementById("todoInput").value = ""
  addTodo(jsonList);
  increment();
}

function done(id) {
	todos = jsonList.map((td) => {
  	if (td.id === id) {
    	return {...td, done: !td.done}
    }
    return td;
  })
  addTodo(todos);
  // console.log(todos);
}

function delJSON() {
  addTodo(jsonList.splice(jsonList.indexOf(), 1));
  // console.log(addTodo(jsonList.filter((item) => item.id !== id)))
  decrement();
  
}

function showAll(val) {
  // addTodo(jsonList);
	// addTodo(todos);
  return val  ? addTodo(jsonList) : addTodo(todos)
}

function active() {
	addTodo(todos.filter((t) => !t.done))  
}

function completed() {
	addTodo(todos.filter((t) => t.done))  
}

function clearCompleted(val) {
  addTodo(jsonList.splice(jsonList.indexOf(), 1));
	// return val ? addTodo(jsonList.splice(jsonList.indexOf(), 1)): addTodo(todos.splice(todos.indexOf(), 1));;
  decrement();
}