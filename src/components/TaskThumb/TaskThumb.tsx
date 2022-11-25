import { ITask } from '../../types';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';
import { Comments } from '../Comments/Comments';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { deleteTask } from '../../store/reducer';

export const TaskThumb = (props: ITask) => {
  const { title, id, priority, status } = props;
  const [isModal, setIsModal] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <li
      className={`task ${status == 'done' ? 'task_done' : ''}`}
      onClick={() => {
        setIsModal(true);
      }}
      style={{ order: priority }}
    >
      <h3 className="task__title">{title}</h3>
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
    </li>
  );
};
