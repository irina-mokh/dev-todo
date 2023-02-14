import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IState } from '../../types';

export const ProjectList = () => {
  const store = [...useSelector((state: IState) => state.main)];

  const projects = store.map((item) => (
    <li key={item.id} className="projects__thumb">
      <Link to={`project/${item.id}`} className="projects__link">
        <p>{item.title}</p>
      </Link>
    </li>
  ));

  return <ul className="projects">{projects}</ul>;
};
