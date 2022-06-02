import './style.css';

const tasks = [
    {
      description: 'List structure',
      completed: false,
      index: 0,
    },
    {
      description: 'Add functionality',
      completed: false,
      index: 1,
    },
    {
      description: 'Add interactive features',
      completed: false,
      index: 2,
    },
  ];
  
  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const card = `
    <li class="card">
    <input type="checkbox">
    <input type="text" readonly="readonly" value="${task.description}" class="card-text">
    <button type="button" class="border"><i class="fa-solid fa-trash-can"></i></button>
    <button type="button" class="border"><i class="fa-solid fa-ellipsis-vertical"></i></button>
  </li>
    `;
  const ulContainer = document.getElementById('list');
  ulContainer.innerHTML += card;
  });
