export interface IState {
  main: Array<IProject>;
}

export interface IComment {
  id: string;
  text: string;
  time: string;
  comments: Array<IComment>;
}

export interface ITask {
  id: string;
  projectId: string;
  title: string;
  description: string;
  created: string;
  deadline: string;
  priority: number;
  files: Array<string>;
  fileNames: Array<string>;
  status: Status;
  subTasks: ISubtasks;
  comments: Array<IComment>;
}

export interface ISubtasks extends Array<ISubtask> {}

export type ISubtask = {
  id: string,
  title: string,
  done: boolean,
};

export type Status = 'queue' | 'development' | 'done';

export interface IProject {
  id: string;
  title: string;
  tasks: ICurrent;
}

export type ICurrent = {
  queue: Array<ITask>,
  development: Array<ITask>,
  done: Array<ITask>,
};
