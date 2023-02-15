import { memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { IState, Status } from '../../types';
import { Column } from '../Column/Column';

const STATUSES: Array<Status> = ['queue', 'development', 'done'];

type columnsProps = {
  statuses: Array<Status>,
};

const Columns = memo(({ statuses }: columnsProps) => {
  const cols = statuses.map((status) => (
    <li className="project__column" key={status}>
      <Column type={status} />
    </li>
  ));

  return <ul className="project__columns">{cols}</ul>;
});

export const Project = () => {
  const { id } = useParams();
  const store = useSelector((state: IState) => state.main);
  const project = store.find((pr) => pr.id == id);

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
          <Columns statuses={STATUSES} />
        </div>
      </main>
    </DndProvider>
  );
};
