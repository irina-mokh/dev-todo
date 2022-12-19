import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useEffect } from 'react';
import { AppDispatch } from '../../store';

import { IState, ITask, Status } from '../../types';
import { Column } from '../Column/Column';
import { getProject } from '../../store/reducer';

export const Project = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const {
    projects,
    tasks,
    current: { queue, development, done },
  } = useSelector((state: IState) => state.main);

  useEffect(() => {
    dispatch(getProject(id));
  }, [tasks]);

  const project = projects.find((pr) => pr.id == id);

  const STATUSES: Array<{ name: Status, data: ITask[] }> = [
    { name: 'queue', data: queue },
    { name: 'development', data: development },
    { name: 'done', data: done },
  ];

  const columns = STATUSES.map((status) => (
    <li className="project__column" key={status.name}>
      <Column type={status.name} />
    </li>
  ));
  return (
    <DndProvider backend={HTML5Backend}>
      <main className="project main">
        <div className="container">
          <header>
            <Link to="/" className="link">
              <p className="project__back">{`< Back`}</p>
            </Link>
            <h1 className="app__heading">{project?.title}</h1>
          </header>
          <ul className="project__columns">{columns}</ul>
        </div>
      </main>
    </DndProvider>
  );
};
