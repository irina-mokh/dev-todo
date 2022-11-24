import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IState } from '../../types';

export const ProjectList = () => {
  const state = useSelector((state: IState) => state.main);

  const projects = state.projects.map((item) => (
    <li key={item.id} className="projects__thumb">
      <Link to={`project/${item.id}`}>
        <p>{item.title}</p>
      </Link>
    </li>
  ));

  return <ul className="projects">{projects}</ul>;
};
