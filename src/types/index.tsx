export interface IStateMain {
  tasks: Array<ITask>,
  projects: Array<IProject>,
}
 
export interface IState {
	main: IStateMain;
}

export interface IComment {
	text: string;
	subComments: Array<IComment>;
};

export interface ITask {
	id: string;
	projectId: string;
	title: string;
	description: string;
	created: string;
	duration: string;
	deadline: string;
	priority: number;
	files: string;
	status: 'queue' | 'dev' | 'done';
	subTasks: Array<ITask>;
	comments: Array<IComment>

}

export interface IProject {
	id: string;
	title: string;
}