let jsonList = [];

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
  document.getElementById('todoList').innerHTML = '';
  for(let todo of values) {
    document.getElementById("todoList").innerHTML += `<div class="todo"
    style="text-decoration: ${todo.done ? "line-through" : "auto"};"> 
    <input type="radio" class='custom-radio' onclick="done(${todo.id})" />
    ${todo.id}  - ${todo.text} - ${todo.timestamp}
    <button class='trash-btn' onclick="delJSON(${todo.id})">
    <i class="fa-solid fa-x"></i></button>
    </div>`
  }
  // console.log(jsonList);
}

let id = 0;
function add() {
  id++;
  jsonList.push({
    id: id,
    text: document.getElementById("todoInput").value,
    timestamp: new Date().toUTCString(),
    done: false,
  })
  document.getElementById('todoInput').value = '';
  addTodo(jsonList);
  increment();
}

function done(id) {
	// todos = jsonList.map((td) => {
  // 	if (td.id === id) {
  //   	return {...td, done: !td.done}
  //   }
  //   return td;
  // })
  // addTodo(todos);
  // console.log(todos);

  for(let i=0; i <jsonList.length; i++) {
    var td = jsonList[i];
    if(td.id === id){
      td.done = !td.done;
    }
    console.log(td);
  }
  addTodo(jsonList);
}

function delJSON(id) {
  // jsonList = jsonList.filter((t) => {
  //   return t.id !== id
  // });
  // addTodo(jsonList);
  // if(count > 0) decrement();

  for(let i=0; i<jsonList.length; i++) {
    if(jsonList[i].id === id) {
      jsonList.splice(i,1)
    }
  }
  addTodo(jsonList);
  decrement();
}

function showAll() {
  addTodo(jsonList);
}

function active() {
  let activeArr = [];
  for(let todo of jsonList){
    if(!todo.done) {
      activeArr.push(todo);
    }
  }
  addTodo(activeArr);
  
	// addTodo(jsonList.filter((t) => !t.done));
}

function completed() {
  let completedArr = [];
  for(let todo of jsonList) {
    if(todo.done){
      completedArr.push(todo);
    }
  }
  addTodo(completedArr);

	// addTodo(jsonList.filter((t) => t.done)); 
}

function clearCompleted() {
  // if(jsonList.some(elm => elm.done === true)) {
  //   jsonList = jsonList.filter((t) => !t.done);
  //   addTodo(jsonList)
  //   decrement();
  // }

  let clearArr = [];
  for(let todo of jsonList) {
    if(!todo.done) {
      clearArr.push(todo)
    }
  }
  jsonList = clearArr;
  addTodo(jsonList);
  
  if(count > 0) decrement();
}