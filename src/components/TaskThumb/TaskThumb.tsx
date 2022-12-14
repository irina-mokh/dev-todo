import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';

import { AppDispatch } from '../../store';
import { deleteTask, editTask, moveTask } from '../../store/reducer';

import { ITask } from '../../types';
import { Modal } from '../Modal/Modal';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { TaskForm } from '../TaskForm/TaskForm';

export const TaskThumb = (task: ITask) => {
  const { title, id, priority, status, deadline } = task;
  const [isModal, setIsModal] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const closeModal = () => {
    setIsModal(false);
  };

  useEffect(() => {
    dispatch(editTask({...task}));
  }, [title, id, priority, status, deadline]);

  const [isLate, setIsLate] = useState(false);
  useEffect(() => {
    const today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
    setIsLate(new Date(today) > new Date(deadline));
  }, [deadline]);
  
  // ref for DnD task
  // eslint-disable-next-line prettier/prettier
  const ref = useRef() as MutableRefObject<HTMLLIElement>;

  // Drop task
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'task',
      drop: async (drag: ITask) => {
        if (drag.status === task.status && drag.priority === task.priority) {
          return;
        }

        dispatch(moveTask({drag: drag, drop: task}));
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [task]
  );

  // Drag task
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'task',
      item: task,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [task]
  );
  // task Ref
  drag(drop(ref));

  return (
    <li
      className={`task ${status == 'done' ? 'task_done' : ''} ${
        isLate && status !== 'done' ? 'task_late' : ''
      } ${isOver ? 'task_highlight' : ''} ${isDragging ? 'task_invisible' : ''}`}
      ref={ref}
      onClick={() => {
        if (!isModal && !isConfirm) {
          setIsModal(true);
        }
      }}
      style={{ order: priority }}
    >
      <h3 className="task__title">{title}</h3>
      <p className="task__deadline">{new Date(deadline).toLocaleString().slice(0, 5)}</p>
      <button
        className="close-btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsConfirm(true);
        }}
        aria-label="delete"
      >
        ????
      </button>
      {isModal && (
        <Modal close={closeModal} title={`${title} (id:${id})`}>
          <TaskForm close={closeModal} item={task} create={false} />
        </Modal>
      )}
      {isConfirm && <ConfirmDialog confirmText={`Delete task ${title}?`} setOpen={setIsConfirm} onConfirm={() => dispatch(deleteTask(id))}></ConfirmDialog>}
    </li>
  );
};
