export interface IStateMain {
  tasks: Array<ITask>;
  projects: Array<IProject>;
}

export interface IState {
  main: IStateMain;
}

export interface IComment {
  text: string;
  subComments: Array<IComment>;
}

export interface ITask {
  id: string;
  projectId: string;
  title: string;
  description: string;
  created: string;
  deadline: string;
  priority: number;
  file: string;
  fileName: string;
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
}
