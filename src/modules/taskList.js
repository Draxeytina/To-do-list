class TaskList {
  constructor() {
    this.tasks = [];
  }

  getList = () => {
    const list = JSON.parse(localStorage.getItem('tasks'));
    if (list) {
      return list;
    }
    return [];
  };

  addList = (newTask) => {
    localStorage.setItem('tasks', JSON.stringify(newTask));
  };

  deleteList = (index) => {
    if (index !== null) {
      const list = this.getList();

      const listRemoved = list.filter((item, key) => {
        if (key !== index) {
          return true;
        }

        return null;
      });
      this.addList(listRemoved);
      this.sortTasks();
    }
  };


  deleteCompleted = () => {
    const lists = this.getList();
    const tasksFiltered = lists.filter((item) => {
      if (item.completed) {
        return null;
      }
      return item;
    });
    this.addList(tasksFiltered);
    this.sortTasks();
  };

  sortTasks = () => {
    const sortedList = this.getList();
    let index = 1;
    sortedList.forEach((list) => {
      list.index = index;
      index += 1;
    });
    this.addList(sortedList);
  };

  editTask = (index, value) => {
    const lists = this.getList();
    lists[index].description = value;
    this.addList(lists);
  };
  
}

export default TaskList;
