import { useState } from 'react';

import { Modal } from '../Modal/Modal';
import { CreateProject } from '../CreateProject/CreateProject';
import { ProjectList } from '../ProjectList/ProjectList';

export const Home = () => {
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
              <CreateProject close={close} />
            </Modal>
          )}
        </section>
      </div>
    </main>
  );
};
