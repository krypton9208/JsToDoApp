document.onload = function(){
  var container = document.getElementById('listContainer');

  var input = document.createElement('input');
  input.setAttribute('id', 'taskInput');
  input.onkeydown = function (e) {
    if (e.keyCode === 13)
      addNewTask(e.target.value)
  };

  var button = document.createElement('button');
  button.innerHTML = 'dodaj';
  button.onclick = function (e) {
    addNewTask(document.getElementById('taskInput').value, document.getElementById('selectedCategory').value);
  };

  var select = document.createElement('select');
  select.setAttribute('id', 'selectedCategory');

  for (i = 0; i <  6; i++) {
    select.options[i] = new Option('Kategoria ' + i, i);
  }

  var div = document.createElement('div');

  div.appendChild(select);
  div.appendChild(input);
  div.appendChild(button);

  container.appendChild(div);
}();


function addNewTask(name, categoryId) {

  if (document.getElementById('listOfTask'+ categoryId) === null) {
    createNewList(categoryId)
  }
  var li = document.createElement('li');
  li.innerHTML = name;
  li.onclick = removeTask;
  document.getElementById('taskInput').value = '';

  document.getElementById('listOfTask'+ categoryId).appendChild(li);
}

function removeTask(e) {
  document.getElementById('listOfTask').removeChild(e.target)
}

function createNewList(categoryId) {
  var div = document.createElement('div');
  div.style = 'display: inline-block; margin-right: 15px;vertical-align: top;';
  div.innerHTML = '<p>'+ 'Kategoria ' + categoryId + '</p>';
  var ul = document.createElement('ul');
  ul.setAttribute('id', 'listOfTask' + categoryId);
  ul.setAttribute.innerHTML = 'Kategoria ' + categoryId;
  ul.setAttribute('value', categoryId);

  div.appendChild(ul);
  document.getElementById('listContainer').appendChild(div);
}