import { ITask, IProject, Status } from '../types';
import { WritableDraft } from 'immer/dist/internal';

export function readFileAsync(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function getDuration(created: Date) {
  const now = new Date();
  const ms = now.getTime() - created.getTime();
  const h = Math.round(ms / (1000 * 60 * 60));
  const d = Math.floor(h / 24);
  return (d ? d + ' d ' : '') + (h - d * 24) + ' h';
}

export function getStore(state: WritableDraft<IProject>[]) {
  return JSON.parse(JSON.stringify(state));
}

export const getIndexes = ({
  state,
  projectId,
  status = undefined,
  taskId = undefined,
}: {
  state: IProject[],
  projectId: string,
  status?: Status,
  taskId?: string,
}): {
  store: IProject[],
  p: number, //project index
  t: number, //task index
} => {
  const store = getStore(state);

  const p = store.findIndex((pr: IProject) => pr.id === projectId);
  const t =
    status && taskId ? store[p].tasks[status].findIndex((task: ITask) => task.id === taskId) : null;
  return {
    store,
    p,
    t,
  };
};
