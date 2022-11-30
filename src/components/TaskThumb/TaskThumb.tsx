import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';

import { AppDispatch } from '../../store';
import { deleteTask, editTask, prioritize } from '../../store/reducer';

import { ITask } from '../../types';
import { Modal } from '../Modal/Modal';
import { TaskForm } from '../TaskForm/TaskForm';

export const TaskThumb = (task: ITask) => {
  const { title, id, priority, status, deadline } = task;
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


  // ref for DnD task
  // eslint-disable-next-line prettier/prettier
  const ref = useRef() as MutableRefObject<HTMLLIElement>;

  // Drop task
  const [{ isOver  }, drop] = useDrop(
    () => ({
      accept: 'task',
      drop: async (drag: ITask) => {
        const dragIndex = drag.priority;
        const dropIndex = task.priority;
        const dragStatus = drag.status;
        const dropStatus = task.status;

        if (dragStatus === dropStatus && dropIndex === dragIndex) {
          return;
        }
        const newTask = {
          ...drag,
          priority: dropIndex,
          status: dragStatus,
        };
        dispatch(editTask(newTask));
        dispatch(prioritize(newTask));

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
        if (!isModal) {
          setIsModal(true);
        }
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
          <TaskForm close={closeModal} item={task} create={false} />
        </Modal>
      )}
    </li>
  );
};
