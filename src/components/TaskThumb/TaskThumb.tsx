import {  useRef, MutableRefObject, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';

import { AppDispatch } from '../../store';
import { deleteTask, moveTask, sortColumn } from '../../store/reducer';

import { ITask } from '../../types';
import { Modal } from '../Modal/Modal';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { TaskForm } from '../TaskForm/TaskForm';
import { usePopup } from '../../utils/hooks';

export const TaskThumb = (task: ITask) => {
  const { title, id, priority, status, deadline, projectId } = task;

  const dispatch: AppDispatch = useDispatch();

  const [isModal, openModal, closeModal] = usePopup(false);
  const [isDialog, openDialog, closeDialog] = usePopup(false);

  const handleOpenModal = () => {
    if (!isModal && !isDialog) {
      openModal();
    }};
  
  const handleOpenDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openDialog();
  };

  const isLate = useMemo(
    () => {
      const today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
      return (new Date(today) > new Date(deadline));
    }
  , [deadline]);
  
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
        dispatch(sortColumn({ status: drag.status, projectId }));
        dispatch(sortColumn({ status: task.status, projectId }));
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
      onClick={handleOpenModal}
      style={{ order: priority }}
    >
      <h3 className="task__title">{title}</h3>
      <p className="task__deadline">{new Date(deadline).toLocaleString().slice(0, 5)}</p>
      <button
        className="close-btn"
        onClick={handleOpenDialog}
        aria-label="delete"
      >
        🗙
      </button>
      {isModal && (
        <Modal close={closeModal} title={`${title} (id:${id})`}>
          <TaskForm close={closeModal} item={task} create={false} />
        </Modal>
      )}
      {isDialog && <ConfirmDialog confirmText={`Delete task ${title}?`} close={closeDialog} onConfirm={() => dispatch(deleteTask(task))}></ConfirmDialog>}
    </li>
  );
};
