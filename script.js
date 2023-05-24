// 追加ボタンのクリックイベントリスナーを設定
document.getElementById('addButton').addEventListener('click', function() {
  addTask();
});

// ToDoアイテムを追加する関数
function addTask() {
  var input = document.getElementById('taskInput');
  var task = input.value;

  if (task === '') {
    return;
  }

  var listItem = document.createElement('li');
  listItem.classList.add('mb-2'); // ToDoアイテム間のマージンを追加

  var taskContainer = document.createElement('div');
  taskContainer.classList.add('flex', 'items-center');

  var taskText = document.createElement('span');
  taskText.innerText = task;
  taskContainer.appendChild(taskText);

  var deleteButtonContainer = document.createElement('div');
  deleteButtonContainer.classList.add('ml-2');

  var deleteButton = document.createElement('button');
  deleteButton.appendChild(document.createTextNode('削除'));
  deleteButton.classList.add('px-2', 'py-1', 'bg-red-500', 'text-white');
  deleteButton.addEventListener('click', function() {
    removeTask(listItem);
  });
  deleteButtonContainer.appendChild(deleteButton);

  taskContainer.appendChild(deleteButtonContainer);

  listItem.appendChild(taskContainer);

  document.getElementById('taskList').appendChild(listItem);

  input.value = '';

  saveTasks();
}

// ToDoアイテムを削除する関数
function removeTask(taskItem) {
  taskItem.parentNode.removeChild(taskItem);
  saveTasks();
}

// ToDoアイテムのデータを保存する関数
function saveTasks() {
  var taskList = document.getElementById('taskList');
  var tasks = taskList.getElementsByTagName('li');
  var taskData = [];

  for (var i = 0; i < tasks.length; i++) {
    var taskText = tasks[i].querySelector('span').innerText;
    taskData.push(taskText);
  }

  localStorage.setItem('tasks', JSON.stringify(taskData));
}

// 保存されたデータを復元する関数
function restoreTasks() {
  var taskData = localStorage.getItem('tasks');

  if (taskData) {
    var tasks = JSON.parse(taskData);

    for (var i = 0; i < tasks.length; i++) {
      var listItem = document.createElement('li');
      listItem.classList.add('mb-2'); // ToDoアイテム間のマージンを追加

      var taskContainer = document.createElement('div');
      taskContainer.classList.add('flex', 'items-center');

      var taskText = document.createElement('span');
      taskText.innerText = tasks[i];
      taskContainer.appendChild(taskText);

      var deleteButtonContainer = document.createElement('div');
      deleteButtonContainer.classList.add('ml-2');

      var deleteButton = document.createElement('button');
      deleteButton.appendChild(document.createTextNode('削除'));
      deleteButton.classList.add('px-2', 'py-1', 'bg-red-500', 'text-white');
      deleteButton.addEventListener('click', function() {
        removeTask(listItem);
      });
      deleteButtonContainer.appendChild(deleteButton);

      taskContainer.appendChild(deleteButtonContainer);

      listItem.appendChild(taskContainer);

      document.getElementById('taskList').appendChild(listItem);
    }
  }
}

// ページ読み込み時に保存されたデータを復元
window.addEventListener('load', function() {
  restoreTasks();
});
