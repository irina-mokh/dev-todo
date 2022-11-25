import { ITask } from '../../types';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';
import { Comments } from '../Comments/Comments';

export const TaskThumb = (props: ITask) => {
  const { title } = props;
  const [isModal, setIsModal] = useState(false);

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <div
      className="task"
      onClick={() => {
        setIsModal(true);
      }}
    >
      <h3>{title}</h3>
      {isModal && (
        <Modal close={closeModal} title={title}>
          <TaskForm close={closeModal} item={props} create={false} />
          {/* <Comments></Comments> */}
        </Modal>
      )}
    </div>
  );
};
