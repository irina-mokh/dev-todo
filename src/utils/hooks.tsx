import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { IProject, IState, ITask } from '../types';

export const usePopup = (mode: boolean): [boolean, () => void, () => void] => {
  const [isPopup, setIsPopup] = useState(mode);

  const open = useCallback(() => {
    setIsPopup(true);
  }, []);
  const close = useCallback(() => {
    setIsPopup(false);
  }, []);

  return [isPopup, open, close];
};

export const useTasks = (projectId?: string): [ITask[]] => {
  const store = useSelector((state: IState) => state.main);
  let tasks: ITask[] = [];
  store.forEach((project: IProject) => {
    tasks.push(...Object.values(project.tasks).flat());
  });
  if (projectId) {
    tasks = tasks.filter((task) => task.projectId === projectId);
  }
  return [tasks];
};
