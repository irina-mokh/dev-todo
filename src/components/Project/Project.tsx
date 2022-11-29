import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { IState, ITask } from '../../types';
import { Column } from '../Column/Column';

export const Project = () => {
  const { id } = useParams();
  const { tasks, projects } = useSelector((state: IState) => state.main);
  const project = projects.filter((pr) => pr.id == id)[0];
  const currentTasks = tasks.filter((task) => task.projectId == id);
  const [queue, setQueue] = useState<Array<ITask>>([]);
  const [dev, setDev] = useState<Array<ITask>>([]);
  const [done, setDone] = useState<Array<ITask>>([]);

  useEffect(() => {
    const queue = currentTasks.filter(({ status }) => status === 'queue');
    const dev = currentTasks.filter(({ status }) => status === 'development');
    const done = currentTasks.filter(({ status }) => status === 'done');
    setQueue([...queue]);
    setDev([...dev]);
    setDone([...done]);
  }, [tasks]);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="project">
        <div className="container">
          <header>
            <Link to="/" className="link">
              <p className="project__back">{`< Back`}</p>
            </Link>
            <h1>{project.title}</h1>
          </header>
          <ul className="project__columns">
            <li className="project__column" key="queue">
              <Column data={queue} type="queue" />
            </li>
            <li className="project__column" key="dev">
              <Column data={dev} type="development" />
            </li>
            <li className="project__column" key="done">
              <Column data={done} type="done" />
            </li>
          </ul>
        </div>
      </main>
    </DndProvider>
  );
};
