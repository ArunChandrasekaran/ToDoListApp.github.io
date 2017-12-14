var data =(localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo:[],
    completed:[]
};




var removeSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.04 19.34"><defs></defs><title>Asset 4</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="fill" d="M1.08,17.19a2.15,2.15,0,0,0,2.14,2.14h8.6A2.15,2.15,0,0,0,14,17.19V4.3H1.08ZM15,1.08H11.28L10.21,0H4.84L3.76,1.08H0V3.22H15Zm0,0"/></g></g></svg>'
var completeSVG ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.12 5.61"><defs></defs><title>Asset 6</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="fill" points="8.12 0 7.56 0.59 3.01 5.39 2.81 5.61 0 2.94 0.62 2.24 2.75 4.27 8.12 0"/></g></g></svg>'

renderTodoList();

document.getElementById('add').addEventListener('click', function() {
  var value = document.getElementById('item').value;
  if (value) {
    addItem(value);
  }
});

document.getElementById('item').addEventListener('keydown', function (e) {
  var value = this.value;
  if (e.code === 'Enter' && value) {
    addItem(value);
  }
});

function addItem (value) {
  addItemToDOM(value);
  document.getElementById('item').value = '';

  data.todo.push(value);
  dataObjectUpdated();
}

function renderTodoList() {
  if (!data.todo.length && !data.completed.length) return;

  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addItemToDOM(value);
  }

  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addItemToDOM(value, true);
  }
}

function dataObjectUpdated() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  dataObjectUpdated();

  parent.removeChild(item);
}

function completeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }
  dataObjectUpdated();

  
  var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}


function addItemToDOM(text, completed) {
  var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');

  var item = document.createElement('li');
  item.innerText = text;

  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  remove.addEventListener('click', removeItem);

  var complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;


  complete.addEventListener('click', completeItem);

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
}
