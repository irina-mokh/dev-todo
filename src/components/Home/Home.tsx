import { useState } from 'react';
import { useSelector } from 'react-redux';

import { IState } from '../../types';
import { Modal } from '../Modal/Modal';
import { CreateProject } from '../CreateProject/CreateProject';
import { ProjectList } from '../ProjectList/ProjectList';

export const Home = () => {
  const state = useSelector((state: IState) => state.main);
  const [isCreateProjectModal, setIsCreateProjectModal] = useState(false);

  const close = () => {
    setIsCreateProjectModal(false);
  };

  return (
    <main className="home main">
      <div className="container">
        <h1 className="app__heading">Projects</h1>
        <section>
          <ProjectList />
          <button
            className="btn"
            onClick={() => {
              setIsCreateProjectModal(true);
            }}
          >
            Add project
          </button>
          {isCreateProjectModal && (
            <Modal title="Create project" close={close}>
              <CreateProject id={String(state.projects.length)} close={close} />
            </Modal>
          )}
        </section>
      </div>
    </main>
  );
};
