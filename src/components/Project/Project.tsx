import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { IState, Status } from '../../types';
import { Column } from '../Column/Column';

export const Project = () => {
  const { id } = useParams();
  const store = useSelector((state: IState) => state.main);

  const project = store.find((pr) => pr.id == id);

  const STATUSES: Array<{ name: Status }> = [
    { name: 'queue' },
    { name: 'development' },
    { name: 'done' },
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
