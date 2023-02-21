import { useSelector } from 'react-redux';
import { IState } from '../../types';
import { Modal } from '../Modal/Modal';
import { CreateProject } from '../CreateProject/CreateProject';
import { ProjectThumb } from '../ProjectThumb/ProjectThumb';
import { usePopup } from '../../utils/hooks';

export const Home = () => {
  const [isCreateProjectModal, openModal, closeModal] = usePopup(false);

  const store = [...useSelector((state: IState) => state.main)];
  const projects = store.map((item) => <ProjectThumb key={item.id} {...item}></ProjectThumb>);
  return (
    <main className="home main">
      <div className="container">
        <h1 className="app__heading">Projects</h1>
        <section>
          <ul className="projects">{projects}</ul>
          <button className="btn" onClick={openModal}>
            Add project
          </button>
          {isCreateProjectModal && (
            <Modal title="Create project" close={closeModal}>
              <CreateProject close={closeModal} />
            </Modal>
          )}
        </section>
      </div>
    </main>
  );
};
