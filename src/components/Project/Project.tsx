import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IState, ITask } from '../../types';
import { useEffect, useState } from 'react';
import { Column } from '../Column/Column';

export const Project = () => {
  const { tasks } = useSelector((state: IState) => state.main);

  const [queue, setQueue] = useState<Array<ITask>>([]);
  const [dev, setDev] = useState<Array<ITask>>([]);
  const [done, setDone] = useState<Array<ITask>>([]);

  useEffect(() => {
    const queue = tasks.filter(({ status }) => status === 'queue');
    const dev = tasks.filter(({ status }) => status === 'development');
    const done = tasks.filter(({ status }) => status === 'done');
    setQueue([...queue]);
    setDev([...dev]);
    setDone([...done]);
  }, [tasks]);

  return (
    <main className="project">
      <div className="container">
        <header>
          <Link to="/" className="link">
            <p className="project__back">{`< Back`}</p>
          </Link>
          <h1> Project Page</h1>
        </header>
        <ul className="project__columns">
          <li className="project__column">
            <Column data={queue} type="queue" />
          </li>
          <li className="project__column">
            <Column data={dev} type="development" />
          </li>
          <li className="project__column">
            <Column data={done} type="done" />
          </li>
        </ul>
      </div>
    </main>
  );
};
