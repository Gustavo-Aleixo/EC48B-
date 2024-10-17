document.getElementById('addTaskBtn').addEventListener('click', function () {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const buttonContainer = document.createElement('div');

    const completeButton = document.createElement('button');
    completeButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>`;
    completeButton.classList.add('completeBtn');

    completeButton.addEventListener('click', function (e) {
      e.stopPropagation();
      li.classList.toggle('completed');
    });

    const removeButton = document.createElement('button');
    removeButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"></path>
        <path d="M10 11v6"></path>
        <path d="M14 11v6"></path>
        <path d="M18 6V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2"></path>
      </svg>`;
    removeButton.classList.add('removeBtn');

    removeButton.addEventListener('click', function (e) {
      e.stopPropagation();
      li.remove();
    });

    buttonContainer.appendChild(completeButton);
    buttonContainer.appendChild(removeButton);

    li.appendChild(buttonContainer);

    document.getElementById('taskList').appendChild(li);
    taskInput.value = '';
  } else {
    alert("É necessario adicionar uma tarefa!");
  }
});
