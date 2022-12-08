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
      const { tasks } = state;
      const i = tasks.findIndex((item) => item.id == payload.id);
      const preserve = [...tasks];
      preserve[i] = payload;
      return {
        ...state,
        tasks: [...preserve],
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
export const { createProject, createTask, editTask, deleteTask, prioritize, addComment } =
  mainSlice.actions;

export default mainSlice.reducer;
