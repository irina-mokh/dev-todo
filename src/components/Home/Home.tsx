import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../types';
import { Modal } from '../Modal/Modal';
import { CreateProject } from '../CreateProject/CreateProject';
import { ProjectList } from '../ProjectList/ProjectList';

export const Home = () => {
  const state = useSelector((state: IState) => state.main);
  // console.log(state);
  const [isCreateProjectModal, setIsCreateProjectModal] = useState(false);

  return (
    <main className="app__main home">
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
            <Modal
              title="Create project"
              close={() => {
                setIsCreateProjectModal(false);
              }}
            >
              <CreateProject
                id={String(state.projects.length)}
                close={() => {
                  setIsCreateProjectModal(false);
                }}
              />
            </Modal>
          )}
        </section>
      </div>
    </main>
  );
};
