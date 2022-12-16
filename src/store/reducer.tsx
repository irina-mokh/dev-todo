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
  current: {
    queue: [],
    development: [],
    done: [],
  },
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
    getProject: (state, action) => {
      let tasks: ITask[] = JSON.parse(JSON.stringify(state.tasks));
      tasks = tasks.filter((task) => task.projectId == action.payload);

      const queue = tasks.filter(({ status }) => status === 'queue');
      const development = tasks.filter(({ status }) => status === 'development');
      const done = tasks.filter(({ status }) => status === 'done');

      // sort data by priority
      queue.sort((a, b) => a.priority - b.priority);
      development.sort((a, b) => a.priority - b.priority);
      done.sort((a, b) => a.priority - b.priority);

      return {
        ...state,
        current: { queue, development, done },
      };
    },
    createTask: (state, action) => {
      const newTask: ITask = action.payload;
      return {
        ...state,
        tasks: [...state.tasks, newTask],
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
    moveTask: (state, { payload }) => {
      const { drag, drop } = payload;
      const current = JSON.parse(JSON.stringify(state.current));

      const from: ITask[] = current[drag.status];
      const to: ITask[] = current[drop.status];

      const f = drag.priority;
      const t = drop.priority;

      const task = { ...drag, priority: t, status: drop.status };
      //delete task
      from.splice(f, 1);
      //add task
      to.splice(t, 0, task);

      to.forEach((task, i) => {
        task.priority = i;
      });

      let newCurrent = {
        ...state.current,
        [drop.status]: [...to],
      };

      if (drag.status !== drop.status) {
        from.forEach((task, i) => {
          task.priority = i;
        });
        newCurrent = {
          ...newCurrent,
          [drag.status]: [...from],
        };
      }
      return {
        ...state,
        current: { ...newCurrent },
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
export const { createProject, getProject, createTask, editTask, deleteTask, addComment, moveTask } =
  mainSlice.actions;

export default mainSlice.reducer;
