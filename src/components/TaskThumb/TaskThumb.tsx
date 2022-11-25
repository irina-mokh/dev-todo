import { ITask } from '../../types';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';
import { Comments } from '../Comments/Comments';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { deleteTask } from '../../store/reducer';

export const TaskThumb = (props: ITask) => {
  const { title, id } = props;
  const [isModal, setIsModal] = useState(false);

  const dispatch: AppDispatch = useDispatch();

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
      <button
        className="close-btn"
        onClick={() => {
          dispatch(deleteTask(id));
        }}
        aria-label="delete"
      >
        🗙
      </button>
      {isModal && (
        <Modal close={closeModal} title={`${title}: ${id}`}>
          <TaskForm close={closeModal} item={props} create={false} />
          {/* <Comments></Comments> */}
        </Modal>
      )}
    </div>
  );
};
