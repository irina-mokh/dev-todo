import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { IProject, IState, ITask, Status } from '../types';

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

export const useColumn = (id: string, type: Status): [ITask[], number] => {
  const store = useSelector((state: IState) => state.main);
  const projectTasks = store.filter((pr) => pr.id === id)[0].tasks;
  const colTasks = projectTasks?.[type];
  const tasksCounter = Object.values(projectTasks).flat().length;

  return [colTasks, tasksCounter];
};

export const useTasks = (): [ITask[]] => {
  const store = useSelector((state: IState) => state.main);
  const tasks: ITask[] = [];
  store.forEach((project: IProject) => {
    tasks.push(...Object.values(project.tasks).flat());
  });
  return [tasks];
};
