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
    addNewTask(document.getElementById('taskInput').value)
  };

  container.appendChild(input);
  container.appendChild(button);
}();


function addNewTask(name) {
  if (document.getElementById('listOfTask') === null) {
    var ul = document.createElement('ul');
    ul.setAttribute('id', 'listOfTask');

    document.getElementById('listContainer').appendChild(ul)
  }
  var li = document.createElement('li');
  li.innerHTML = name;
  li.onclick = removeTask
  document.getElementById('taskInput').value = '';

  document.getElementById('listOfTask').appendChild(li);
}

function removeTask(e) {
  document.getElementById('listOfTask').removeChild(e.target)
}