import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { IState, ITask, Status } from '../../types';
import { Column } from '../Column/Column';

export const Project = () => {
  const { id } = useParams();
  const { tasks, projects } = useSelector((state: IState) => state.main);
  const project = projects.find((pr) => pr.id == id);

  const currentTasks = tasks.filter((task) => task.projectId == id);

  const queue = currentTasks?.filter(({ status }) => status === 'queue');
  const dev = currentTasks?.filter(({ status }) => status === 'development');
  const done = currentTasks?.filter(({ status }) => status === 'done');

  const STATUSES: Array<{ name: Status, data: ITask[] }> = [
    { name: 'queue', data: queue },
    { name: 'development', data: dev },
    { name: 'done', data: done },
  ];

  const columns = STATUSES.map((status) => (
    <li className="project__column" key={status.name}>
      <Column data={status.data} type={status.name} />
    </li>
  ));
  return (
    <DndProvider backend={HTML5Backend}>
      <main className="project">
        <div className="container">
          <header>
            <Link to="/" className="link">
              <p className="project__back">{`< Back`}</p>
            </Link>
            <h1>{project?.title}</h1>
          </header>
          <ul className="project__columns">{columns}</ul>
        </div>
      </main>
    </DndProvider>
  );
};
