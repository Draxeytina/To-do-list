import './style.css';
import TaskList from './modules/taskList';

const ulContainer = document.getElementById('list');
let tasks = [];
let checkboxes = document.querySelectorAll('.checkbox');

const load = () => {
  const local = new TaskList();
  tasks = local.getList();
  tasks.sort((a, b) => a.index - b.index);
  ulContainer.innerHTML = '';
  tasks.forEach((list) => {
    if (list.completed) {
      ulContainer.innerHTML += ` 
      <li class="card" id="${list.index-1}">
      <input type="checkbox" name="${list.index}" id="${list.index}" class="checkbox" checked>
      <input type="text" readonly="readonly" value="${list.description}" class="card-text done">
      <button title="Delete from list" type="button" class="border deleteList" id="${list.index-1}"><i class="fa-solid fa-trash-can"></i></button>
      <button title="Double-click to edit" type="button" class="border editList" id="edit${list.index-1}"><i class="fa-solid fa-ellipsis-vertical"></i></button>
      </li>`;
    } else {
      ulContainer.innerHTML += ` 
        <li class="card" id="${list.index-1}">
        <input type="checkbox" name="${list.index}" id="${list.index}" class="checkbox">
        <input type="text" readonly="readonly" value="${list.description}" class="card-text">
        <button title="Delete from list" type="button" class="border deleteList" id="${list.index-1}"><i class="fa-solid fa-trash-can"></i></button>
        <button title="Double-click to edit" type="button" class="border editList" id="edit${list.index-1}"><i class="fa-solid fa-ellipsis-vertical"></i></button>
        </li>`;
    }
  });

  // add eventlistener for checkbox
  checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const localList = new TaskList();
      const listId = checkbox.getAttribute('id');
      const todoListLocal = localList.getList();
      if (checkbox.checked) {
        todoListLocal[listId - 1].completed = true;
      } else {
        todoListLocal[listId - 1].completed = false;
      }
      localList.addList(todoListLocal);
      load();
    });
  });

  // add eventlistener for delete button whilst preventing accidental delete
  const deleteBtn = document.querySelectorAll('.deleteList');
  deleteBtn.forEach((deleteButton) => {
  deleteButton.addEventListener('click', () => { 
    if (confirm("Delete task?")) {
          const localList = new TaskList();
          const buttonId = deleteButton.getAttribute('id');
          localList.deleteList(buttonId * 1);
          load();
    } else {
      alert('Action cancelled!');
    }
    });
  });

  // add eventlistener for edit button
  const listLi = document.querySelectorAll('.card');

  listLi.forEach((list) => {
    list.addEventListener('dblclick', () => {
      const localList = new TaskList();
      const todoListsLocal = localList.getList();
      const editId = list.getAttribute('id') * 1;
      list.classList.remove('card')
      list.classList.add('edit-form')
      list.innerHTML = `
        <input class="card-text" type="text" id="input-edit${editId}" value="${todoListsLocal[editId].description}">
        <button title="Add edited" type ="button" class="check-btn" id="edit${editId}"> <i class="fa-solid fa-check"></i></button>
      `;
      const editForm = document.querySelector(`#edit${editId}`);
      editForm.addEventListener('click', (event) => {
        event.preventDefault();
        const editValue = document.querySelector(`#input-edit${editId}`);
        localList.editTask(editId, editValue.value);
        load
        ();
      });
    });
  });
};

load();

// add eventlistener for the form
const form = document.querySelector('#list-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const localList = new TaskList();
  const value = document.querySelector('#add-list');
  const todoListLocal = localList.getList();
  const addList = {
    description: value.value,
    completed: false,
    index: todoListLocal.length + 1,
  };

  todoListLocal.push(addList);
  localList.addList(todoListLocal);
  value.value = '';
  load();
});

// add event listener to clear button
const deleteChecked = document.querySelector('.clear-btn');

deleteChecked.addEventListener('click', () => {
  const localList = new TaskList();
  localList.deleteCompleted();
  load();
});

// restart list
document.querySelector('.refresh-btn').addEventListener('click', () => {
  localStorage.clear('tasks');
  load();
});
