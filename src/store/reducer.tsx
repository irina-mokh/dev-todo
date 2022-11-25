import { createSlice } from '@reduxjs/toolkit';
import { IStateMain } from '../types';

export const INITIAL_TASK = {
  id: '',
  projectId: '',
  description: '',
  title: '',
  created: '',
  duration: '',
  deadline: '',
  priority: 0,
  file: '',
  fileName: '',
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
  },
});
export const { createProject, createTask } = mainSlice.actions;

export default mainSlice.reducer;
