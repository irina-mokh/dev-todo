import { ITask } from '../../types';
import { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { deleteTask } from '../../store/reducer';

export const TaskThumb = (props: ITask) => {
  const { title, id, priority, status, deadline } = props;
  const [isModal, setIsModal] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const closeModal = () => {
    setIsModal(false);
  };

  const [isLate, setIsLate] = useState(false);
  useEffect(() => {
    const today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
    if (new Date(today) > new Date(deadline)) {
      setIsLate(true);
    } else {
      setIsLate(false);
    }
  }, [deadline]);

  return (
    <li
      className={`task ${status == 'done' ? 'task_done' : ''} ${
        isLate && status !== 'done' ? 'task_late' : ''
      }`}
      onClick={() => {
        setIsModal(true);
      }}
      style={{ order: priority }}
    >
      <h3 className="task__title">{title}</h3>
      <p className="task__deadline">{new Date(deadline).toLocaleString().slice(0, 5)}</p>
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
        <Modal close={closeModal} title={`${title} (id:${id})`}>
          <TaskForm close={closeModal} item={props} create={false} />
          {/* <Comments></Comments> */}
        </Modal>
      )}
    </li>
  );
};
