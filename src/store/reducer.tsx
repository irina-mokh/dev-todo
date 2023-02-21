import { createSlice } from '@reduxjs/toolkit';
import { getIndexes, getStore } from '../utils';
import { IComment, ITask, IProject, ICurrent } from '../types';

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
const initialState: Array<IProject> = [];

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    createProject: (state, { payload }) => {
      const store = getStore(state);
      store.push(payload);
      return store;
    },
    deleteProject: (state, { payload }) => {
      const store = getStore(state).filter((pr: IProject) => pr.id !== payload);
      return store;
    },
    sortColumn: (state, { payload }) => {
      const { status, projectId }: ITask = payload;
      const { store, p } = getIndexes({ state, projectId });

      const preservedTasks = store[p].tasks[status].sort((a, b) => a.priority - b.priority);
      preservedTasks.map((a, i) => (a.priority = i));

      store[p].tasks[status] = [...preservedTasks];
      return store;
    },
    createTask: (state, { payload }) => {
      const { status, projectId }: ITask = payload;
      const { store, p } = getIndexes({ state, projectId });

      store[p].tasks[status].push(payload);
      return store;
    },
    editTask: (state, { payload }) => {
      const { status, projectId, id: taskId }: ITask = payload;
      const { store, p, t } = getIndexes({ state, projectId, status, taskId });

      store[p].tasks[status][t] = payload;
      return store;
    },
    moveTask: (state, { payload }) => {
      const drag: ITask = payload.drag;
      const drop: ITask = payload.drop;

      const store = getStore(state);
      const i = store.findIndex((pr: IProject) => pr.id === drop.projectId);
      const current: ICurrent = { ...store[i].tasks };

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

      current[drop.status] = [...to];

      if (drag.status !== drop.status) {
        from.forEach((task, i) => {
          task.priority = i;
        });
        current[drag.status] = [...from];
      }
      return store;
    },
    deleteTask: (state, { payload }) => {
      const { projectId, status, id }: ITask = payload;
      const { store, p } = getIndexes({ state, projectId });

      store[p].tasks[status] = store[p].tasks[status].filter((task) => task.id !== id);

      return store;
    },
    addComment: (state, { payload }) => {
      //[taskId]-[timestamp]
      const idArr = payload.id.split('-');
      const taskId = idArr[0];
      //get project id from task id
      const [projectId] = taskId.split('|');

      const store: IProject[] = getStore(state);
      const i = store.findIndex((pr: IProject) => pr.id === projectId);

      const tasks: Array<ITask> = Object.values(store[i].tasks).flat();

      const task = tasks.filter((task: ITask) => task.id === taskId)[0];

      const commentParentId = idArr.splice(0, idArr.length - 1).join('-');

      let parent: ITask | IComment = task;
      function findParent(comments: IComment[]) {
        comments.forEach((sub) => {
          if (sub.id === commentParentId) {
            parent = sub;
          } else findParent(sub.comments);
        });
      }
      if (task.id !== commentParentId) {
        findParent(task.comments);
      }
      parent.comments.push(payload);

      return store;
    },
  },
});
export const {
  createProject,
  deleteProject,
  sortColumn,
  createTask,
  editTask,
  deleteTask,
  addComment,
  moveTask,
} = mainSlice.actions;

export default mainSlice.reducer;
