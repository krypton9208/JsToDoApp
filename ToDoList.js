document.onload = function(){
  var container = document.getElementById('listContainer');

  var input = document.createElement('input');
  input.setAttribute('id', 'taskInput');
  input.classList = [ 'form-control'];
  input.onkeydown = function (e) {
    if (e.keyCode === 13)
      addNewTask(e.target.value)
  };

  var button = document.createElement('button');
  button.innerHTML = 'dodaj';
  button.classList = [ 'btn btn-primary btn-block'];
  button.onclick = function (e) {
    addNewTask(document.getElementById('taskInput').value, document.getElementById('selectedCategory').value);
  };

  var select = document.createElement('select');
  select.setAttribute('id', 'selectedCategory');
  select.classList = [ 'form-control'];
  for (i = 0; i <  6; i++) {
    select.options[i] = new Option('Category ' + i, i);
  }

  var div = document.createElement('div');
  div.classList = [ 'col-sm-3'];

  div.appendChild(select);
  div.appendChild(input);
  div.appendChild(button);

  container.appendChild(div);
}();


function addNewTask(name, categoryId) {
  if (name.length < 3) return alert('Please enter title')
  if (document.getElementById('listOfTask'+ categoryId) === null) {
    createNewList(categoryId)
  }
  var li = document.createElement('li');
  li.innerHTML = name;
  li.onclick = removeTask;
  li.ondragstart = drag;
  li.setAttribute('id', name+categoryId+guid());
  li.setAttribute('draggable', true);
  li.setAttribute('droppable', false);
  document.getElementById('taskInput').value = '';

  document.getElementById('listOfTask'+ categoryId).appendChild(li);
}

function removeTask(e) {
  if (document.getElementById('listOfTask' + e.target.parentElement.getAttribute('value')).childElementCount === 1) {
    document.getElementById('listContainer').removeChild(document.getElementById('listOfTask' + e.target.parentElement.getAttribute('value')).parentNode)
  } else {
    document.getElementById('listOfTask' + e.target.parentElement.getAttribute('value')).removeChild(e.target);
  }
}

function createNewList(categoryId) {
  var div = document.createElement('div');
  div.style = 'display: inline-block; margin-right: 15px;vertical-align: top;';
  div.innerHTML = '<p>'+ 'Category ' + categoryId + '</p>';
  div.setAttribute('id', categoryId);
  div.classList = ['category'];
  var ul = document.createElement('ul');
  ul.setAttribute('id', 'listOfTask' + categoryId);
  ul.setAttribute.innerHTML = 'Category ' + categoryId;
  ul.setAttribute('value', categoryId);
  ul.ondrop=drop;
  ul.ondragover=allowDrop;
  div.appendChild(ul);
  document.getElementById('listContainer').appendChild(div);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  if (ev.target.nodeName === 'LI')  {
    var data = ev.dataTransfer.getData("text");
    return ev.target.parentNode.appendChild(document.getElementById(data));

  }

  if (ev.target.nodeName !== 'UL') return alert('can not drop here');
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}