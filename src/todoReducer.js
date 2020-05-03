import { fetchReadAllTasks} from './services';

function todoReducer(todos, action)  {
  switch(action.type) {
    case 'sortByNameAsc':
        return [...todos].sort(function(task1, task2) {
            var taskName1 = task1.taskName.toUpperCase();
            var taskName2 = task2.taskName.toUpperCase();
            if (taskName1 <= taskName2) {
              return -1;
            } else {
              return 1;
            }
        });
    case 'sortByNameDesc':
        return [...todos].sort(function(task1, task2) {
            var taskName1 = task1.taskName.toUpperCase();
            var taskName2 = task2.taskName.toUpperCase();
            if (taskName1 > taskName2) {
              return -1;
            } else {
              return 1;
            }
        });
    case 'sortByNotDoneFirst':
        return [...todos].sort(function(task1, task2) {
            if(task1.done === task2.done) {
              return 0;
            } else if(!task1.done) {
              return -1;
            } else {
              return 1;
            }
        });
    case 'sortByDoneFirst':
        return [...todos].sort(function(task1, task2) {
            if(task1.done === task2.done) {
              return 0;
            } else if(task1.done) {
              return -1;
            } else {
              return 1;
            }
        });
    case 'refreshOriginalTodos':
        fetchReadAllTasks(action.username)
        .then( response => {
          return Object.values(response['data']);
        })
        .catch( (err) => {

        });
    case 'filterOutDone':
        const filteredTodos = [...todos].filter( todo => !todo.done);
        return filteredTodos;
    default:
      return todos;
  }
};

export default todoReducer;
