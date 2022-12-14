import { createSlice } from '@reduxjs/toolkit';
import { IComment, IStateMain, ITask } from '../types';

export const INITIAL_TASK = {
  id: '',
  projectId: '',
  description: '',
  title: '',
  created: '',
  deadline: '',
  priority: 0,
  files: [],
  fileNames: [],
  status: 'queue',
  subTasks: [],
  comments: [],
};
const initialState: IStateMain = {
  tasks: [],
  projects: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    createProject: (state, action) => {
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    },
    createTask: (state, action) => {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    },
    editTask: (state, { payload }) => {
      const tasks: ITask[] = JSON.parse(JSON.stringify(state.tasks));
      const i = tasks.findIndex((item) => item.id == payload.id);
      tasks[i] = payload;
      return {
        ...state,
        tasks: [...tasks],
      };
    },
    prioritize: (state, action) => {
      const active: ITask = action.payload;
      const tasks = JSON.parse(JSON.stringify(state.tasks));
      const newTasks = tasks.filter((task: ITask) => {
        if (
          // check all tasks for same project, status-board and higher priority
          task.projectId == active.projectId &&
          task.status == active.status &&
          task.priority >= active.priority &&
          task.id !== active.id
        ) {
          task.priority++;
        }
        return task;
      });
      // console.log('prioritize', action.payload);
      // const { task: activeTask, col: activeCol } = action.payload;
      // const tasks: ITask[] = JSON.parse(JSON.stringify(state.tasks));

      // console.log(tasks);
      // let col = tasks.filter(
      //   (task) => activeCol == task.status && task.projectId == activeTask.projectId
      // );
      // console.log(col);
      // // update state with edited task
      // col = col.map((item) => {
      //   if (item.id == activeTask.id) {
      //     item = { ...activeTask };
      //   }
      //   return item;
      // });

      // console.log('before sort:', col);
      // col.sort((a, b) => {
      //   if (a.id == activeTask.id) {
      //     console.log('active task', a);
      //     return 1;
      //   } else {
      //     // console.log('else', a, b, b.priority - a.priority);
      //     return a.priority - b.priority;
      //   }
      // });
      // console.log('after sort:', col);

      // col = col.map((colTask: ITask, i) => {
      //   colTask.priority = i;
      //   return colTask;
      // });

      // const newTasks = tasks.map((task) => {
      //   col.forEach((colTask) => {
      //     // set priority according to index of Column's array of tasks
      //     if (task.id == colTask.id) {
      //       task = { ...colTask };
      //     }
      //   });
      //   return task;
      // });
      return {
        ...state,
        tasks: [...newTasks],
      };
    },
    deleteTask: (state, { payload }) => {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== payload),
      };
    },
    addComment: (state, { payload }) => {
      const idArr = payload.id.split('-');
      const taskId = idArr[0];

      const parentId = idArr.length > 2 ? idArr.splice(0, idArr.length - 1).join('-') : idArr[0];
      const tasks = JSON.parse(JSON.stringify(state.tasks));

      let parent: ITask | IComment;

      function findParent(elem: IComment) {
        if (elem.id == parentId) {
          parent = elem;
        } else {
          elem.comments.forEach((sub) => {
            if (!parent) {
              parent = findParent(sub);
            }
          });
        }
        return parent;
      }

      parent = findParent(tasks[taskId]);
      parent.comments.push(payload);

      return {
        ...state,
        tasks: [...tasks],
      };
    },
  },
});
export const { createProject, createTask, editTask, deleteTask, addComment, prioritize } =
  mainSlice.actions;

export default mainSlice.reducer;
